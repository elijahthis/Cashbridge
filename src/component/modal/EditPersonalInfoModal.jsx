"use client";
import { CgClose } from "react-icons/cg";
import InputComponent from "../InputComponent";
import Button from "../button";
import { useState } from "react";
import CBDatePicker from "../CBDatePicker";
import { updateUserData } from "../../../requests/users";
import { toast } from "react-toastify";
import {
	convertWeirdDate,
	formatDateToDdMmYyyy,
} from "../../../utils/helperFuncs";

const EditPersonalInfoModal = ({
	isActive,
	setIsActive,
	personalData = {},
	refetchFunc,
}) => {
	const [formData, setFormData] = useState({
		firstname: personalData?.firstname ?? "",
		lastname: personalData?.lastname ?? "",
		dob: personalData?.dob ?? "",
	});

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("formData", formData);

		setLoading(true);
		try {
			const res = await updateUserData(personalData?._id, formData);
			if (res?.data?.success) {
				console.log("res", res);
				toast.success("User Info Updated Successfully");
				refetchFunc();
			}
		} catch (error) {
			console.log("error", error);
			toast.error("Error Updating User Info");
		} finally {
			setLoading(false);
			setIsActive(false);
		}
	};

	return (
		<div className="bg-white rounded-lg px-4 pt-4 pb-8 mt-20 ">
			<div className="flex flex-row items-center gap-4 justify-between mb-6 ">
				<h2 className="font-bold text-2xl ">Edit Personal Info</h2>
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
						value={formData.firstname}
						onChange={(e) =>
							setFormData({ ...formData, firstname: e.target.value })
						}
						required={true}
					/>
					<InputComponent
						label="Last Name"
						name="lastname"
						value={formData.lastname}
						onChange={(e) =>
							setFormData({ ...formData, lastname: e.target.value })
						}
						required={true}
					/>
				</div>
				<div>
					<p className="text-base text-bgray-600 dark:text-bgray-50  font-medium text-sm mb-2 ">
						Date Of Birth (DOB)
					</p>
					<CBDatePicker
						selectedDate={new Date(convertWeirdDate(formData.dob))}
						handleSelect={(date) => {
							setFormData({
								...formData,
								dob: formatDateToDdMmYyyy(date),
							});
						}}
					/>
				</div>

				<div className="mt-5">
					<Button loading={loading}>Update</Button>
				</div>
			</form>
		</div>
	);
};

export default EditPersonalInfoModal;
