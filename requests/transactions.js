import { request } from "../utils/axios";
import { formatDatetoYyyyMmDd, generateURLParams } from "../utils/helperFuncs";

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

export const getAllSavingTransactions = async (
	trnx_id,
	page,
	limit,
	type,
	source,
	from,
	to
) => {
	try {
		const res = await request.get(
			`v1/transactions/savings?${generateURLParams({
				trnx_id,
				page,
				limit,
				type,
				source,
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

export const createRefund = async (values) => {
	try {
		const res = await request.post(`v1/transactions/refunds`, values);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getAllRefunds = async (values) => {
	try {
		const res = await request.get(`v1/transactions/refunds`, values);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};
