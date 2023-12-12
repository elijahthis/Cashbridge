"use client";
import { useEffect, useState } from "react";
import {
	createRefund,
	getCompanyExternalTransactions,
} from "../../../requests/transactions";
import Loading from "../loading";
import GoBack from "../GoBack";
import InfoBlock from "../user/InfoBlock";
import InfoRow from "../user/InfoRow";
import {
	capitalizeFirstLetter,
	formatNumberAsMoney,
} from "../../../utils/helperFuncs";
import { formatDate } from "@fullcalendar/core";
import { currencyList } from "@/data/constants";
import Button from "../button";
import { toast } from "react-toastify";

const SelectedExternalTransactionClient = ({ params }) => {
	const [transactionData, setTransactionData] = useState({});
	const [transLoading, setTransLoading] = useState(false);
	const [refundLoading, setRefundLoading] = useState(false);
	const [refetch, setRefetch] = useState(false);
	const [fetched, setFetched] = useState(false);

	const fetchTransactionData = async () => {
		setTransLoading(true);
		try {
			const res2 = await getCompanyExternalTransactions(1, params.tx_ref);
			console.log("res2", res2);
			if (res2.data?.success) {
				setTransactionData(res2.data?.data?.data?.[0]);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setTransLoading(false);
			setFetched(true);
		}
	};

	// action requests
	const refundFunc = async () => {
		setRefundLoading(true);
		try {
			const res = await createRefund({
				trnx_id: transactionData?.id?.toString(),
			});
			if (res?.data?.success) {
				toast.success("Refund Successful");
				setRefetch((val) => !val);
			}
		} catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.error);
		} finally {
			setRefundLoading(false);
		}
	};

	console.log("transactionData", transactionData);

	useEffect(() => {
		fetchTransactionData();
	}, [refetch]);

	return fetched ? (
		transLoading ? (
			<Loading />
		) : (
			<>
				<GoBack backLink="/transactions" />
				<h2 className="font-bold text-3xl my-4">Transaction Data</h2>

				<div className="flex flex-row items-center mb-6 ">
					<div>
						<Button
							onClick={() => {
								refundFunc();
							}}
							loading={refundLoading}
						>
							Refund
						</Button>
					</div>
				</div>

				{/* <div className="w-full bg-white dark:bg-darkblack-600 rounded-lg px-12 pb-7"> */}
				<InfoBlock title="Customer Info">
					<InfoRow
						label="Name"
						value={transactionData?.customer?.name ?? "-"}
					/>
					<InfoRow
						label="Phone Number"
						value={transactionData?.customer?.phone_number ?? "-"}
					/>
					<InfoRow
						label="Email Address"
						value={transactionData?.customer?.email ?? "-"}
					/>
				</InfoBlock>

				<InfoBlock title="Transaction Info">
					<InfoRow
						label="Amount"
						value={`${
							currencyList.find(
								(item) => item.label === transactionData?.currency
							)?.symbol ?? "₦"
						}${formatNumberAsMoney(transactionData?.amount ?? 0)}`}
					/>
					<InfoRow
						label="Amount Settled"
						value={`${
							currencyList.find(
								(item) => item.label === transactionData?.currency
							)?.symbol ?? "₦"
						}${formatNumberAsMoney(transactionData?.amount_settled ?? 0)}`}
					/>
					<InfoRow
						label="Transaction Reference (tx_ref)"
						value={transactionData?.tx_ref ?? "-"}
					/>
					<InfoRow
						label="Flutterwave Reference (flw_ref)"
						value={transactionData?.flw_ref ?? "-"}
					/>
					<InfoRow
						label="App Fee"
						value={`${
							currencyList.find(
								(item) => item.label === transactionData?.currency
							)?.symbol ?? "₦"
						}${formatNumberAsMoney(transactionData?.app_fee ?? 0)}`}
					/>
					<InfoRow
						label="Payment Type"
						value={
							transactionData?.payment_type
								? transactionData?.payment_type?.toUpperCase()
								: "-"
						}
					/>
					<InfoRow
						label="Transaction Date"
						value={
							transactionData?.created_at
								? formatDate(transactionData?.created_at)
								: "-"
						}
					/>
					<InfoRow
						label="Narration"
						value={transactionData?.narration ?? "-"}
					/>
					<InfoRow
						label="Status"
						value={
							transactionData?.status === "failed" ? (
								<span className="px-3 py-2 rounded-lg bg-[#FCDEDE] text-[#DD3333] ">
									Failed
								</span>
							) : transactionData?.status === "successful" ? (
								<span className="px-3 py-2 rounded-lg bg-[#D9FBE6] text-[#22C55E] ">
									Successful
								</span>
							) : (
								transactionData?.status
							)
						}
					/>
				</InfoBlock>
				{transactionData?.payment_type === "card" ? (
					<InfoBlock title="Card Info">
						<InfoRow
							label="Card Type"
							value={transactionData?.card?.type ?? "-"}
						/>
						<InfoRow
							label="Country"
							value={transactionData?.card?.country ?? "-"}
						/>
						<InfoRow
							label="Card Issuer"
							value={transactionData?.card?.issuer ?? "-"}
						/>
						<InfoRow
							label="Card Expiry"
							value={transactionData?.card?.expiry ?? "-"}
						/>
						<InfoRow
							label="Card Number"
							value={`${transactionData?.card?.first_6digits} **** **** ${transactionData?.card?.last_4digits}`}
						/>
					</InfoBlock>
				) : (
					<></>
				)}
				{/* </div> */}
			</>
		)
	) : (
		<Loading />
	);
};

export default SelectedExternalTransactionClient;
