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

export const suspendUser = async (userId) => {
	try {
		const res = await request.post(`v1/user-management/${userId}/suspend`, {});
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const unSuspendUser = async (userId) => {
	try {
		const res = await request.post(
			`v1/user-management/${userId}/unsuspend`,
			{}
		);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const verifyKYC = async (userId, values) => {
	try {
		const res = await request.post(`v1/user-management/${userId}/kyc`, values);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const updatePIN = async (userId) => {
	try {
		const res = await request.put(`v1/user-management/${userId}/pin`);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const updateUserData = async (userId, values) => {
	try {
		const res = await request.put(`v1/user-management/${userId}`, values);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const updateUserEmployment = async (userId, values) => {
	try {
		const res = await request.put(
			`v1/user-management/${userId}/employment`,
			values
		);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};
