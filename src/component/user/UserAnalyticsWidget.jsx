"use client";
import { useEffect, useState } from "react";
import { getAllUsers, getUserAnalytics } from "../../../requests/users";
import Loading from "@/component/loading";
import totalEarn from "@/assets/images/icons/total-earn.svg";
import memberImg from "@/assets/images/avatar/members-2.png";
import TotalWidgetCard from "../widget/TotalWidgetCard";
import MUITable from "../MUITable";

function UserAnalyticsWidget() {
	const [userAnalytics, setUserAnalytics] = useState({
		totalUsers: 0,
		verifiedUsersCount: 0,
		tierLevelStats: {
			0: 0,
			1: 0,
			3: 0,
		},
		suspendedUsersCount: 0,
		activeUsersCount: 0,
	});
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await getUserAnalytics();
			setUserAnalytics(res?.data?.data);
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
					title="Total Users"
					amount={userAnalytics.totalUsers}
					groth="+ 3.5%"
					id="totalUsers"
					loading={loading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Total Verified Users"
					amount={userAnalytics.verifiedUsersCount}
					groth="+ 3.5%"
					id="verifiedUsersCount"
					loading={loading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Total Suspended Users"
					amount={userAnalytics.suspendedUsersCount}
					groth="+ 3.5%"
					id="suspendedUsersCount"
					loading={loading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Total Active Users"
					amount={userAnalytics.activeUsersCount}
					groth="+ 3.5%"
					id="activeUsersCount"
					loading={loading}
				/>
			</div>
			<div>
				<MUITable
					headers={[
						{ label: "", key: "left_label" },
						{ label: "Tier 0", key: "tier_0" },
						{ label: "Tier 1", key: "tier_1" },
						{ label: "Tier 3", key: "tier_3" },
					]}
					bodyData={[
						{
							left_label: <div className="font-bold">No. of Users</div>,
							tier_0: userAnalytics?.tierLevelStats["0"],
							tier_1: userAnalytics?.tierLevelStats["1"],
							tier_3: userAnalytics?.tierLevelStats["3"],
						},
					]}
					handlePageClick={(page) => {}}
					pageCount={1}
					loading={loading}
					showPagination={false}
				/>
			</div>
		</div>
	);
}

export default UserAnalyticsWidget;
