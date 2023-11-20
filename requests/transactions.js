import { request } from "../utils/axios";

export const getUserWalletTransactions = async (userId, page, type) => {
	try {
		const res = await request.get(
			`v1/transactions/wallet/${userId}?page=${page}&${
				type ? `type=${type}` : ""
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

export const getCompanyExternalTransactions = async (page, tx_ref) => {
	try {
		const res = await request.get(
			`v1/transactions/external?page=${page}&${
				tx_ref ? `tx_ref=${tx_ref}` : ""
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

export const getAllSavingTransactions = async (trnx_id) => {
	try {
		const res = await request.get(
			`v1/transactions/savings${trnx_id ? `?trnx_id=${trnx_id}` : ""}`
		);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};
