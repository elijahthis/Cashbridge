"use client";
import { useEffect, useState } from "react";
import MUITable from "../MUITable";
import {
	capitalizeFirstLetter,
	formatDate,
	formatDatetoYyyyMmDd,
	prettifyMoney,
} from "../../../utils/helperFuncs";
import { getAllSavings } from "../../../requests/savings";
import {
	amountFilterList,
	currencyList,
	productList,
	savingsStatusList,
} from "@/data/constants";
import useFilterSavings from "../../../hooks/useFilterSavings";
import FilterRow from "../filter/FilterRow";
import FilterBlock from "../filter/FilterBlock";
import Dropdown from "../Dropdown";
import CBDatePicker from "../CBDatePicker";
import { getAllBilling } from "../../../requests/billing";
import { useRouter } from "next/navigation";
import SelectedBilling from "./SelectedBilling";

const BillingSummary = () => {
	const router = useRouter();

	const [billingLoading, setBillingLoading] = useState(false);
	const [billingSummary, setBillingSummary] = useState([]);
	const [billingTransactions, setBillingTransactions] = useState([]);
	const [startDate, setStartDate] = useState(new Date("2023-01-01"));
	const [endDate, setEndDate] = useState(new Date());
	const [selectedBillingTransaction, setSelectedBillingTransaction] =
		useState(null);
	const [product, setProduct] = useState(null);

	const fetchBillingData = async () => {
		setBillingLoading(true);
		try {
			const res2 = await getAllBilling(
				formatDatetoYyyyMmDd(startDate),
				formatDatetoYyyyMmDd(endDate),
				product
			);
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
	}, [startDate, endDate, product]);

	const clearFilters = () => {
		setStartDate(new Date("2023-01-01"));
		setEndDate(new Date());
		setProduct(null);
		// setStartDate(undefined);
		// setEndDate(undefined);
		// setAmountRange(undefined);
	};

	console.log("billingSummary", billingSummary);

	return (
		<>
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
						bodyData={billingSummary
							?.filter((item) => item?.currency === "NGN")
							.map((billItem) => ({
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
			<section className="py-6">
				<h2 className="font-bold text-3xl mb-4">Billing Transactions</h2>
				<FilterRow clearFilters={clearFilters}>
					{/* <FilterBlock label="Type">
						<Dropdown
							optionsList={savingsTypeList.map(
								(item, ind) => savingsTypeLabelList[ind]
							)}
							selectedOption={type ? capitalizeFirstLetter(type) : undefined}
							handleSelect={(e, ind) => {
								setType(savingsTypeList[ind]);
							}}
							placeholder="Select Type"
						/>
					</FilterBlock> */}
					<FilterBlock label="From">
						<CBDatePicker
							selectedDate={startDate ? new Date(startDate) : undefined}
							handleSelect={(date) => {
								// set date at 12:00am
								const newDate = new Date(date);
								newDate.setHours(0, 0, 0, 0);
								setStartDate(newDate);
							}}
						/>
					</FilterBlock>
					<FilterBlock label="To">
						<CBDatePicker
							selectedDate={endDate ? new Date(endDate) : undefined}
							handleSelect={(date) => {
								// set date at 11:59pm
								const newDate = new Date(date);
								newDate.setHours(23, 59, 59, 999);
								setEndDate(newDate);
							}}
						/>
					</FilterBlock>
					<FilterBlock label="Product">
						<Dropdown
							optionsList={productList}
							selectedOption={product ? product : undefined}
							handleSelect={(e, ind) => {
								setProduct(productList[ind]);
							}}
							placeholder="Select Product"
						/>
					</FilterBlock>
					{/* <FilterBlock label="Amount">
					<Dropdown
						optionsList={amountFilterList.map((item) =>
							item?.from === 0
								? `< ₦${prettifyMoney(item?.to)}`
								: item.to === Number.MAX_SAFE_INTEGER
								? `> ₦${prettifyMoney(item?.from)}`
								: `₦${prettifyMoney(item?.from)} - ₦${prettifyMoney(item?.to)}`
						)}
						selectedOption={
							amountRange
								? `₦${prettifyMoney(amountRange?.from)} - ₦${prettifyMoney(
										amountRange?.to
								  )}`
								: undefined
						}
						handleSelect={(e, ind) => {
							setAmountRange(amountFilterList[ind]);
						}}
						placeholder="Select Filter Amount"
					/>
				</FilterBlock> */}
				</FilterRow>
				{selectedBillingTransaction ? (
					<SelectedBilling
						billItem={selectedBillingTransaction}
						backFunc={() => setSelectedBillingTransaction(null)}
					/>
				) : (
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
								} ${Number(billItem?.amount)}`,
								customer_id: billItem?.customer_id,
								frequency: billItem?.frequency,
								product: billItem?.product,
								product_name: billItem?.product_name,
								commission: billItem?.commission,
								created_at: formatDate(billItem?.created_at),
								onClick: () => {
									setSelectedBillingTransaction(billItem);
								},
							}))}
							handlePageClick={(page) => {}}
							pageCount={1}
							loading={billingLoading}
							showPagination={false}
						/>
					</div>
				)}
			</section>
		</>
	);
};

export default BillingSummary;
