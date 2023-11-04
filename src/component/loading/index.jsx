import { RiLoader5Fill } from "react-icons/ri";

const Loading = ({ size = "" }) => {
	return (
		<main
			className={` grid place-items-center `}
			style={{ height: size ? size : "800px" }}
		>
			<RiLoader5Fill className="animate-spin text-[#86272d] text-3xl" />
		</main>
	);
};

export default Loading;
