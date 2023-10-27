"use client";
import "./globals.css";
import "@/assets/css/style.css";
import "@/assets/css/font-awesome-all.min.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext(null);

export default function RootLayout({ children }) {
	const [theme, setTheme] = useState();
	useEffect(() => {
		setTheme(
			localStorage.getItem("cashbridge_theme") === "" ||
				localStorage.getItem("cashbridge_theme")
				? localStorage.getItem("cashbridge_theme")
				: ""
		);
	}, []);
	useEffect(() => {
		if (
			localStorage.getItem("cashbridge_theme") !== "" &&
			localStorage.getItem("cashbridge_theme") !== "dark"
		) {
			localStorage.setItem("cashbridge_theme", "");
		}
		document.querySelector("html").classList =
			localStorage.getItem("cashbridge_theme");
	}, []);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			<html lang="en">
				<body>{children}</body>
			</html>
		</ThemeContext.Provider>
	);
}
