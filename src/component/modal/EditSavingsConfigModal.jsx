"use client";
import { CgClose } from "react-icons/cg";
import InputComponent from "../InputComponent";
import Button from "../button";
import { useState } from "react";
import { updateSavingsConfig } from "../../../requests/savings";
import { toast } from "react-toastify";

const EditSavingsConfigModal = ({ configData, setIsActive, refetchFunc }) => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		lockInterest: configData?.lockInterest ?? "",
		savingsInterest: configData?.savingsInterest ?? "",
		minimumLockDuration: configData?.minimumLockDuration ?? "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("formData", formData);

		setLoading(true);
		try {
			const res = await updateSavingsConfig(formData);
			if (res?.data?.success) {
				console.log("res", res);
				toast.success("Savings Config Updated Successfully");
				refetchFunc();
			}
		} catch (error) {
			console.log("error", error);
			toast.error("Error Updating Savings Config");
		} finally {
			setLoading(false);
			setIsActive(false);
		}
	};

	return (
		<div className="bg-white rounded-lg px-4 pt-4 pb-8 ">
			<div className="flex flex-row items-center gap-4 justify-between mb-6 ">
				<h2 className="font-bold text-2xl ">Configure Savings Settings</h2>
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
					label="Lock Interest (%)"
					name="lockInterest"
					value={formData.lockInterest}
					onChange={(e) =>
						setFormData({ ...formData, lockInterest: e.target.value })
					}
					required={true}
					type="number"
				/>
				<InputComponent
					label="Savings Interest (%)"
					name="savingsInterest"
					value={formData.savingsInterest}
					onChange={(e) =>
						setFormData({ ...formData, savingsInterest: e.target.value })
					}
					required={true}
					type="number"
				/>
				<InputComponent
					label="Minimum Lock Duration (days)"
					name="minimumLockDuration"
					value={formData.minimumLockDuration}
					onChange={(e) =>
						setFormData({ ...formData, minimumLockDuration: e.target.value })
					}
					required={true}
					type="number"
				/>
				<div className="mt-4">
					<Button loading={loading}>Update</Button>
				</div>
			</form>
		</div>
	);
};

export default EditSavingsConfigModal;
