"use client";
import { useEffect, useState } from "react";
import {
	getCompanyExternalTransactions,
	getCompanyWalletTransactions,
} from "../../../requests/transactions";
import MUITable from "../MUITable";
import {
	capitalizeFirstLetter,
	convertWeirdDate,
	formatDate,
	formatDateToDdMmYyyy,
	prettifyMoney,
} from "../../../utils/helperFuncs";
import Link from "next/link";
import Dropdown from "../Dropdown";
import {
	amountFilterList,
	currencyList,
	transactionTypeList,
} from "@/data/constants";
import CBDatePicker from "../CBDatePicker";
import useFilterWalletHistory from "../../../hooks/useFilterWalletHistory";

const CompanyWalletHistory = () => {
	const [currPage, setCurrPage] = useState(1);
	const [transLoading, setTransLoading] = useState(false);
	const [totalTransactionPages, setTotalTransactionPages] = useState(1);
	const [transactionList, setTransactionList] = useState([]);
	const [transactionType, setTransactionType] = useState(undefined);

	const fetchTransactionData = async () => {
		setTransLoading(true);
		try {
			const res2 = await getCompanyWalletTransactions(
				currPage,
				transactionType
			);
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
	}, [currPage, transactionType]);

	const {
		filteredTransactions,
		startDate,
		endDate,
		setStartDate,
		setEndDate,
		amountRange,
		setAmountRange,
	} = useFilterWalletHistory(transactionList);

	console.log("transactionList", transactionList);

	const clearFilters = () => {
		setTransactionType(undefined);
		setStartDate(undefined);
		setEndDate(undefined);
		setAmountRange(undefined);
	};

	return (
		<section className="py-6">
			<h2 className="font-bold text-3xl mb-4">Company Wallet History</h2>
			<div className="bg-white py-4 px-4 rounded-lg flex flex-row items-stretch gap-4 flex-wrap ">
				<div>
					<p className="mb-2 text-base font-bold leading-[24px] text-bgray-900 dark:text-white">
						Type
					</p>
					<Dropdown
						optionsList={transactionTypeList.map((item) => item?.label)}
						selectedOption={
							transactionTypeList.find(
								(transItem) => transItem?.value === transactionType
							)?.label
						}
						handleSelect={(e, ind) => {
							setTransactionType(transactionTypeList[ind]?.value);
						}}
						placeholder="Select Type"
					/>
				</div>
				<div>
					<p className="mb-2 text-base font-bold leading-[24px] text-bgray-900 dark:text-white">
						From
					</p>
					<CBDatePicker
						selectedDate={startDate ? new Date(startDate) : undefined}
						handleSelect={(date) => {
							setStartDate(date);
						}}
					/>
				</div>
				<div>
					<p className="mb-2 text-base font-bold leading-[24px] text-bgray-900 dark:text-white">
						To
					</p>
					<CBDatePicker
						selectedDate={endDate ? new Date(endDate) : undefined}
						handleSelect={(date) => {
							setEndDate(date);
						}}
					/>
				</div>
				<div>
					<p className="mb-2 text-base font-bold leading-[24px] text-bgray-900 dark:text-white">
						Amount
					</p>
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
				</div>
				<button
					className="ml-auto"
					onClick={() => {
						clearFilters();
					}}
				>
					Clear filters
				</button>
			</div>
			<div>
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
					bodyData={filteredTransactions.map((transItem) => ({
						amount: `${
							currencyList.find((item) => item.label === transItem?.currency)
								?.symbol ?? "₦"
						}${prettifyMoney(transItem?.amount ?? 0)}`,
						sent_amount: `${
							currencyList.find((item) => item.label === transItem?.currency)
								?.symbol ?? "₦"
						}${prettifyMoney(transItem?.sent_amount ?? 0)}`,
						balance_before: `${
							currencyList.find((item) => item.label === transItem?.currency)
								?.symbol ?? "₦"
						}${prettifyMoney(transItem?.balance_before)}`,
						balance_after: `${
							currencyList.find((item) => item.label === transItem?.currency)
								?.symbol ?? "₦"
						}${prettifyMoney(transItem?.balance_after)}`,
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
		</section>
	);
};

export default CompanyWalletHistory;
