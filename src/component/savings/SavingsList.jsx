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
import SelectedSavings from "./SelectedSavings";

const SavingsList = () => {
	const [currPage, setCurrPage] = useState(1);
	const [savingsLoading, setSavingsLoading] = useState(false);
	const [totalSavingsPages, setTotalSavingsPages] = useState(1);
	const [savingsList, setSavingsList] = useState([]);
	const [selectedSavingsTransaction, setSelectedSavingsTransaction] =
		useState(null);

	const [startDate, setStartDate] = useState(new Date("2023-01-01"));
	const [endDate, setEndDate] = useState(new Date());
	const [status, setStatus] = useState(null);
	const [type, setType] = useState(null);

	const itemsPerPage = 50;

	const savingsStatusList = ["active", "inactive"];
	const savingsTypeList = ["saving", "lock"];
	const savingsTypeLabelList = ["BRIDGE SAVE", "BRIDGE LOCK"];

	const fetchSavingsData = async () => {
		setSavingsLoading(true);
		try {
			const res2 = await getAllSavings(
				currPage,
				itemsPerPage,
				status,
				type,
				startDate,
				endDate
			);
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
	}, [currPage, itemsPerPage, status, type, startDate, endDate]);

	const { filteredSavings, amountRange, setAmountRange } =
		useFilterSavings(savingsList);

	console.log("savingsList", savingsList);
	console.log("startDate", startDate);

	const clearFilters = async () => {
		setStatus(undefined);
		setStartDate(undefined);
		setEndDate(undefined);
		setAmountRange(undefined);
		setType(null);
	};

	return (
		<section className="py-6">
			<h2 className="font-bold text-3xl mb-4">Savings Transactions</h2>
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
			{selectedSavingsTransaction ? (
				<SelectedSavings
					transItem={selectedSavingsTransaction}
					backFunc={() => setSelectedSavingsTransaction(null)}
				/>
			) : (
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
							type:
								transItem?.type === "lock"
									? "BRIDGE LOCK"
									: transItem?.type === "saving"
									? "BRIDGE SAVE"
									: transItem?.type,
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
							onClick: () => {
								setSelectedSavingsTransaction(transItem);
							},
						}))}
						handlePageClick={(page) => {
							setCurrPage(page);
						}}
						pageCount={totalSavingsPages}
						loading={savingsLoading}
					/>
				</div>
			)}
		</section>
	);
};

export default SavingsList;
