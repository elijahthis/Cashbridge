"use client";
// import styles from "./styles.module.scss";
import { BiLoaderAlt } from "react-icons/bi";

const Button = ({
	variant = "primary",
	children,
	onClick = () => {},
	disabled = false,
	loading = false,
	...rest
}) => {
	return (
		<button
			className={`py-3.5 px-4 flex items-center justify-center text-white font-bold  transition-all rounded-lg w-full ${
				disabled
					? "bg-[#e5e5e5] cursor-not-allowed "
					: "bg-success-300 hover:bg-success-400 cursor-pointer"
			} `}
			onClick={(e) => {
				if (disabled) e.preventDefault();
				else if (!loading) onClick && onClick();
			}}
			{...rest}
			disabled={disabled}
		>
			{loading ? <BiLoaderAlt className="btn-loader" /> : children}
		</button>
	);
};

export default Button;
