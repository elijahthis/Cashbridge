"use client";

import { useEffect, useState } from "react";
import { getAllSavingTransactions } from "../../../requests/transactions";
import MUITable from "../MUITable";
import {
	capitalizeFirstLetter,
	formatDate,
	prettifyMoney,
} from "../../../utils/helperFuncs";

const SavingTransactionList = () => {
	const [currPage, setCurrPage] = useState(1);
	const [transLoading, setTransLoading] = useState(false);
	const [totalTransactionPages, setTotalTransactionPages] = useState(1);
	const [transactionList, setTransactionList] = useState([]);

	const fetchTransactionData = async () => {
		setTransLoading(true);
		try {
			const res2 = await getAllSavingTransactions();
			console.log("res2", res2);
			if (res2.data?.success) {
				setTransactionList(res2.data?.data);
				setTotalTransactionPages(res2.data?.data?.meta?.page_info?.total_pages);
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
	}, [currPage]);

	console.log("transactionList", transactionList);

	return (
		<section className="py-6">
			<h2 className="font-bold text-3xl mb-4">Savings Transactions</h2>
			<div>
				<MUITable
					headers={[
						{ label: "Customer Name", key: "customer" },
						{ label: "Amount", key: "amount" },
						{ label: "Reference", key: "reference" },
						{ label: "Type", key: "type" },
						{ label: "Source", key: "source" },
						{ label: "Transaction Date", key: "createdAt" },
						{ label: "Transaction ID", key: "trnx_id" },
					]}
					bodyData={transactionList.map((transItem) => ({
						customer: `${transItem?.userId?.firstname} ${transItem?.userId?.lastname}`,

						amount: `${transItem?.currency ?? "NGN"}${prettifyMoney(
							transItem?.amount ?? 0
						)}`,
						reference: transItem?.reference,
						type: (transItem?.type || "").toUpperCase(),
						source: transItem?.source,
						createdAt: formatDate(transItem?.createdAt),
						trnx_id: transItem?.trnx_id,
					}))}
					handlePageClick={(page) => {
						setCurrPage(page);
					}}
					pageCount={totalTransactionPages}
					loading={transLoading}
				/>
			</div>
		</section>
	);
};

export default SavingTransactionList;
