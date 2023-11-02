export const getToken = () => {
	return localStorage.getItem("CSH_BRDGE");
};

export const setAuthToken = (token) => {
	localStorage.setItem("CSH_BRDGE", token);
};
