export const getAllSavings = async (page, limit, status, type) => {
	try {
		const res = await request.get(
			`v1/transactions/savings?page=${page}&limit=${limit}&${
				status ? `status=${status}` : ""
			}&${type ? `type=${type}` : ""}`
		);
		console.log(res);
		return res;
	} catch (err) {
		// toast.error(err?.response?.data?.error);
		console.log(err?.response?.data);
		throw err;
	}
};
