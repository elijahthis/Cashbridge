"use client";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../requests/users";
import Loading from "@/component/loading";
import totalEarn from "@/assets/images/icons/total-earn.svg";
import memberImg from "@/assets/images/avatar/members-2.png";
import TotalWidgetCard from "./TotalWidgetCard";
import { getCompanyWalletBalance } from "../../../requests/transactions";
import { prettifyMoney } from "../../../utils/helperFuncs";
import { getSavingsAnalytics } from "../../../requests/savings";
import { getLoanAnalytics } from "../../../requests/loans";

function TotalWidget() {
	const [userArr, setUserArr] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0);
	const [loading, setLoading] = useState(false);
	const [savingsLoading, setSavingsLoading] = useState(false);
	const [balanceLoading, setBalanceLoading] = useState(false);
	const [loanLoading, setLoanLoading] = useState(false);
	const [walletList, setWalletList] = useState([]);
	const [savingsAnalytics, setSavingsAnalytics] = useState({
		totalSavings: 0,
		totalLockedSavings: 0,
		totalInterestEarned: 0,
		averageLockDuration: 0,
	});
	const [loanAnalytics, setLoanAnalytics] = useState({
		totalLoanAmount: 0,
		totalLoanRepayment: 0,
		averageLoanAmount: 0,
		totalDueLoan: 0,
		averageLoanDuration: 0,
		totalActiveLoans: 0,
		totalUnpaidLoan: 0,
	});

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

	const fetchWalletBalance = async () => {
		setBalanceLoading(true);
		try {
			const res = await getCompanyWalletBalance();
			console.log("res", res);
			if (res.data?.success) {
				setWalletList(
					res.data?.data?.filter((item) => item?.currency === "NGN") ?? []
				);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setBalanceLoading(false);
		}
	};

	const fetchSavingsData = async () => {
		setSavingsLoading(true);
		try {
			const res = await getSavingsAnalytics();
			setSavingsAnalytics(res?.data?.data);
		} catch (error) {
			console.log(error);
		} finally {
			setSavingsLoading(false);
		}
	};

	const fetchLoanData = async () => {
		setLoanLoading(true);
		try {
			const res = await getLoanAnalytics();
			setLoanAnalytics(res?.data?.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoanLoading(false);
		}
	};

	const fetchFuncs = async () => {
		const promises = [
			fetchData(),
			fetchWalletBalance(),
			fetchSavingsData(),
			fetchLoanData(),
		];

		await Promise.all(promises);
	};

	useEffect(() => {
		fetchFuncs();
	}, []);

	return (
		<div className="mb-[24px] w-full">
			<div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Balance"
					amount={`₦${prettifyMoney(walletList?.[0]?.available_balance ?? 0)}`}
					groth="+ 3.5%"
					id="totalBalance"
					loading={balanceLoading}
					values={[
						{
							label: "Available",
							value: `₦${prettifyMoney(
								walletList?.[0]?.available_balance ?? 0
							)}`,
						},
						{
							label: "Ledger",
							value: `₦${prettifyMoney(
								walletList?.[0]?.available_balance ?? 0
							)}`,
						},
					]}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Total Users"
					amount={totalUsers}
					groth="+ 3.5%"
					id="totalUsers"
					loading={loading}
				/>

				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Total Savings"
					amount={`₦${prettifyMoney(savingsAnalytics.totalSavings)}`}
					groth="+ 3.5%"
					id="totalSavings"
					loading={savingsLoading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Total Loan Amount"
					amount={`₦${prettifyMoney(loanAnalytics.totalLoanAmount)}`}
					groth="+ 3.5%"
					id="totalGoal"
					loading={loading}
				/>
				{/* <TotalWidgetCard
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
				/> */}
			</div>
		</div>
	);
}

export default TotalWidget;
