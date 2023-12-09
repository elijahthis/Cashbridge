import { request } from "../utils/axios";

export const getAllBilling = async () => {
	try {
		const res = await request.get(
			`v1/billings/summary?from=2023-01-01&to=2023-12-12`
		);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};
