"use client";
import { useEffect, useState } from "react";
import { formatDate, prettifyMoney } from "../../../utils/helperFuncs";
import MUITable from "../MUITable";
import { getUserWalletTransactions } from "../../../requests/transactions";
import { currencyList } from "@/data/constants";

const WalletTransactions = ({ refetch, userId }) => {
	// Data states
	const [transLoading, setTransLoading] = useState(false);
	const [transactionList, setTransactionList] = useState([]);
	// Pagination states
	const [currPage, setCurrPage] = useState(1);
	const [totalTransactionPages, setTotalTransactionPages] = useState(1);

	const fetchTransactionData = async () => {
		setTransLoading(true);
		try {
			const res2 = await getUserWalletTransactions(userId, currPage);
			console.log("res2", res2);
			if (res2.data?.success) {
				setTransactionList(res2.data?.data?.transactions);
				setTotalTransactionPages(res2.data?.data?.page_info?.total_pages);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setTransLoading(false);
			// setFetched(true);
		}
	};

	useEffect(() => {
		fetchTransactionData();
		console.log("fetchTransactionData");
	}, [refetch, currPage]);

	console.log("transactionList", transactionList);

	return (
		<div>
			<h2 className="font-bold text-3xl mb-4">Wallet Transactions</h2>
			<MUITable
				headers={[
					{ label: "Amount", key: "amount" },
					{ label: "Reference", key: "reference" },
					{ label: "Balance Before", key: "balance_before" },
					{ label: "Balance After", key: "balance_after" },
					{ label: "Remarks", key: "remarks" },
					{ label: "Transaction Date", key: "date" },
				]}
				bodyData={transactionList.map((transItem) => ({
					amount: `${
						currencyList.find((item) => item.label === transItem?.currency)
							?.symbol ?? "₦"
					}${prettifyMoney(transItem?.amount)}`,
					balance_before: `${
						currencyList.find((item) => item.label === transItem?.currency)
							?.symbol ?? "₦"
					}${prettifyMoney(transItem?.balance_before)}`,
					balance_after: `${
						currencyList.find((item) => item.label === transItem?.currency)
							?.symbol ?? "₦"
					}${prettifyMoney(transItem?.balance_after)}`,
					reference: transItem?.reference,
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

export default WalletTransactions;
