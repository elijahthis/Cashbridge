"use client";
import { CgClose } from "react-icons/cg";
import InputComponent from "../InputComponent";
import Button from "../button";
import { useState } from "react";
import Dropdown from "../Dropdown";
import { NOKRelationshipList } from "@/data/constants";
import { updateUserNextOfKin } from "../../../requests/users";
import { toast } from "react-toastify";

const EditNOKModal = ({ isActive, setIsActive, NOKData = {}, refetchFunc }) => {
	const [formData, setFormData] = useState({
		firstName: NOKData?.firstName ?? "",
		lastName: NOKData?.lastName ?? "",
		phone: NOKData?.phone ?? "",
		address: NOKData?.address ?? "",
		relationship: NOKData?.relationship ?? "",
	});

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("formData", formData);

		setLoading(true);
		try {
			const res = await updateUserNextOfKin(NOKData?.userId, formData);
			if (res?.data?.success) {
				console.log("res", res);
				toast.success("Next of Kin Info Updated Successfully");
				refetchFunc();
			}
		} catch (error) {
			console.log("error", error);
			toast.error("Error Updating Next of Kin Info");
		} finally {
			setLoading(false);
			setIsActive(false);
		}
	};

	return (
		<div className="bg-white rounded-lg px-4 pt-4 pb-8 ">
			<div className="flex flex-row items-center gap-4 justify-between mb-6 ">
				<h2 className="font-bold text-2xl ">Edit Next of Kin Info</h2>
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
						label="First Name"
						name="firstname"
						value={formData.firstName}
						onChange={(e) =>
							setFormData({ ...formData, firstName: e.target.value })
						}
						required={true}
					/>
					<InputComponent
						label="Last Name"
						name="lastname"
						value={formData.lastName}
						onChange={(e) =>
							setFormData({ ...formData, lastName: e.target.value })
						}
						required={true}
					/>
				</div>
				<InputComponent
					label="Phone Number"
					name="phone"
					value={formData.phone}
					onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
					required={true}
				/>
				<InputComponent
					label="Address"
					name="address"
					value={formData.address}
					onChange={(e) =>
						setFormData({ ...formData, address: e.target.value })
					}
					required={true}
				/>
				<div>
					<p className="text-base text-bgray-600 dark:text-bgray-50  font-medium text-sm mb-2 ">
						Relationship with Next of Kin
					</p>
					<Dropdown
						optionsList={NOKRelationshipList}
						selectedOption={formData.relationship}
						handleSelect={(e) =>
							setFormData({ ...formData, relationship: e.target.innerText })
						}
						placeholder="Select Relationship"
					/>
				</div>

				<div className="mt-5">
					<Button loading={loading}>Update</Button>
				</div>
			</form>
		</div>
	);
};

export default EditNOKModal;
