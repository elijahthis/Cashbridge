"use client";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../requests/users";
import Loading from "@/component/loading";
import totalEarn from "@/assets/images/icons/total-earn.svg";
import memberImg from "@/assets/images/avatar/members-2.png";
import TotalWidgetCard from "./TotalWidgetCard";

function TotalWidget() {
	const [userArr, setUserArr] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await getAllUsers();
			setUserArr(res?.data?.data?.users);
			setTotalUsers(res?.data?.data?.totalUsers);
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
					amount={totalUsers}
					groth="+ 3.5%"
					id="totalEarn"
					loading={loading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="PSA balance"
					amount="₦0"
					groth="+ 3.5%"
					id="totalSpending"
					loading={loading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Total PSA Accounts"
					amount="₦0"
					groth="+ 3.5%"
					id="totalSpending"
					loading={loading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Total Transactions"
					amount="0"
					groth="+ 3.5%"
					id="totalGoal"
					loading={loading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Total PSA Balance"
					amount="₦0"
					groth="+ 3.5%"
					id="totalSpending"
					loading={loading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Total Savings"
					amount="₦0"
					groth="+ 3.5%"
					id="totalSpending"
					loading={loading}
				/>
			</div>
		</div>
	);
}

export default TotalWidget;
