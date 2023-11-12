import { request } from "../utils/axios";

export const getUserWalletTransactions = async (userId) => {
	try {
		const res = await request.get(`v1/transactions/wallet/${userId}`);
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
