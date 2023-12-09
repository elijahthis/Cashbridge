import { request } from "../utils/axios";

export const getAllSavings = async (page, limit, status, type) => {
	try {
		const res = await request.get(
			`v1/savings?page=${page}&limit=${limit}&${
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
