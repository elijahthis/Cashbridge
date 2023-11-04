import { RiLoader5Fill } from "react-icons/ri";

const Loading = ({ size = "" }) => {
	return (
		<main
			className={`h-[${size ? size : "calc(100vh-72px)"}] lg:h-[${
				size ? size : "calc(100vh-100px)"
			}] grid place-items-center `}
		>
			<RiLoader5Fill className="animate-spin text-[#86272d] text-3xl" />
		</main>
	);
};

export default Loading;
