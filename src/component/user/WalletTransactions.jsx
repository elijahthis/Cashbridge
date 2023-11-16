"use client";
import { useEffect, useState } from "react";
import { formatDate, prettifyMoney } from "../../../utils/helperFuncs";
import MUITable from "../MUITable";
import { getUserWalletTransactions } from "../../../requests/transactions";
import {
	amountFilterList,
	currencyList,
	transactionTypeList,
} from "@/data/constants";
import FilterRow from "../filter/FilterRow";
import FilterBlock from "../filter/FilterBlock";
import useFilterWalletHistory from "../../../hooks/useFilterWalletHistory";
import Dropdown from "../Dropdown";
import CBDatePicker from "../CBDatePicker";

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
		<div>
			<h2 className="font-bold text-3xl mb-4">Wallet Transactions</h2>
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
			<MUITable
				headers={[
					{ label: "Amount", key: "amount" },
					{ label: "Reference", key: "reference" },
					{ label: "Balance Before", key: "balance_before" },
					{ label: "Balance After", key: "balance_after" },
					{ label: "Type", key: "type" },
					{ label: "Remarks", key: "remarks" },
					{ label: "Transaction Date", key: "date" },
				]}
				bodyData={filteredTransactions.map((transItem) => ({
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
