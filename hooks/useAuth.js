import { createContext, useContext, useState } from "react";
import { userLogin } from "../requests/auth";

export const authContext = createContext({
	isLoggedIn: false,
	setIsLoggedIn: (val) => {},
	userObj: {},
	setUserObj: (val) => {},
});
