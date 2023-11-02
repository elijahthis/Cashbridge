import { request } from "../utils/axios";
import { AuthRequest } from "../utils/axios";
import { setAuthToken } from "../config/helpers";
import { toast } from "react-toastify";

export const registerUser = async (values) => {
	try {
		const res = await AuthRequest.post("v1/auth/register", values);
		console.log(res);
		setAuthToken(res?.data?.token);
		return res;
	} catch (err) {
		toast.error(err?.response?.data?.error);
		throw err;
	}
};

export const userLogin = async (values) => {
	try {
		const res = await AuthRequest.post("v1/auth/login", values);
		console.log(res);
		setAuthToken(res?.data?.token);
		return res;
	} catch (err) {
		toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const sendOtp = async (values) => {
	try {
		const res = await AuthRequest.post("api/accounts/validate_email", values);
		console.log(res);
		return res;
	} catch (err) {
		toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const confirmOtp = async (values) => {
	try {
		const res = await AuthRequest.post("v1/auth/verify-login", values);
		console.log(res);
		return res;
	} catch (err) {
		toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};

export const getMe = async () => {
	try {
		const res = await request.get("v1/auth/me");
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};
