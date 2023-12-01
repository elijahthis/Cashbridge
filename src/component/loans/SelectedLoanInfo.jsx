"use client";
import { useEffect, useState } from "react";
import { getCompanyExternalTransactions } from "../../../requests/transactions";
import Loading from "../loading";
import GoBack from "../GoBack";
import InfoBlock from "../user/InfoBlock";
import InfoRow from "../user/InfoRow";
import {
	capitalizeFirstLetter,
	convertWeirdDate,
	formatDate,
	formatNumberAsMoney,
} from "../../../utils/helperFuncs";
import { currencyList } from "@/data/constants";
import { getAllLoans } from "../../../requests/loans";

const SelectedLoanInfo = ({ id }) => {
	const [loanData, setLoanData] = useState({});
	const [loanLoading, setLoanLoading] = useState(false);
	const [fetched, setFetched] = useState(false);

	const fetchLoanData = async () => {
		setLoanLoading(true);
		try {
			const res2 = await getAllLoans(id);
			console.log("res2", res2);
			if (res2.data?.success) {
				setLoanData(res2.data?.data?.[0]);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoanLoading(false);
			setFetched(true);
		}
	};

	console.log("loanData", loanData);

	useEffect(() => {
		fetchLoanData();
	}, []);

	return fetched ? (
		loanLoading ? (
			<Loading />
		) : (
			<>
				<GoBack backLink="/loans" />
				<h2 className="font-bold text-3xl my-4">Transaction Data</h2>

				{/* <div className="w-full bg-white dark:bg-darkblack-600 rounded-lg px-12 pb-7"> */}
				<InfoBlock title="Loan Info">
					<InfoRow
						label="Loan Amount"
						value={`${
							currencyList.find((item) => item.label === loanData?.currency)
								?.symbol ?? "₦"
						}${formatNumberAsMoney(loanData?.loanAmount ?? 0)}`}
					/>
					<InfoRow
						label="Interest Rate"
						value={loanData?.interestRate ? `${loanData?.interestRate}%` : "-"}
					/>
					<InfoRow
						label="Total Repayment Amount"
						value={`${
							currencyList.find((item) => item.label === loanData?.currency)
								?.symbol ?? "₦"
						}${formatNumberAsMoney(loanData?.totalRepaymentAmount ?? 0)}`}
					/>
					<InfoRow
						label="Repayment Period"
						value={
							loanData?.repaymentPeriod
								? `${loanData?.repaymentPeriod} months`
								: "-"
						}
					/>
					<InfoRow
						label="Number Of Repayments"
						value={loanData?.numberOfRepayment ?? ""}
					/>
					<InfoRow
						label="Repayment Per Period"
						value={`${
							currencyList.find((item) => item.label === loanData?.currency)
								?.symbol ?? "₦"
						}${formatNumberAsMoney(loanData?.repaymentPerPeriod ?? 0)}`}
					/>
					<InfoRow
						label="Amount Paid"
						value={`${
							currencyList.find((item) => item.label === loanData?.currency)
								?.symbol ?? "₦"
						}${formatNumberAsMoney(loanData?.amountPaid ?? 0)}`}
					/>
					<InfoRow
						label="Date Taken"
						value={loanData?.createdAt ? formatDate(loanData?.createdAt) : "-"}
					/>

					<InfoRow label="Narration" value={loanData?.narration ?? "-"} />
					<InfoRow
						label="Status"
						value={
							loanData?.status === "failed" ? (
								<span className="px-3 py-2 rounded-lg bg-[#FCDEDE] text-[#DD3333] ">
									Failed
								</span>
							) : loanData?.status === "successful" ? (
								<span className="px-3 py-2 rounded-lg bg-[#D9FBE6] text-[#22C55E] ">
									Successful
								</span>
							) : (
								loanData?.status
							)
						}
					/>
				</InfoBlock>

				<InfoBlock title="Customer Info">
					<InfoRow label="Name" value={loanData?.customer?.name ?? "-"} />
					<InfoRow
						label="Phone Number"
						value={loanData?.customer?.phone_number ?? "-"}
					/>
					<InfoRow
						label="Email Address"
						value={loanData?.customer?.email ?? "-"}
					/>
				</InfoBlock>

				{/* </div> */}
			</>
		)
	) : (
		<Loading />
	);
};

export default SelectedLoanInfo;
