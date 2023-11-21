"use client";
import { CgClose } from "react-icons/cg";
import InputComponent from "../InputComponent";
import Button from "../button";
import { useState } from "react";
import { toast } from "react-toastify";
import { createLoanTier, editLoanTier } from "../../../requests/loans";

const CRLoanTierModal = ({ isActive, setIsActive, edit, refetchFunc }) => {
	const [formData, setFormData] = useState({
		maxAmount: edit?.maxAmount ?? "",
		interestRate: edit?.interestRate ?? "",
		defaultInterestRate: edit?.defaultInterestRate ?? "",
		minCreditScore: edit?.minCreditScore ?? "",
	});

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("formData", formData);

		setLoading(true);
		try {
			const res = edit
				? await editLoanTier(formData, edit?._id)
				: await createLoanTier(formData);
			if (res?.data?.success) {
				console.log("res", res);

				if (edit) toast.success("Loan Tier Updated Successfully");
				else toast.success("Loan Tier Created Successfully");

				refetchFunc();
			}
		} catch (error) {
			console.log("error", error);

			if (edit) toast.success("Error Updating Loan Tier");
			else toast.success("Error Creating Loan Tier");
		} finally {
			setLoading(false);
			setIsActive(false);
		}
	};

	return (
		<div className="bg-white rounded-lg px-4 pt-4 pb-8 ">
			<div className="flex flex-row items-center gap-4 justify-between mb-6 ">
				<h2 className="font-bold text-2xl ">
					{edit ? "Edit" : "Create"} Loan Tier
				</h2>
				<CgClose
					size={24}
					className="cursor-pointer"
					onClick={() => setIsActive(false)}
				/>
			</div>
			<form
				action=""
				className="flex flex-col items-stretch gap-3 "
				onSubmit={handleSubmit}
			>
				<InputComponent
					label="Max. Amount"
					name="maxAmount"
					value={formData.maxAmount}
					onChange={(e) =>
						setFormData({ ...formData, maxAmount: e.target.value })
					}
					required={true}
					type="number"
				/>
				<InputComponent
					label="Interest Rate (%)"
					name="interestRate"
					value={formData.interestRate}
					onChange={(e) =>
						setFormData({ ...formData, interestRate: e.target.value })
					}
					required={true}
					type="number"
				/>
				<InputComponent
					label="Default Interest Rate (%)"
					name="defaultInterestRate"
					value={formData.defaultInterestRate}
					onChange={(e) =>
						setFormData({ ...formData, defaultInterestRate: e.target.value })
					}
					required={true}
					type="number"
				/>
				<InputComponent
					label="Min. Credit Score"
					name="minCreditScore"
					value={formData.minCreditScore}
					onChange={(e) =>
						setFormData({ ...formData, minCreditScore: e.target.value })
					}
					required={true}
					type="number"
				/>

				<div className="mt-5">
					<Button loading={loading}>{edit ? "Update" : "Create"}</Button>
				</div>
			</form>
		</div>
	);
};

export default CRLoanTierModal;
