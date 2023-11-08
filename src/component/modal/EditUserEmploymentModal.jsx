"use client";
import { CgClose } from "react-icons/cg";
import InputComponent from "../InputComponent";
import Button from "../button";
import { useState } from "react";
import Dropdown from "../Dropdown";
import { employmentStatusList, sectorList, statesList } from "@/data/constants";
import CBDatePicker from "../CBDatePicker";
import { formatDateToDdMmYyyy } from "../../../utils/helperFuncs";
import { updateUserEmployment } from "../../../requests/users";
import { toast } from "react-toastify";

export const EditUserEmploymentModal = ({
	isActive,
	setIsActive,
	employmentData = {},
	refetchFunc,
}) => {
	const [formData, setFormData] = useState({
		status: employmentData?.status ?? "",
		company: employmentData?.company ?? "",
		dateStarted: employmentData?.dateStarted ?? "",
		sector: employmentData?.sector ?? "",
		address: employmentData?.address ?? "",
		state: employmentData?.state ?? "",
		month_income: employmentData?.month_income ?? "",
		city: employmentData?.city ?? "",
	});

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("formData", formData);

		setLoading(true);
		try {
			const res = await updateUserEmployment(employmentData?.userId, formData);
			if (res?.data?.success) {
				console.log("res", res);
				toast.success("Employment Info Updated Successfully");
				refetchFunc();
			}
		} catch (error) {
			console.log("error", error);
			toast.error("Error Updating Employment Info");
		} finally {
			setLoading(false);
			setIsActive(false);
		}
	};

	return (
		<div className="bg-white rounded-lg px-4 pt-4 pb-8 ">
			<div className="flex flex-row items-center gap-4 justify-between mb-6 ">
				<h2 className="font-bold text-2xl ">Edit Employment Info</h2>
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
				<div>
					<p className="text-base text-bgray-600 dark:text-bgray-50  font-medium text-sm mb-2 ">
						Employment Status
					</p>
					<Dropdown
						optionsList={employmentStatusList}
						selectedOption={formData.status}
						handleSelect={(e) =>
							setFormData({ ...formData, status: e.target.innerText })
						}
						placeholder="Select Employment Status"
					/>
				</div>
				<InputComponent
					label="Company"
					name="company"
					value={formData.company}
					onChange={(e) =>
						setFormData({ ...formData, company: e.target.value })
					}
					required={true}
				/>
				<div>
					<p className="text-base text-bgray-600 dark:text-bgray-50  font-medium text-sm mb-2 ">
						Sector
					</p>
					<Dropdown
						optionsList={sectorList}
						selectedOption={formData.sector}
						handleSelect={(e) =>
							setFormData({ ...formData, sector: e.target.innerText })
						}
						placeholder="Select Sector"
					/>
				</div>
				<div className="py-4">
					<p className="mb-2">EMPLOYMENT ADDRESS</p>
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
							onChange={(e) =>
								setFormData({ ...formData, city: e.target.value })
							}
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
					</div>
				</div>
				<InputComponent
					label="Monthly Income"
					name="monthly_income"
					value={formData.month_income}
					onChange={(e) =>
						setFormData({ ...formData, month_income: e.target.value })
					}
					required={true}
				/>
				<div>
					<p className="text-base text-bgray-600 dark:text-bgray-50  font-medium text-sm mb-2 ">
						Date Started
					</p>
					<CBDatePicker
						selectedDate={formData.dateStarted}
						handleSelect={(date) => {
							setFormData({
								...formData,
								dateStarted: formatDateToDdMmYyyy(date),
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
