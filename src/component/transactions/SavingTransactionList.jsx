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

	const {
		filteredSavings,
		startDate,
		endDate,
		setStartDate,
		setEndDate,
		amountRange,
		setAmountRange,
		status,
		setStatus,
	} = useFilterSavings(transactionList);

	console.log("transactionList", transactionList);

	const clearFilters = () => {
		setStatus(undefined);
		setStartDate(undefined);
		setEndDate(undefined);
		setAmountRange(undefined);
	};

	return (
		<section className="py-6">
			<h2 className="font-bold text-3xl mb-4">Savings Transactions</h2>
			<FilterRow clearFilters={clearFilters}>
				{/* <FilterBlock label="Status">
					<Dropdown
						optionsList={savingsStatusList.map((item) =>
							capitalizeFirstLetter(item)
						)}
						selectedOption={status ? capitalizeFirstLetter(status) : undefined}
						handleSelect={(e, ind) => {
							setStatus(savingsStatusList[ind]);
						}}
						placeholder="Select Status"
					/>
				</FilterBlock> */}
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
						{ label: "Reference", key: "reference" },
						{ label: "Type", key: "type" },
						{ label: "Source", key: "source" },
						{ label: "Transaction Date", key: "createdAt" },
						{ label: "Transaction ID", key: "trnx_id" },
					]}
					bodyData={filteredSavings.map((transItem) => ({
						customer: `${transItem?.userId?.firstname} ${transItem?.userId?.lastname}`,

						amount: `${
							currencyList.find((item) => item.label === transItem?.currency)
								?.symbol ?? "₦"
						}${prettifyMoney(transItem?.amount ?? 0)}`,
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
