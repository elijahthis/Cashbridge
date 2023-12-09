"use client";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../requests/users";
import Loading from "@/component/loading";
import totalEarn from "@/assets/images/icons/total-earn.svg";
import memberImg from "@/assets/images/avatar/members-2.png";
import TotalWidgetCard from "../widget/TotalWidgetCard";
import { getLoanAnalytics } from "../../../requests/loans";

function LoanAnalyticsWidget() {
	const [loanAnalytics, setLoanAnalytics] = useState({
		totalLoanAmount: 0,
		totalLoanRepayment: 0,
		averageLoanAmount: 0,
		totalDueLoan: 0,
		averageLoanDuration: 0,
		totalActiveLoans: 0,
		totalUnpaidLoan: 0,
	});
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await getLoanAnalytics();
			setLoanAnalytics(res?.data?.data);
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
					title="Total Loan Amount"
					amount={loanAnalytics.totalLoanAmount}
					groth="+ 3.5%"
					id="totalLoanAmount"
					loading={loading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Total Loan Repayment"
					amount={loanAnalytics.totalLoanRepayment}
					groth="+ 3.5%"
					id="totalLoanRepayment"
					loading={loading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Average Loan Amount"
					amount={loanAnalytics.averageLoanAmount}
					groth="+ 3.5%"
					id="averageLoanAmount"
					loading={loading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Total Due Loan"
					amount={loanAnalytics.totalDueLoan}
					groth="+ 3.5%"
					id="totalDueLoan"
					loading={loading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Average Loan Duration"
					amount={loanAnalytics.averageLoanDuration}
					groth="+ 3.5%"
					id="averageLoanDuration"
					loading={loading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Total Active Loans"
					amount={loanAnalytics.totalActiveLoans}
					groth="+ 3.5%"
					id="totalActiveLoans"
					loading={loading}
				/>
				<TotalWidgetCard
					totalEarnImg={totalEarn}
					memberImg={memberImg}
					title="Total Unpaid Loan"
					amount={loanAnalytics.totalUnpaidLoan}
					groth="+ 3.5%"
					id="totalUnpaidLoan"
					loading={loading}
				/>
			</div>
		</div>
	);
}

export default LoanAnalyticsWidget;
