"use client";

import { useEffect, useState } from "react";
import { getAllSavingTransactions } from "../../../requests/transactions";
import MUITable from "../MUITable";
import {
	capitalizeFirstLetter,
	formatDate,
	prettifyMoney,
} from "../../../utils/helperFuncs";
import {
	amountFilterList,
	currencyList,
	savingsStatusList,
} from "@/data/constants";
import useFilterSavings from "../../../hooks/useFilterSavings";
import FilterRow from "../filter/FilterRow";
import FilterBlock from "../filter/FilterBlock";
import Dropdown from "../Dropdown";
import CBDatePicker from "../CBDatePicker";
import { useRouter } from "next/navigation";

const SavingTransactionList = () => {
	const [currPage, setCurrPage] = useState(1);
	const [transLoading, setTransLoading] = useState(false);
	const [totalTransactionPages, setTotalTransactionPages] = useState(1);
	const [transactionList, setTransactionList] = useState([]);

	const [startDate, setStartDate] = useState(new Date("2023-01-01"));
	const [endDate, setEndDate] = useState(new Date());
	const [source, setSource] = useState(null);
	const [type, setType] = useState(null);

	const router = useRouter();

	const savingsTypeList = ["deposit", "lock", "withdrawal", "interest"];
	const savingsTypeLabelList = [
		"BRIDGE DEPOSIT",
		"BRIDGE LOCK",
		"BRIDGE WITHDRAWAL",
		"BRIDGE INTEREST",
	];
	const savingsSourceList = ["wallet", "card", "lock"];

	const fetchTransactionData = async () => {
		setTransLoading(true);
		try {
			const res2 = await getAllSavingTransactions(
				null,
				currPage,
				10,
				type,
				source,
				startDate,
				endDate
			);
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
	}, [currPage, startDate, endDate, type, source]);

	const {
		filteredSavings,

		amountRange,
		setAmountRange,
	} = useFilterSavings(transactionList);

	console.log("transactionList", transactionList);

	const clearFilters = () => {
		setStartDate(undefined);
		setEndDate(undefined);
		setAmountRange(undefined);
		setType(undefined);
		setSource(undefined);
	};

	return (
		<section className="py-6">
			<h2 className="font-bold text-3xl mb-4">Savings Transactions</h2>
			<FilterRow clearFilters={clearFilters}>
				<FilterBlock label="Type">
					<Dropdown
						optionsList={savingsTypeList.map(
							(item, ind) => savingsTypeLabelList[ind]
						)}
						selectedOption={type ? capitalizeFirstLetter(type) : undefined}
						handleSelect={(e, ind) => {
							setType(savingsTypeList[ind]);
						}}
						placeholder="Select Type"
					/>
				</FilterBlock>
				<FilterBlock label="Source">
					<Dropdown
						optionsList={savingsSourceList.map((item, ind) =>
							capitalizeFirstLetter(item)
						)}
						selectedOption={source ? capitalizeFirstLetter(source) : undefined}
						handleSelect={(e, ind) => {
							setSource(savingsSourceList[ind]);
						}}
						placeholder="Select Source"
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
						{ label: "Type", key: "type" },
						{ label: "Source", key: "source" },
						{ label: "Transaction Date", key: "createdAt" },
						{ label: "Transaction ID", key: "trnx_id" },
						{ label: "Reference", key: "reference" },
					]}
					bodyData={filteredSavings.map((transItem) => ({
						customer: `${transItem?.userId?.firstname} ${transItem?.userId?.lastname}`,

						amount: `${
							currencyList.find((item) => item.label === transItem?.currency)
								?.symbol ?? "₦"
						}${prettifyMoney(transItem?.amount ?? 0)}`,
						reference: transItem?.reference,
						type:
							transItem?.type === "lock"
								? "BRIDGE LOCK"
								: transItem?.type === "saving"
								? "BRIDGE SAVE"
								: transItem?.type,
						source: transItem?.source,
						createdAt: formatDate(transItem?.createdAt),
						trnx_id: transItem?.trnx_id,
						onClick: () => {
							router.push(`/transactions/savings/${transItem?.trnx_id}`);
						},
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
