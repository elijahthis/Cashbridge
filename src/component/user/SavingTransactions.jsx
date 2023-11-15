import { useState } from "react";
import MUITable from "../MUITable";

const SavingTransactions = ({ refetch, userId }) => {
	// Data states
	const [transactionList, setTransactionList] = useState([]);
	const [transLoading, setTransLoading] = useState(false);
	// Pagination states
	const [currPage, setCurrPage] = useState(1);
	const [totalTransactionPages, setTotalTransactionPages] = useState(1);

	const fetchTransactionData = async () => {
		setTransLoading(true);
		try {
			const res2 = await getCompanyWalletTransactions(currPage);
			console.log("res2", res2);
			if (res2.data?.success) {
				setTransactionList(res2.data?.data?.transactions);
				setTotalTransactionPages(res2.data?.data?.page_info?.total_pages);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setTransLoading(false);
		}
	};

	useEffect(() => {
		fetchTransactionData();
	}, [currPage]);

	console.log("walletHistory", transactionList);

	return (
		<div>
			<h2 className="font-bold text-3xl mb-4">Saving Transactions</h2>
			<MUITable
				headers={[
					{ label: "Amount", key: "amount" },
					{ label: "Sent Amount", key: "sent_amount" },
					{ label: "Balance Before", key: "balance_before" },
					{ label: "Balance After", key: "balance_after" },
					{ label: "Reference", key: "reference" },
					{ label: "Transaction Date", key: "date" },
					{ label: "Type", key: "type" },
					{ label: "Remarks", key: "remarks" },
				]}
				bodyData={transactionList.map((transItem) => ({
					amount: `${transItem?.currency}${prettifyMoney(
						transItem?.amount ?? 0
					)}`,
					sent_amount: `${transItem?.currency}${prettifyMoney(
						transItem?.sent_amount ?? 0
					)}`,
					balance_before: `${transItem?.currency}${prettifyMoney(
						transItem?.balance_before
					)}`,
					balance_after: `${transItem?.currency}${prettifyMoney(
						transItem?.balance_after
					)}`,
					reference: transItem?.reference,
					type:
						transItem?.type === "D" ? (
							<span className="px-3 py-2 rounded-lg bg-[#FCDEDE] text-[#DD3333] ">
								Debit
							</span>
						) : transItem?.type === "C" ? (
							<span className="px-3 py-2 rounded-lg bg-[#D9FBE6] text-[#22C55E] ">
								Credit
							</span>
						) : (
							transItem?.type
						),
					remarks: transItem?.remarks,
					date: formatDate(transItem?.date),
				}))}
				handlePageClick={(page) => {
					setCurrPage(page);
				}}
				pageCount={totalTransactionPages}
				loading={transLoading}
			/>
		</div>
	);
};

export default SavingTransactions;
