"use client";
import { useEffect, useState } from "react";
import { getAllLoans, getLoanTiers } from "../../../requests/loans";
import MUITable from "../MUITable";
import {
	capitalizeFirstLetter,
	formatDate,
	formatNumberAsMoney,
} from "../../../utils/helperFuncs";
import Modal from "../modal";
import CRLoanTierModal from "../modal/CRLoanTierModal";
import DeleteLoanTierModal from "../modal/DeleteLoanTierModal";
import { useRouter } from "next/navigation";
import FilterRow from "../filter/FilterRow";
import FilterBlock from "../filter/FilterBlock";
import CBDatePicker from "../CBDatePicker";
import Dropdown from "../Dropdown";

const LoanList = () => {
	const router = useRouter();

	const [loanListLoading, setLoanListLoading] = useState(false);
	const [loanList, setLoanList] = useState([]);
	const [refetch, setRefetch] = useState(false);
	// filter states
	const [startDate, setStartDate] = useState(new Date("2023-01-01"));
	const [endDate, setEndDate] = useState(new Date());
	const [status, setStatus] = useState(null);
	const [isDefaulted, setIsDefaulted] = useState(null);

	// modal states
	const [openCreateEditModal, setOpenCreateEditModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [edit, setEdit] = useState(null);
	const [deleteId, setDeleteId] = useState(null);

	const loansStatusList = ["created", "paid", "active", "due", "rejected"];

	const fetchData = async () => {
		setLoanListLoading(true);
		try {
			const res2 = await getAllLoans(startDate, endDate, status, isDefaulted);
			console.log("res2", res2);
			if (res2.data?.success) {
				setLoanList(res2.data?.data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoanListLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [refetch, startDate, endDate, status, isDefaulted]);

	const clearFilters = () => {
		setStartDate(new Date("2023-01-01"));
		setEndDate(new Date());
		setStatus(null);
		setIsDefaulted(null);
	};

	return (
		<>
			{/* {openCreateEditModal && (
				<Modal
					isActive={openCreateEditModal}
					setIsActive={setOpenCreateEditModal}
				>
					<CRLoanTierModal
						isActive={openCreateEditModal}
						setIsActive={setOpenCreateEditModal}
						edit={edit}
						refetchFunc={() => setRefetch((val) => !val)}
					/>
				</Modal>
			)}
			{openDeleteModal && (
				<Modal isActive={openDeleteModal} setIsActive={setOpenDeleteModal}>
					<DeleteLoanTierModal
						isActive={openDeleteModal}
						setIsActive={setOpenDeleteModal}
						tierId={deleteId}
						refetchFunc={() => setRefetch((val) => !val)}
					/>
				</Modal>
			)} */}
			<section className="mb-10">
				<div className=" mb-4 flex flex-row items-center justify-between ">
					<h2 className="font-bold text-3xl">All Loans</h2>
					{/* <button
						onClick={() => {
							setEdit(null);
							setOpenCreateEditModal(true);
						}}
						className=" font-bold bg-success-300 text-white px-3 py-2 rounded-lg "
					>
						Create Loan Tier
					</button> */}
				</div>

				<FilterRow clearFilters={clearFilters}>
					<FilterBlock label="Status">
						<Dropdown
							optionsList={loansStatusList.map((item) =>
								capitalizeFirstLetter(item)
							)}
							selectedOption={
								status ? capitalizeFirstLetter(status) : undefined
							}
							handleSelect={(e, ind) => {
								setStatus(loansStatusList[ind]);
							}}
							placeholder="Select Status"
						/>
					</FilterBlock>
					{/* <FilterBlock label="Type">
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
					{/* <FilterBlock label="Amount">
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
				</FilterBlock> */}
				</FilterRow>

				<MUITable
					headers={[
						{ label: "Loan Amount", key: "loanAmount" },
						{ label: "Interest Rate", key: "interestRate" },
						{ label: "Repayment Period", key: "repaymentPeriod" },
						{ label: "status", key: "status" },
						{ label: "Date Taken", key: "createdAt" },
						{ label: "Amount Paid", key: "amountPaid" },
					]}
					bodyData={loanList.map((loanItem) => ({
						loanAmount: `₦${formatNumberAsMoney(loanItem?.loanAmount ?? 0)}`,
						interestRate: `${loanItem?.interestRate}%`,
						repaymentPeriod: `${loanItem?.repaymentPeriod} days`,
						status:
							loanItem?.status === "failed" ? (
								<span className="px-3 py-2 rounded-lg bg-[#FCDEDE] text-[#DD3333] ">
									Failed
								</span>
							) : loanItem?.status === "paid" ? (
								<span className="px-3 py-2 rounded-lg bg-[#D9FBE6] text-[#22C55E] ">
									Paid
								</span>
							) : (
								loanItem?.status
							),
						createdAt: formatDate(loanItem?.createdAt),
						amountPaid: `₦${formatNumberAsMoney(loanItem?.amountPaid ?? 0)}`,
						onClick: () => {
							router.push(`/loans/${loanItem?._id}`);
						},
					}))}
					handlePageClick={() => {}}
					pageCount={1}
					loading={loanListLoading}
					showPagination={false}
				/>
			</section>
		</>
	);
};

export default LoanList;
