import { request } from "../utils/axios";

export const getAllLoans = async (from, to, status, isDefaulted) => {
	try {
		const res = await request.get(
			`v1/loans/loans?${from ? `from=${from}&` : ""}${to ? `to=${to}&` : ""}${
				status ? `status=${status}&` : ""
			}${isDefaulted !== null ? `isDefaulted=${isDefaulted}` : ""}`
		);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getSingleLoan = async (_id) => {
	try {
		const res = await request.get(`v1/loans/loans?_id=${_id}`);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getUserCreditScore = async (userId) => {
	try {
		const res = await request.post(`v1/loans/credit-score/${userId}`, {});
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getUserCreditHistory = async (userId) => {
	try {
		const res = await request.post(`v1/loans/credit-details/${userId}`, {});
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getLoanTiers = async () => {
	try {
		const res = await request.get(`v1/loans/loan-tier`);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const createLoanTier = async (values) => {
	try {
		const res = await request.post(`v1/loans/loan-tier`, values);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const editLoanTier = async (values, tierId) => {
	try {
		const res = await request.put(`v1/loans/loan-tier/${tierId}`, values);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const deleteLoanTier = async (tierId) => {
	try {
		const res = await request.delete(`v1/loans/loan-tier/${tierId}`);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getLoanAnalytics = async () => {
	try {
		const res = await request.get(`v1/loans/analytics`);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};
