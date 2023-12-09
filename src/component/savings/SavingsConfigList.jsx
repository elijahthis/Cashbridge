"use client";
import { useEffect, useState } from "react";
import MUITable from "../MUITable";
import {
	camelCaseToTitleCase,
	capitalizeFirstLetter,
	formatDate,
	prettifyMoney,
} from "../../../utils/helperFuncs";
import { getAllSavings, getAllSavingsConfig } from "../../../requests/savings";
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
import InfoBlock from "../user/InfoBlock";
import InfoRow from "../user/InfoRow";
import Modal from "../modal";
import EditSavingsConfigModal from "../modal/EditSavingsConfigModal";
import Loading from "../loading";

const SavingsConfigList = () => {
	const [refetch, setRefetch] = useState(false);
	const [openConfigModal, setOpenConfigModal] = useState(false);
	const [savingsLoading, setSavingsLoading] = useState(false);
	const [savingsConfigList, setSavingsConfigList] = useState([]);

	const fetchSavingsData = async () => {
		setSavingsLoading(true);
		try {
			const res2 = await getAllSavingsConfig();
			console.log("res2", res2);
			if (res2.data?.success) {
				setSavingsConfigList(res2.data?.data?.values);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSavingsLoading(false);
		}
	};

	useEffect(() => {
		fetchSavingsData();
	}, [refetch]);

	console.log("savingsConfigList", savingsConfigList);

	return (
		<>
			{openConfigModal && (
				<Modal isActive={openConfigModal} setIsActive={setOpenConfigModal}>
					<EditSavingsConfigModal
						setIsActive={setOpenConfigModal}
						configData={{
							lockInterest: savingsConfigList.filter(
								(item) => item.key === "lockInterest"
							)[0]?.value,
							savingsInterest: savingsConfigList.filter(
								(item) => item.key === "savingsInterest"
							)[0]?.value,
							minimumLockDuration: savingsConfigList.filter(
								(item) => item.key === "minimumLockDuration"
							)[0]?.value,
						}}
						refetchFunc={() => setRefetch((val) => !val)}
					/>
				</Modal>
			)}
			<section className="py-6">
				<h2 className="font-bold text-3xl mb-4">Savings Config</h2>

				<div>
					<InfoBlock
						title="Savings Config Info"
						editFunc={() => {
							setOpenConfigModal(true);
						}}
					>
						{savingsLoading ? (
							<Loading size="80px" />
						) : (
							savingsConfigList.map((item, index) => (
								<InfoRow
									label={camelCaseToTitleCase(item?.key)}
									value={`${item?.value}${
										item?.key === "minimumLockDuration" ? " days" : "%"
									}`}
									key={index}
								/>
							))
						)}
					</InfoBlock>
				</div>
			</section>
		</>
	);
};

export default SavingsConfigList;
