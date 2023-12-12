import { request } from "../utils/axios";
import { formatDatetoYyyyMmDd } from "../utils/helperFuncs";

export const getAllBilling = async () => {
	try {
		const res = await request.get(
			`v1/billings/summary?from=2023-01-01&to=${formatDatetoYyyyMmDd(
				new Date()
			)}`
		);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getBillingStatus = async (reference) => {
	try {
		const res = await request.get(`v1/billings/status/${reference}`);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};
