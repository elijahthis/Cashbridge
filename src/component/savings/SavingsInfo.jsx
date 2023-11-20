"use client";
import { useEffect, useState } from "react";
import { getAllSavings } from "../../../requests/savings";

const SelectedSavingsInfo = () => {
	const fetchSavingsData = async () => {
		setSavingsLoading(true);
		try {
			const res2 = await getAllSavings(currPage, itemsPerPage);
			console.log("res2", res2);
			if (res2.data?.success) {
				setSavingsList(res2.data?.data?.data);
				setTotalSavingsPages(res2.data?.data?.total_pages);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSavingsLoading(false);
		}
	};

	useEffect(() => {
		fetchSavingsData();
	}, [currPage, itemsPerPage]);

	return <div></div>;
};

export default SelectedSavingsInfo;
