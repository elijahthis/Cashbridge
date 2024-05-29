import ProtoTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "../../../utils/helperFuncs";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

function UserData({ userInfo, index }) {
	return (
		<tr className={index % 2 === 0 ? "bg-white dark:bg-darkblack-600" : ""}>
			<td className="whitespace-nowrap p-4 text-sm font-medium rounded-l-lg">
				<span>{index + 1}</span>
			</td>
			<td className="whitespace-nowrap py-4 text-sm text-gray-500 w-[400px] lg:w-auto">
				<div className="flex items-center gap-5">
					<div className="w-[64px] h-[64px]">
						<Image
							priority={true}
							height={64}
							width={64}
							className="w-full h-full object-cover rounded-lg"
							src={userInfo?.dp || "https://loremflickr.com/64/64"}
							alt=""
						/>
					</div>
					<div className="flex-1">
						<h4 className="font-bold text-lg text-bgray-900 dark:text-white">
							{`${userInfo?.firstname ?? "-"} ${userInfo?.lastname ?? "-"}`}
						</h4>
						<div>
							<span className="font-medium text-base text-bgray-700 dark:text-bgray-50">
								{userInfo?.email ?? "-"} •{" "}
							</span>
							<span className="text-gray-500">+{userInfo?.phone ?? "-"}•</span>{" "}
							<span className="text-gray-500">
								Created {formatDate(userInfo?.createdAt)}
							</span>
						</div>
					</div>
				</div>
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<div className="px-4">
					{userInfo?.isKYC ? (
						<FaCheck color="#22C55E" size={18} />
					) : (
						<IoClose color="#DD3333" size={18} />
					)}
				</div>

				{/* <span
					className={` text-sm ${
						userInfo?.isKYC
							? "text-[#22C55E] bg-[#D9FBE6]"
							: "text-error-300 bg-[#FEE2E2]"
					} font-medium rounded-lg py-1 px-3`}
				>
					{userInfo?.isKYC ? "KYC Verified" : "KYC Not Verified"}
				</span> */}
			</td>
			<td className="whitespace-nowrap px-2 py-4 text-sm text-gray-500">
				<span
					className={`bg-success-300 rounded-lg text-sm  text-white font-medium text-am px-3 py-1`}
				>
					Tier {userInfo?.tierLevel}
				</span>
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
				<Link
					href={`users/${userInfo?._id}`}
					className={`${
						userInfo?.isOnline
							? "bg-success-300 hover:bg-success-400"
							: "bg-darkblack-500 hover:bg-darkblack-400"
					} transition duration-300 ease-in-out ml-6 font-semibold text-white py-3 flex items-center justify-center rounded-xl px-11`}
				>
					Details
				</Link>
			</td>
			{/* <td className="whitespace-nowrap pr-3 py-4 text-sm text-gray-500 rounded-r-lg">
				<button aria-label="none" className="">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
							stroke="#94A3B8"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
							stroke="#94A3B8"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
							stroke="#94A3B8"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</td> */}
		</tr>
	);
}

UserData.propTypes = {
	userInfo: ProtoTypes.object,
	index: ProtoTypes.number,
};

export default UserData;
