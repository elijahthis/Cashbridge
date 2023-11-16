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
import FilterRow from "../filter/FilterRow";
import FilterBlock from "../filter/FilterBlock";

const CompanyWalletHistory = () => {
	const [currPage, setCurrPage] = useState(1);
	const [transLoading, setTransLoading] = useState(false);
	const [totalTransactionPages, setTotalTransactionPages] = useState(1);
	const [transactionList, setTransactionList] = useState([]);

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
		transactionType,
		setTransactionType,
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
			<FilterRow clearFilters={clearFilters}>
				<FilterBlock label="Type">
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
