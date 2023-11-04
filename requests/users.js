import { request } from "../utils/axios";

export const getAllUsers = async () => {
	try {
		const res = await request.get("v1/user-management");
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getSelectedUserKYC = async (userId) => {
	try {
		const res = await request.get(`v1/user-management/${userId}`);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};
