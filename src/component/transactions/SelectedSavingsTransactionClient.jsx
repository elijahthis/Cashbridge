"use client";
import { useEffect, useState } from "react";
import {
	getAllSavingTransactions,
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

const SelectedSavingsTransactionClient = ({ params }) => {
	const [transactionData, setTransactionData] = useState({});
	const [transLoading, setTransLoading] = useState(false);
	const [fetched, setFetched] = useState(false);

	const fetchTransactionData = async () => {
		setTransLoading(true);
		try {
			const res2 = await getAllSavingTransactions(params.trnx_id);
			console.log("res2", res2);
			if (res2.data?.success) {
				setTransactionData(res2.data?.data?.[0]);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setTransLoading(false);
			setFetched(true);
		}
	};

	console.log("transactionData", transactionData);

	useEffect(() => {
		fetchTransactionData();
	}, []);

	return fetched ? (
		transLoading ? (
			<Loading />
		) : (
			<>
				<GoBack backLink="/transactions" />
				<h2 className="font-bold text-3xl my-4">Savings Transaction Data</h2>

				{/* <div className="w-full bg-white dark:bg-darkblack-600 rounded-lg px-12 pb-7"> */}
				<InfoBlock title="Customer Info">
					<InfoRow
						label="Name"
						value={
							transactionData?.userId?.firstname
								? `${transactionData?.userId?.firstname} ${transactionData?.userId?.lastname}`
								: "-"
						}
					/>
					<InfoRow
						label="Phone Number"
						value={transactionData?.userId?.phone ?? "-"}
					/>
					<InfoRow
						label="Email Address"
						value={transactionData?.userId?.email ?? "-"}
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
						label="Transaction ID"
						value={transactionData?.trnx_id ?? "-"}
					/>
					<InfoRow
						label="Reference"
						value={transactionData?.reference ?? "-"}
					/>
					<InfoRow
						label="Type"
						value={
							transactionData?.type === "lock"
								? "BRIDGE LOCK"
								: transactionData?.type === "saving"
								? "BRIDGE SAVE"
								: transactionData?.type
						}
					/>
					<InfoRow
						label="Source"
						value={transactionData?.source?.toUpperCase() ?? "-"}
					/>
					<InfoRow
						label="Transaction Date"
						value={
							transactionData?.createdAt
								? formatDate(transactionData?.createdAt)
								: "-"
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

export default SelectedSavingsTransactionClient;
