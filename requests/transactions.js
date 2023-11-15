import { request } from "../utils/axios";

export const getUserWalletTransactions = async (userId, page) => {
	try {
		const res = await request.get(
			`v1/transactions/wallet/${userId}?page=${page}`
		);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getUserWalletBalance = async (userId) => {
	try {
		const res = await request.get(`v1/transactions/balance/${userId}`);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getCompanyWalletBalance = async () => {
	try {
		const res = await request.get(`v1/transactions/balance`);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getCompanyExternalTransactions = async (page, status) => {
	try {
		const res = await request.get(
			`v1/transactions/external?page=${page}&${
				status ? `status=${status}` : ""
			}`
		);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getCompanyWalletTransactions = async (page, type) => {
	try {
		const res = await request.get(
			`v1/transactions/wallet?page=${page}&${type ? `type=${type}` : ""}`
		);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getAllSavingTransactions = async () => {
	try {
		const res = await request.get(`v1/transactions/savings`);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};
