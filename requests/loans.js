import { request } from "../utils/axios";

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
