"use client";
import { CgClose } from "react-icons/cg";
import InputComponent from "../InputComponent";
import Button from "../button";
import { useState } from "react";
import Dropdown from "../Dropdown";
import {
	NOKRelationshipList,
	accomodationTypeList,
	statesList,
} from "@/data/constants";
import {
	updateUserAddress,
	updateUserNextOfKin,
} from "../../../requests/users";
import { toast } from "react-toastify";

const EditAddressModal = ({
	isActive,
	setIsActive,
	addressData = {},
	refetchFunc,
}) => {
	const [formData, setFormData] = useState({
		address: addressData?.address ?? "",
		city: addressData?.city ?? "",
		state: addressData?.state ?? "",
		landmark: addressData?.landmark ?? "",
		status: addressData?.status ?? "",
	});

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("formData", formData);

		setLoading(true);
		try {
			const res = await updateUserAddress(addressData?.userId, formData);
			if (res?.data?.success) {
				console.log("res", res);
				toast.success("User Address Updated Successfully");
				refetchFunc();
			}
		} catch (error) {
			console.log("error", error);
			toast.error("Error Updating User Address");
		} finally {
			setLoading(false);
			setIsActive(false);
		}
	};

	return (
		<div className="bg-white rounded-lg px-4 pt-4 pb-8 ">
			<div className="flex flex-row items-center gap-4 justify-between mb-6 ">
				<h2 className="font-bold text-2xl ">Edit User Address</h2>
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
				<div className="grid grid-cols-2 gap-2">
					<InputComponent
						label="Line 1 Address"
						name="address"
						value={formData.address}
						onChange={(e) =>
							setFormData({ ...formData, address: e.target.value })
						}
						required={true}
					/>
					<InputComponent
						label="City"
						name="city"
						value={formData.city}
						onChange={(e) => setFormData({ ...formData, city: e.target.value })}
						required={true}
					/>
					<div>
						<p className="text-base text-bgray-600 dark:text-bgray-50  font-medium text-sm mb-2 ">
							State
						</p>
						<Dropdown
							optionsList={statesList}
							selectedOption={formData.state}
							handleSelect={(e) =>
								setFormData({ ...formData, state: e.target.innerText })
							}
							placeholder="Select State"
						/>
					</div>
					<InputComponent
						label="Landmark"
						name="landmark"
						value={formData.landmark}
						onChange={(e) =>
							setFormData({ ...formData, landmark: e.target.value })
						}
						// required={true}
					/>
				</div>
				<div>
					<p className="text-base text-bgray-600 dark:text-bgray-50  font-medium text-sm mb-2 ">
						Accomodation Type / Status
					</p>
					<Dropdown
						optionsList={accomodationTypeList}
						selectedOption={formData.status}
						handleSelect={(e) =>
							setFormData({ ...formData, status: e.target.innerText })
						}
						placeholder="Select Accomodation Type / Status"
					/>
				</div>
				<div className="mt-5">
					<Button loading={loading}>Update</Button>
				</div>
			</form>
		</div>
	);
};

export default EditAddressModal;
