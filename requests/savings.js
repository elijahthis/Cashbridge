import { request } from "../utils/axios";
import { formatDatetoYyyyMmDd, generateURLParams } from "../utils/helperFuncs";

export const getAllSavings = async (page, limit, status, type, from, to) => {
	try {
		// const res = await request.get(
		// 	`v1/savings?page=${page}&limit=${limit}&${
		// 		status ? `status=${status}` : ""
		// 	}&${type ? `type=${type}` : ""}`
		// );
		const res = await request.get(
			`v1/savings?${generateURLParams({
				page,
				limit,
				status,
				type,
				from: from ? formatDatetoYyyyMmDd(from) : from,
				to: to ? formatDatetoYyyyMmDd(to) : to,
			})}`
		);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getSelectedSavings = async (savingsId) => {
	try {
		const res = await request.get(`v1/savings?id=${savingsId}`);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getUserSavings = async (userId, page, limit, status, type) => {
	try {
		const res = await request.get(
			`v1/savings/${userId}?page=${page}&limit=${limit}&${
				status ? `status=${status}` : ""
			}&${type ? `type=${type}` : ""}`
		);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getAllSavingsConfig = async () => {
	try {
		const res = await request.get(`v1/savings/config`);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const updateSavingsConfig = async (values) => {
	try {
		const res = await request.post(`v1/savings/config`, values);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getSavingsAnalytics = async () => {
	try {
		const res = await request.get(`v1/savings/analytics`);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};
