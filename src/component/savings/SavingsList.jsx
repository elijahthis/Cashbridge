"use client";
import { useEffect, useState } from "react";
import MUITable from "../MUITable";
import {
	capitalizeFirstLetter,
	formatDate,
	prettifyMoney,
} from "../../../utils/helperFuncs";
import { getAllSavings } from "../../../requests/savings";
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

const SavingsList = () => {
	const [currPage, setCurrPage] = useState(1);
	const [savingsLoading, setSavingsLoading] = useState(false);
	const [totalSavingsPages, setTotalSavingsPages] = useState(1);
	const [savingsList, setSavingsList] = useState([]);

	const itemsPerPage = 10;

	const fetchSavingsData = async () => {
		setSavingsLoading(true);
		try {
			const res2 = await getAllSavings(currPage, itemsPerPage);
			console.log("res2", res2);
			if (res2.data?.success) {
				setSavingsList(res2.data?.data?.data);
				setTotalSavingsPages(res2.data?.data?.total_pages);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSavingsLoading(false);
		}
	};

	useEffect(() => {
		fetchSavingsData();
	}, [currPage, itemsPerPage]);

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
	} = useFilterSavings(savingsList);

	console.log("savingsList", savingsList);

	const clearFilters = () => {
		setStatus(undefined);
		setStartDate(undefined);
		setEndDate(undefined);
		setAmountRange(undefined);
	};

	return (
		<section className="py-6">
			<h2 className="font-bold text-3xl mb-4">All Savings</h2>
			<FilterRow clearFilters={clearFilters}>
				<FilterBlock label="Status">
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
						// { label: "Customer Name", key: "customer" },
						{ label: "Amount", key: "amount" },
						{ label: "Type", key: "type" },
						{ label: "Lock Period", key: "lockPeriod" },
						{ label: "Interest Rate", key: "interestRate" },
						{ label: "Interest Earned", key: "interestEarned" },
						{ label: "Status", key: "status" },
						{ label: "Created At", key: "createdAt" },
						{ label: "Last Updated", key: "updatedAt" },
					]}
					bodyData={filteredSavings.map((transItem) => ({
						// customer: `${transItem?.userId?.firstname} ${transItem?.userId?.lastname}`,

						amount: `${
							currencyList.find((item) => item.label === transItem?.currency)
								?.symbol ?? "₦"
						}${prettifyMoney(transItem?.amount ?? 0)}`,
						type: (transItem?.type || "").toUpperCase(),
						status:
							transItem?.status === "inactive" ? (
								<span className="px-3 py-2 rounded-lg bg-[#FCDEDE] text-[#DD3333] ">
									Inactive
								</span>
							) : transItem?.status === "active" ? (
								<span className="px-3 py-2 rounded-lg bg-[#D9FBE6] text-[#22C55E] ">
									Active
								</span>
							) : (
								transItem?.status
							),
						lockPeriod: `${transItem?.lockPeriod || 0} days`,
						createdAt: formatDate(transItem?.createdAt),
						updatedAt: formatDate(transItem?.updatedAt),
						interestRate: `${transItem?.interestRate}%`,
						interestEarned: `${
							currencyList.find((item) => item.label === transItem?.currency)
								?.symbol ?? "₦"
						}${prettifyMoney(transItem?.interestEarned ?? 0)}`,
					}))}
					handlePageClick={(page) => {
						setCurrPage(page);
					}}
					pageCount={totalSavingsPages}
					loading={savingsLoading}
				/>
			</div>
		</section>
	);
};

export default SavingsList;
