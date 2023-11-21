"use client";
import { useEffect, useState } from "react";
import MUITable from "../MUITable";
import { formatDate, prettifyMoney } from "../../../utils/helperFuncs";
import { getAllSavings } from "../../../requests/savings";
import { currencyList } from "@/data/constants";
import useFilterSavings from "../../../hooks/useFilterSavings";
import { useRouter } from "next/navigation";

const SavingsDashPage = () => {
	const [savingsLoading, setSavingsLoading] = useState(false);
	const [savingsList, setSavingsList] = useState([]);

	const router = useRouter();

	const fetchSavingsData = async () => {
		setSavingsLoading(true);
		try {
			const res2 = await getAllSavings(1, 5);
			console.log("res2", res2);
			if (res2.data?.success) {
				setSavingsList(res2.data?.data?.data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSavingsLoading(false);
		}
	};

	useEffect(() => {
		fetchSavingsData();
	}, []);

	console.log("savingsList", savingsList);

	return (
		<section className="py-6">
			<div className=" mb-4 flex flex-row items-center justify-between ">
				<h2 className="font-bold text-3xl">Savings</h2>
				<button
					onClick={() => {
						router.push("/savings");
					}}
					className="text-sm text-success-300 font-bold "
				>
					View More
				</button>
			</div>
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
					bodyData={savingsList?.slice(0, 5).map((transItem) => ({
						// customer: `${transItem?.userId?.firstname} ${transItem?.userId?.lastname}`,

						amount: `${
							currencyList.find((item) => item.label === transItem?.currency)
								?.symbol ?? "₦"
						}${prettifyMoney(transItem?.amount ?? 0)}`,
						type:
							transItem?.type === "lock"
								? "BRIDGE LOCK"
								: transItem?.type === "saving"
								? "BRIDGE SAVE"
								: transItem?.type,
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
						interestEarned: `${
							currencyList.find((item) => item.label === transItem?.currency)
								?.symbol ?? "₦"
						}${prettifyMoney(transItem?.interestEarned ?? 0)}`,
					}))}
					handlePageClick={() => {}}
					pageCount={1}
					loading={savingsLoading}
					showPagination={false}
				/>
			</div>
		</section>
	);
};

export default SavingsDashPage;
