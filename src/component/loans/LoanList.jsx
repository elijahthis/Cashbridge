"use client";
import { useEffect, useState } from "react";
import { getAllLoans, getLoanTiers } from "../../../requests/loans";
import MUITable from "../MUITable";
import { formatDate, formatNumberAsMoney } from "../../../utils/helperFuncs";
import Modal from "../modal";
import CRLoanTierModal from "../modal/CRLoanTierModal";
import DeleteLoanTierModal from "../modal/DeleteLoanTierModal";
import { useRouter } from "next/navigation";

const LoanList = () => {
	const router = useRouter();

	const [loanListLoading, setLoanListLoading] = useState(false);
	const [loanList, setLoanList] = useState([]);
	const [refetch, setRefetch] = useState(false);
	// modal states
	const [openCreateEditModal, setOpenCreateEditModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [edit, setEdit] = useState(null);
	const [deleteId, setDeleteId] = useState(null);

	const fetchData = async () => {
		setLoanListLoading(true);
		try {
			const res2 = await getAllLoans();
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
	}, [refetch]);

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
