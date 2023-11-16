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
import { amountFilterList, currencyList, statusList } from "@/data/constants";
import useFilterTransactions from "../../../hooks/useFilterTransactions";
import FilterBlock from "../filter/FilterBlock";
import Dropdown from "../Dropdown";
import FilterRow from "../filter/FilterRow";
import CBDatePicker from "../CBDatePicker";

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

	const {
		filteredTransactions,
		startDate,
		endDate,
		setStartDate,
		setEndDate,
		amountRange,
		setAmountRange,
		status,
		setStatus,
	} = useFilterTransactions(transactionList);

	console.log("transactionList", transactionList);

	const clearFilters = () => {
		setStatus(undefined);
		setStartDate(undefined);
		setEndDate(undefined);
		setAmountRange(undefined);
	};

	return (
		<section className="py-6">
			<h2 className="font-bold text-3xl mb-4">Company External Transactions</h2>
			<FilterRow clearFilters={clearFilters}>
				<FilterBlock label="Status">
					<Dropdown
						optionsList={statusList.map((item) => capitalizeFirstLetter(item))}
						selectedOption={status ? capitalizeFirstLetter(status) : undefined}
						handleSelect={(e, ind) => {
							setStatus(statusList[ind]);
						}}
						placeholder="Select Type"
					/>
				</FilterBlock>
				<FilterBlock label="From">
					<CBDatePicker
						selectedDate={startDate ? new Date(startDate) : undefined}
						handleSelect={(date) => {
							// set date at 12:00am
							const newDate = new Date(date);
							newDate.setHours(0, 0, 0, 0);
							setStartDate(newDate);
						}}
					/>
				</FilterBlock>
				<FilterBlock label="To">
					<CBDatePicker
						selectedDate={endDate ? new Date(endDate) : undefined}
						handleSelect={(date) => {
							// set date at 11:59pm
							const newDate = new Date(date);
							newDate.setHours(23, 59, 59, 999);
							setEndDate(newDate);
						}}
					/>
				</FilterBlock>
				<FilterBlock label="Amount">
					<Dropdown
						optionsList={amountFilterList.map((item) =>
							item?.from === 0
								? `< ₦${prettifyMoney(item?.to)}`
								: item.to === Number.MAX_SAFE_INTEGER
								? `> ₦${prettifyMoney(item?.from)}`
								: `₦${prettifyMoney(item?.from)} - ₦${prettifyMoney(item?.to)}`
						)}
						selectedOption={
							amountRange
								? `₦${prettifyMoney(amountRange?.from)} - ₦${prettifyMoney(
										amountRange?.to
								  )}`
								: undefined
						}
						handleSelect={(e, ind) => {
							setAmountRange(amountFilterList[ind]);
						}}
						placeholder="Select Filter Amount"
					/>
				</FilterBlock>
			</FilterRow>
			<div>
				<MUITable
					headers={[
						{ label: "Customer Name", key: "customer" },
						{ label: "Amount", key: "amount" },
						{ label: "Transaction Date", key: "created_at" },
						{ label: "Payment Type", key: "payment_type" },
						{ label: "Status", key: "status" },
						{ label: "Amount Settled", key: "amount_settled" },
						{ label: "App Fee", key: "app_fee" },
						{ label: "Narration", key: "narration" },
						{ label: "Flutterwave Reference", key: "flw_ref" },
					]}
					bodyData={filteredTransactions.map((transItem) => ({
						customer: transItem?.customer?.name,
						// customer: (
						// 	<Link href={`${process.env.NEXT_PUBLIC_BASE_URL}users/`}>
						// 		<p className="font-bold text-success-300">
						// 			{transItem?.customer?.name}
						// 		</p>
						// 	</Link>
						// ),
						amount: `${
							currencyList.find((item) => item.label === transItem?.currency)
								?.symbol ?? "₦"
						}${prettifyMoney(transItem?.amount ?? 0)}`,
						amount_settled: `${
							currencyList.find((item) => item.label === transItem?.currency)
								?.symbol ?? "₦"
						}${prettifyMoney(transItem?.amount_settled ?? 0)}`,
						app_fee: `${
							currencyList.find((item) => item.label === transItem?.currency)
								?.symbol ?? "₦"
						}${prettifyMoney(transItem?.app_fee ?? 0)}`,
						flw_ref: transItem?.flw_ref,
						payment_type: (transItem?.payment_type || "").toUpperCase(),
						narration: transItem?.narration,
						created_at: formatDate(transItem?.created_at),
						status:
							transItem?.status === "failed" ? (
								<span className="px-3 py-2 rounded-lg bg-[#FCDEDE] text-[#DD3333] ">
									Failed
								</span>
							) : transItem?.status === "successful" ? (
								<span className="px-3 py-2 rounded-lg bg-[#D9FBE6] text-[#22C55E] ">
									Successful
								</span>
							) : (
								transItem?.status
							),
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
