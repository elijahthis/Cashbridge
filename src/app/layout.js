"use client";
import "./globals.scss";
import "@/assets/css/style.css";
import "@/assets/css/font-awesome-all.min.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { createContext } from "react";

//react-toastify...for notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";

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
				<body>
					{children}
					<ToastContainer
						position="bottom-center"
						// autoClose={false}
						autoClose={5000}
						hideProgressBar={true}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover={true}
						transition={Zoom}
					/>
				</body>
			</html>
		</ThemeContext.Provider>
	);
}
