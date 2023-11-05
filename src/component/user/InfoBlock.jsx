import { FiEdit2 } from "react-icons/fi";

const InfoBlock = ({ title, children, editFunc = () => {} }) => {
	return (
		<div className="mb-5">
			<div className="flex flex-row items-center justify-between">
				<h3 className="font-bold">{title}</h3>
				<button
					className=" text-sm py-2 pl-4 flex flex-row items-center gap-1 text-success-300 font-semibold"
					onClick={editFunc}
				>
					Edit
					<FiEdit2 />
				</button>
			</div>

			<ul className="py-7 border-t border-gray-200 dark:border-darkblack-400 space-y-6">
				{children}
			</ul>
		</div>
	);
};

export default InfoBlock;
