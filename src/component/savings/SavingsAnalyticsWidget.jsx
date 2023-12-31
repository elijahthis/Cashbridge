"use client";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../requests/users";
import Loading from "@/component/loading";
import totalEarn from "@/assets/images/icons/total-earn.svg";
import memberImg from "@/assets/images/avatar/members-2.png";
import TotalWidgetCard from "../widget/TotalWidgetCard";
import { getSavingsAnalytics } from "../../../requests/savings";
import { formatNumberAsMoney } from "../../../utils/helperFuncs";

function SavingsAnalyticsWidget() {
	const [savingsAnalytics, setSavingsAnalytics] = useState({
		totalSavings: 0,
		totalLockedSavings: 0,
		totalInterestEarned: 0,
		averageLockDuration: 0,
	});
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await getSavingsAnalytics();
			setSavingsAnalytics(res?.data?.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="mb-[24px] w-full">
			<div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Total Savings"
					amount={`₦${formatNumberAsMoney(savingsAnalytics.totalSavings)}`}
					groth="+ 3.5%"
					id="totalSavings"
					loading={loading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Total Locked Savings"
					amount={`₦${formatNumberAsMoney(
						savingsAnalytics.totalLockedSavings
					)}`}
					groth="+ 3.5%"
					id="totalLockedSavings"
					loading={loading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Total Interest Earned"
					amount={`₦${formatNumberAsMoney(
						savingsAnalytics.totalInterestEarned
					)}`}
					groth="+ 3.5%"
					id="totalInterestEarned"
					loading={loading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Average Lock Duration"
					amount={`${savingsAnalytics.averageLockDuration} days`}
					groth="+ 3.5%"
					id="averageLockDuration"
					loading={loading}
				/>
			</div>
		</div>
	);
}

export default SavingsAnalyticsWidget;
