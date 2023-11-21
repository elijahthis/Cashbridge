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
import { useRouter } from "next/navigation";

const TransactionDashPage = () => {
	const [transLoading, setTransLoading] = useState(false);
	const [transactionList, setTransactionList] = useState([]);

	const router = useRouter();

	const fetchTransactionData = async () => {
		setTransLoading(true);
		try {
			const res2 = await getCompanyExternalTransactions(1);
			console.log("res2", res2);
			if (res2.data?.success) {
				setTransactionList(res2.data?.data?.data);
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
	}, []);

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
			<div className=" mb-4 flex flex-row items-center justify-between ">
				<h2 className="font-bold text-3xl">Transactions</h2>
				<button
					onClick={() => {
						router.push("/transactions");
					}}
					className="text-sm text-success-300 font-bold "
				>
					View More
				</button>
			</div>
			{/* <FilterRow clearFilters={clearFilters}>
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
			</FilterRow> */}
			<div>
				<MUITable
					headers={[
						{ label: "Customer Name", key: "customer" },
						{ label: "Amount", key: "amount" },
						{ label: "Transaction Date", key: "created_at" },
						{ label: "Status", key: "status" },
						{ label: "Transaction Reference", key: "tx_ref" },
					]}
					bodyData={filteredTransactions.map((transItem) => ({
						customer: transItem?.customer?.name,
						amount: `${
							currencyList.find((item) => item.label === transItem?.currency)
								?.symbol ?? "₦"
						}${prettifyMoney(transItem?.amount ?? 0)}`,

						tx_ref: transItem?.tx_ref,
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
						onClick: () => {
							router.push(`/transactions/external/${transItem?.tx_ref}`);
						},
					}))}
					handlePageClick={() => {}}
					pageCount={1}
					loading={transLoading}
					showPagination={false}
				/>
			</div>
		</section>
	);
};

export default TransactionDashPage;
