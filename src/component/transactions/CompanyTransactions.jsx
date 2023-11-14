"use client";
import { useEffect, useState } from "react";
import { getCompanyExternalTransactions } from "../../../requests/transactions";
import MUITable from "../MUITable";
import {
	capitalizeFirstLetter,
	formatDate,
	prettifyMoney,
} from "../../../utils/helperFuncs";
import Link from "next/link";

const CompanyTransactions = () => {
	const [currPage, setCurrPage] = useState(1);
	const [transLoading, setTransLoading] = useState(false);
	const [totalTransactionPages, setTotalTransactionPages] = useState(1);
	const [transactionList, setTransactionList] = useState([]);

	const fetchTransactionData = async () => {
		setTransLoading(true);
		try {
			const res2 = await getCompanyExternalTransactions(currPage);
			console.log("res2", res2);
			if (res2.data?.success) {
				setTransactionList(res2.data?.data?.data);
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
			<h2 className="font-bold text-3xl mb-4">Company External Transactions</h2>
			<div>
				<MUITable
					headers={[
						{ label: "Customer Name", key: "customer" },
						{ label: "Amount", key: "amount" },
						{ label: "Amount Settled", key: "amount_settled" },
						{ label: "App Fee", key: "app_fee" },
						{ label: "Flutterwave Reference", key: "flw_ref" },
						{ label: "Transaction Date", key: "created_at" },
						{ label: "Payment Type", key: "payment_type" },
						{ label: "Status", key: "status" },
						{ label: "Narration", key: "narration" },
					]}
					bodyData={transactionList.map((transItem) => ({
						customer: transItem?.customer?.name,
						// customer: (
						// 	<Link href={`${process.env.NEXT_PUBLIC_BASE_URL}users/`}>
						// 		<p className="font-bold text-success-300">
						// 			{transItem?.customer?.name}
						// 		</p>
						// 	</Link>
						// ),
						amount: `${transItem?.currency}${prettifyMoney(
							transItem?.amount ?? 0
						)}`,
						amount_settled: `${transItem?.currency}${prettifyMoney(
							transItem?.amount_settled ?? 0
						)}`,
						app_fee: `${transItem?.currency}${prettifyMoney(
							transItem?.app_fee ?? 0
						)}`,
						flw_ref: transItem?.flw_ref,
						payment_type: (transItem?.payment_type || "").toUpperCase(),
						narration: transItem?.narration,
						created_at: formatDate(transItem?.created_at),
						status: capitalizeFirstLetter(transItem?.status),
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

export default CompanyTransactions;
