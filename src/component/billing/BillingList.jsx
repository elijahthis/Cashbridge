"use client";
import { useEffect, useState } from "react";
import MUITable from "../MUITable";
import {
	capitalizeFirstLetter,
	formatDate,
	prettifyMoney,
} from "../../../utils/helperFuncs";
import { getAllSavings } from "../../../requests/savings";
import {
	amountFilterList,
	currencyList,
	savingsStatusList,
} from "@/data/constants";
import useFilterSavings from "../../../hooks/useFilterSavings";
import FilterRow from "../filter/FilterRow";
import FilterBlock from "../filter/FilterBlock";
import Dropdown from "../Dropdown";
import CBDatePicker from "../CBDatePicker";
import { getAllBilling } from "../../../requests/billing";
import { useRouter } from "next/navigation";

const BillingSummary = () => {
	const router = useRouter();

	const [billingLoading, setBillingLoading] = useState(false);
	const [billingSummary, setBillingSummary] = useState([]);
	const [billingTransactions, setBillingTransactions] = useState([]);

	const fetchBillingData = async () => {
		setBillingLoading(true);
		try {
			const res2 = await getAllBilling();
			console.log("res2", res2);
			if (res2.data?.success) {
				setBillingSummary(res2.data?.data?.data?.summary);
				setBillingTransactions(res2.data?.data?.data?.transactions);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setBillingLoading(false);
		}
	};

	useEffect(() => {
		fetchBillingData();
	}, []);

	console.log("billingSummary", billingSummary);

	return (
		<>
			<section className="py-6">
				<h2 className="font-bold text-3xl mb-4">Billing Transactions</h2>
				<div>
					<MUITable
						headers={[
							{ label: "Transaction ID", key: "tx_id" },
							{ label: "Amount", key: "amount" },
							{ label: "Customer ID (Phone)", key: "customer_id" },
							{ label: "Frequency", key: "frequency" },
							{ label: "Product", key: "product" },
							{ label: "Product Name", key: "product_name" },
							{ label: "Commission", key: "commission" },
							{ label: "Created At", key: "created_at" },
						]}
						bodyData={billingTransactions.map((billItem) => ({
							tx_id: billItem?.tx_id,
							amount: `${
								currencyList.find((item) => item.label === billItem?.currency)
									?.symbol ?? "₦"
							} ${billItem?.amount}`,
							customer_id: billItem?.customer_id,
							frequency: billItem?.frequency,
							product: billItem?.product,
							product_name: billItem?.product_name,
							commission: billItem?.commission,
							created_at: formatDate(billItem?.created_at),
							onClick: () => {
								router.push(`/billing/${billItem?.tx_id}`);
							},
						}))}
						handlePageClick={(page) => {}}
						pageCount={1}
						loading={billingLoading}
						showPagination={false}
					/>
				</div>
			</section>
			<section className="py-6">
				<h2 className="font-bold text-3xl mb-4">Billing Summary</h2>
				<div>
					<MUITable
						headers={[
							// { label: "Customer Name", key: "customer" },
							{ label: "Currency", key: "currency" },
							{ label: "Bills Sum", key: "sum_bills" },
							{ label: "Commission Sum", key: "sum_commission" },
							{ label: "DSTV Sum", key: "sum_dstv" },
							{ label: "Airtime Sum", key: "sum_airtime" },
							{ label: "DSTV Count", key: "count_dstv" },
							{ label: "Airtime Count", key: "count_airtime" },
						]}
						bodyData={billingSummary.map((billItem) => ({
							currency: billItem?.currency,
							sum_bills: billItem?.sum_bills,
							sum_commission: billItem?.sum_commission,
							sum_dstv: billItem?.sum_dstv,
							sum_airtime: billItem?.sum_airtime,
							count_dstv: billItem?.count_dstv,
							count_airtime: billItem?.count_airtime,
						}))}
						handlePageClick={(page) => {}}
						pageCount={1}
						loading={billingLoading}
						showPagination={false}
					/>
				</div>
			</section>
		</>
	);
};

export default BillingSummary;
