"use client";
import { useEffect, useState } from "react";
import { getBillingStatus } from "../../../requests/billing";
import Loading from "../loading";
import GoBack from "../GoBack";
import InfoBlock from "../user/InfoBlock";
import InfoRow from "../user/InfoRow";

const SelectedBillingInfo = ({ id }) => {
	const [loading, setLoading] = useState(false);
	const [fetched, setFetched] = useState(false);
	const [billingData, setBillingData] = useState({});

	const fetchBillingData = async () => {
		setLoading(true);
		try {
			const res2 = await getBillingStatus(id);
			console.log("res2", res2);
			if (res2.data?.success) {
				setBillingData(res2.data?.data?.data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
			setFetched(true);
		}
	};

	useEffect(() => {
		fetchBillingData();
	}, []);

	return fetched ? (
		loading ? (
			<Loading />
		) : (
			<>
				<GoBack backLink="/billing" />
				<h2 className="font-bold text-3xl my-4">Billing Data</h2>

				<InfoBlock title="Billing Info">
					<InfoRow
						label="Customer Phone Number"
						value={billingData?.customer_id ?? "-"}
					/>
				</InfoBlock>
			</>
		)
	) : (
		<Loading />
	);
};

export default SelectedBillingInfo;
