"use client";
import { useEffect, useState } from "react";
import { getLoanTiers } from "../../../requests/loans";
import MUITable from "../MUITable";
import { formatDate, formatNumberAsMoney } from "../../../utils/helperFuncs";
import Modal from "../modal";
import CRLoanTierModal from "../modal/CRLoanTierModal";
import DeleteLoanTierModal from "../modal/DeleteLoanTierModal";

const LoanTierList = () => {
	const [tierListLoading, setTierListLoading] = useState(false);
	const [tierList, setTierList] = useState([]);
	const [refetch, setRefetch] = useState(false);
	// modal states
	const [openCreateEditModal, setOpenCreateEditModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [edit, setEdit] = useState(null);
	const [deleteId, setDeleteId] = useState(null);

	const fetchData = async () => {
		setTierListLoading(true);
		try {
			const res2 = await getLoanTiers();
			console.log("res2", res2);
			if (res2.data?.success) {
				setTierList(res2.data?.data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setTierListLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [refetch]);

	return (
		<>
			{openCreateEditModal && (
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
			)}
			<section>
				<div className=" mb-4 flex flex-row items-center justify-between ">
					<h2 className="font-bold text-3xl">Loan Tiers</h2>
					<button
						onClick={() => {
							setEdit(null);
							setOpenCreateEditModal(true);
						}}
						className=" font-bold bg-success-300 text-white px-3 py-2 rounded-lg "
					>
						Create Loan Tier
					</button>
				</div>
				<MUITable
					headers={[
						{ label: "Max. Amount", key: "maxAmount" },
						{ label: "Interest Rate", key: "interestRate" },
						{ label: "Default Interest Rate", key: "defaultInterestRate" },
						{ label: "Min. Credit Score", key: "minCreditScore" },
						{ label: "Created At", key: "createdAt" },
						{ label: "", key: "edit" },
						{ label: "", key: "delete" },
					]}
					bodyData={tierList.map((tierItem) => ({
						maxAmount: `₦${formatNumberAsMoney(tierItem?.maxAmount ?? 0)}`,
						interestRate: `${tierItem?.interestRate}%`,
						defaultInterestRate: `${tierItem?.defaultInterestRate}%`,
						minCreditScore: tierItem?.minCreditScore,
						createdAt: formatDate(tierItem?.createdAt),
						edit: (
							<button
								className="text-sm px-3 py-2 text-white bg-darkblack-300 rounded-lg"
								onClick={() => {
									setEdit(tierItem);
									setOpenCreateEditModal(true);
								}}
							>
								Edit
							</button>
						),
						delete: (
							<button
								className=" text-sm px-3 py-2 text-white bg-error-300 rounded-lg"
								onClick={() => {
									setDeleteId(tierItem?._id);
									setOpenDeleteModal(true);
								}}
							>
								Delete
							</button>
						),
					}))}
					handlePageClick={() => {}}
					pageCount={1}
					loading={tierListLoading}
					showPagination={false}
				/>
			</section>
		</>
	);
};

export default LoanTierList;
