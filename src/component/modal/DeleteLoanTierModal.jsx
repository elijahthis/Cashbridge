"use client";
import { CgClose } from "react-icons/cg";
import InputComponent from "../InputComponent";
import Button from "../button";
import { useState } from "react";
import { toast } from "react-toastify";
import {
	createLoanTier,
	deleteLoanTier,
	editLoanTier,
} from "../../../requests/loans";

const DeleteLoanTierModal = ({
	isActive,
	setIsActive,
	tierId,
	refetchFunc,
}) => {
	const [loading, setLoading] = useState(false);

	const deleteFunc = async () => {
		setLoading(true);
		try {
			const res = await deleteLoanTier(tierId);
			if (res?.status === 204) {
				console.log("res", res);
				toast.success("Loan Tier Deleted Successfully");
				refetchFunc();
			}
		} catch (error) {
			console.log("error", error);
			toast.error("Error Deleting Loan Tier");
		} finally {
			setLoading(false);
			setIsActive(false);
		}
	};

	return (
		<div className="bg-white rounded-lg px-4 pt-4 pb-8 ">
			<div className="flex flex-row items-center gap-4 justify-between mb-6 ">
				<h2 className="font-bold text-2xl ">Delete Loan Tier</h2>
				<CgClose
					size={24}
					className="cursor-pointer"
					onClick={() => setIsActive(false)}
				/>
			</div>
			<p className="mb-8">Are you sure you want to delete this loan tier?</p>
			<div className="flex flex-row gap-4">
				<Button
					onClick={() => setIsActive(false)}
					className="bg-transparent text-success-300 px-3 py-2 rounded-lg"
				>
					Cancel
				</Button>
				<Button
					loading={loading}
					onClick={deleteFunc}
					className="bg-red-500 text-white px-3 py-2 rounded-lg"
				>
					Delete
				</Button>
			</div>
		</div>
	);
};

export default DeleteLoanTierModal;
