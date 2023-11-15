"use client";
import { useEffect, useState } from "react";
import MUITable from "../MUITable";
import {
	capitalizeFirstLetter,
	formatDate,
	prettifyMoney,
} from "../../../utils/helperFuncs";
import { getUserSavings } from "../../../requests/savings";

const UserSavings = ({ refetch, userId }) => {
	const [currPage, setCurrPage] = useState(1);
	const [savingsLoading, setSavingsLoading] = useState(false);
	const [totalSavingsPages, setTotalSavingsPages] = useState(1);
	const [savingsList, setSavingsList] = useState([]);

	const itemsPerPage = 10;

	const fetchSavingsData = async () => {
		setSavingsLoading(true);
		try {
			const res2 = await getUserSavings(userId, currPage, itemsPerPage);
			console.log("res2", res2);
			if (res2.data?.success) {
				setSavingsList(res2.data?.data?.data);
				setTotalSavingsPages(res2.data?.data?.total_pages);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSavingsLoading(false);
		}
	};

	useEffect(() => {
		fetchSavingsData();
	}, [currPage, itemsPerPage, refetch]);

	console.log("savingsList", savingsList);

	return (
		<section className="py-6">
			<h2 className="font-bold text-3xl mb-4">Savings</h2>
			<div>
				<MUITable
					headers={[
						// { label: "Customer Name", key: "customer" },
						{ label: "Amount", key: "amount" },
						{ label: "Type", key: "type" },
						{ label: "Lock Period", key: "lockPeriod" },
						{ label: "Interest Rate", key: "interestRate" },
						{ label: "Interest Earned", key: "interestEarned" },
						{ label: "Status", key: "status" },
						{ label: "Created At", key: "createdAt" },
						{ label: "Last Updated", key: "updatedAt" },
					]}
					bodyData={savingsList.map((transItem) => ({
						// customer: `${transItem?.userId?.firstname} ${transItem?.userId?.lastname}`,

						amount: `${transItem?.currency ?? "NGN"}${prettifyMoney(
							transItem?.amount ?? 0
						)}`,
						type: (transItem?.type || "").toUpperCase(),
						status:
							transItem?.status === "inactive" ? (
								<span className="px-3 py-2 rounded-lg bg-[#FCDEDE] text-[#DD3333] ">
									Inactive
								</span>
							) : transItem?.status === "active" ? (
								<span className="px-3 py-2 rounded-lg bg-[#D9FBE6] text-[#22C55E] ">
									Active
								</span>
							) : (
								transItem?.status
							),
						lockPeriod: `${transItem?.lockPeriod || 0} days`,
						createdAt: formatDate(transItem?.createdAt),
						updatedAt: formatDate(transItem?.updatedAt),
						interestRate: `${transItem?.interestRate}%`,
						interestEarned: `NGN${prettifyMoney(
							transItem?.interestEarned ?? 0
						)}`,
					}))}
					handlePageClick={(page) => {
						setCurrPage(page);
					}}
					pageCount={totalSavingsPages}
					loading={savingsLoading}
				/>
			</div>
		</section>
	);
};

export default UserSavings;
