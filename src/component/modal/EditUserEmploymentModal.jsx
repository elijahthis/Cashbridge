"use client";
import { CgClose } from "react-icons/cg";
import InputComponent from "../InputComponent";
import Button from "../button";
import { useState } from "react";
import Dropdown from "../Dropdown";
import { sectorList } from "@/data/constants";

export const EditUserEmploymentModal = ({
	isActive,
	setIsActive,
	children,
	employmentData = {},
}) => {
	const [formData, setFormData] = useState({
		_id: employmentData?._id ?? "",
		userId: employmentData?.userId ?? "",
		status: employmentData?.status ?? "",
		company: employmentData?.company ?? "",
		dateStarted: employmentData?.employmentData ?? "",
		sector: employmentData?.sector ?? "",
		address: employmentData?.address ?? "",
		state: employmentData?.state ?? "",
		month_income: employmentData?.month_income ?? "",
		city: employmentData?.city ?? "",
	});

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
				onSubmit={(e) => {
					e.preventDefault();
					setIsActive(false);
				}}
			>
				<InputComponent
					label="Employment Status"
					name="employment_status"
					required={true}
				/>
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
					<p className="text-base text-bgray-600 dark:text-bgray-50  font-medium text-sm ">
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
				<div>
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
						<InputComponent label="State" name="state" required={true} />
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
				<InputComponent
					label="Date Started"
					name="date_started"
					required={true}
				/>

				<div className="mt-5">
					<Button>Update</Button>
				</div>
			</form>
		</div>
	);
};
