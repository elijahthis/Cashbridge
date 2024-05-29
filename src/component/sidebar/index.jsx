"use client";
import ProtoTypes from "prop-types";
import bg from "@/assets/images/bg/upgrade-bg.png";
import clogoColor from "@/assets/images/logo/c-logo-color.jpg";
import logoW from "@/assets/images/logo/logo-white.svg";
import profileImg from "@/assets/images/avatar/profile-xs.png";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { sidebarList } from "@/data/constants";
import { usePathname, useRouter } from "next/navigation";

function Sidebar({ handleActive }) {
	const [activeDashboard, setActiveDashboard] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	return (
		<aside className="sidebar-wrapper fixed top-0 z-30 block h-full w-[308px] bg-white dark:bg-darkblack-600 sm:hidden xl:block">
			<div className="sidebar-header relative z-30 flex h-[108px] w-full items-center border-b border-r border-b-[#F7F7F7] border-r-[#F7F7F7] pl-[50px] dark:border-darkblack-400">
				<Link href="/">
					<Image
						priority={true}
						height={82}
						width={120}
						src={clogoColor}
						className="block dark:hidden"
						alt="logo"
					/>
					<Image
						priority={true}
						height={52}
						width={172}
						src={clogoColor.src}
						className="hidden dark:block"
						alt="logo"
					/>
				</Link>
				<button
					aria-label="none"
					type="button"
					onClick={handleActive}
					className="drawer-btn absolute right-0 top-auto"
					title="Ctrl+b"
				>
					<span>
						<svg
							width="16"
							height="40"
							viewBox="0 0 16 40"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M0 10C0 4.47715 4.47715 0 10 0H16V40H10C4.47715 40 0 35.5228 0 30V10Z"
								fill="#86272D"
							/>
							<path
								d="M10 15L6 20.0049L10 25.0098"
								stroke="#ffffff"
								strokeWidth="1.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</span>
				</button>
			</div>
			<div className="sidebar-body overflow-style-none relative z-30 h-screen w-full overflow-y-scroll pb-[200px] pl-[48px] pt-[14px]">
				<div className="nav-wrapper mb-[36px] pr-[50px]">
					<div className="item-wrapper mb-5">
						<h4 className="border-b border-bgray-200 text-sm font-medium leading-7 text-bgray-700 dark:border-darkblack-400 dark:text-bgray-50">
							Menu
						</h4>
						<ul className="mt-2.5">
							{sidebarList.map((item, index) => (
								<li
									className="item py-[11px] dark:text-white relative"
									key={index}
								>
									<Link href={item.link}>
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-2.5">
												<span className="item-ico">{item.icon}</span>
												<span
													className={`item-text text-lg leading-none ${
														(pathname.startsWith(item.link) &&
															item.link !== "/") ||
														(pathname === "/" && item.link === "/")
															? "font-bold text-success-300 "
															: "font-medium text-bgray-700"
													}`}
												>
													{item.title}
												</span>
											</div>
										</div>
									</Link>
									{(pathname.startsWith(item.link) && item.link !== "/") ||
									(pathname === "/" && item.link === "/") ? (
										<div
											className="absolute w-6 h-6 rounded-full bg-success-300 top-[50%] left-[-62px] "
											style={{ transform: "translateY(-50%)" }}
										></div>
									) : (
										<></>
									)}
								</li>
							))}
						</ul>
					</div>
					{/* <div className="item-wrapper mb-5">
						<h4 className="border-b border-bgray-200 text-sm font-medium leading-7 text-bgray-700 dark:border-darkblack-400 dark:text-bgray-50">
							Others
						</h4>
						<ul className="mt-2.5">
							<li className="item py-[11px] text-bgray-900 dark:text-white">
								<Link href="/signin">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-2.5">
											<span className="item-ico">
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<ellipse
														cx="11.7778"
														cy="17.5555"
														rx="7.77778"
														ry="4.44444"
														fill="#A3A3A3"
														className="path-1"
													/>
													<circle
														cx="11.7778"
														cy="6.44444"
														r="4.44444"
														fill="#86272D"
														className="path-2"
													/>
												</svg>
											</span>
											<span className="item-text text-lg font-medium leading-none">
												Signin
											</span>
										</div>
									</div>
								</Link>
							</li>
							<li className="item py-[11px] text-bgray-900 dark:text-white">
								<Link href="/signup">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-2.5">
											<span className="item-ico">
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<ellipse
														cx="11.7778"
														cy="17.5555"
														rx="7.77778"
														ry="4.44444"
														fill="#A3A3A3"
														className="path-1"
													/>
													<circle
														cx="11.7778"
														cy="6.44444"
														r="4.44444"
														fill="#86272D"
														className="path-2"
													/>
												</svg>
											</span>
											<span className="item-text text-lg font-medium leading-none">
												Signup
											</span>
										</div>
									</div>
								</Link>
							</li>
							<li className="item py-[11px] text-bgray-900 dark:text-white">
								<Link href="/coming-soon">
									<div className="flex items-center space-x-2.5">
										<span className="item-ico">
											<svg
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M18.4 17.2C19.8833 19.1777 18.4721 22 16 22L8 22C5.52786 22 4.11672 19.1777 5.6 17.2L8.15 13.8C8.95 12.7333 8.95 11.2667 8.15 10.2L5.6 6.8C4.11672 4.82229 5.52787 2 8 2L16 2C18.4721 2 19.8833 4.82229 18.4 6.8L15.85 10.2C15.05 11.2667 15.05 12.7333 15.85 13.8L18.4 17.2Z"
													fill="#A3A3A3"
													className="path-1"
												/>
												<path
													d="M12.7809 9.02391C12.3805 9.52432 11.6195 9.52432 11.2191 9.02391L9.29976 6.6247C8.77595 5.96993 9.24212 5 10.0806 5L13.9194 5C14.7579 5 15.2241 5.96993 14.7002 6.6247L12.7809 9.02391Z"
													fill="#86272D"
													className="path-2"
												/>
											</svg>
										</span>
										<span className="item-text text-lg font-medium leading-none">
											Coming Soon
										</span>
									</div>
								</Link>
							</li>
							<li className="item py-[11px] text-bgray-900 dark:text-white">
								<Link href="/404">
									<div className="flex items-center space-x-2.5">
										<span className="item-ico">
											<svg
												width="20"
												height="20"
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<circle
													cx="10"
													cy="10"
													r="10"
													fill="#A3A3A3"
													className="path-1"
												/>
												<path
													d="M9 15C9 14.4477 9.44772 14 10 14C10.5523 14 11 14.4477 11 15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15Z"
													fill="#86272D"
													className="path-2"
												/>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M10 12.75C9.58579 12.75 9.25 12.4142 9.25 12L9.25 5C9.25 4.58579 9.58579 4.25 10 4.25C10.4142 4.25 10.75 4.58579 10.75 5L10.75 12C10.75 12.4142 10.4142 12.75 10 12.75Z"
													fill="#86272D"
													className="path-2"
												/>
											</svg>
										</span>
										<span className="item-text text-lg font-medium leading-none">
											404
										</span>
									</div>
								</Link>
							</li>
							<li className="item py-[11px] text-bgray-900 dark:text-white">
								<div
									className="flex items-center justify-between cursor-pointer"
									onClick={() => {
										localStorage.removeItem("CSH_BRDGE");
										router.push("/signin");
									}}
								>
									<div className="flex items-center space-x-2.5">
										<span className="item-ico">
											<svg
												width="21"
												height="18"
												viewBox="0 0 21 18"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M17.1464 10.4394C16.8536 10.7323 16.8536 11.2072 17.1464 11.5001C17.4393 11.7929 17.9142 11.7929 18.2071 11.5001L19.5 10.2072C20.1834 9.52375 20.1834 8.41571 19.5 7.73229L18.2071 6.4394C17.9142 6.1465 17.4393 6.1465 17.1464 6.4394C16.8536 6.73229 16.8536 7.20716 17.1464 7.50006L17.8661 8.21973H11.75C11.3358 8.21973 11 8.55551 11 8.96973C11 9.38394 11.3358 9.71973 11.75 9.71973H17.8661L17.1464 10.4394Z"
													fill="#86272D"
													className="path-2"
												/>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M4.75 17.75H12C14.6234 17.75 16.75 15.6234 16.75 13C16.75 12.5858 16.4142 12.25 16 12.25C15.5858 12.25 15.25 12.5858 15.25 13C15.25 14.7949 13.7949 16.25 12 16.25H8.21412C7.34758 17.1733 6.11614 17.75 4.75 17.75ZM8.21412 1.75H12C13.7949 1.75 15.25 3.20507 15.25 5C15.25 5.41421 15.5858 5.75 16 5.75C16.4142 5.75 16.75 5.41421 16.75 5C16.75 2.37665 14.6234 0.25 12 0.25H4.75C6.11614 0.25 7.34758 0.82673 8.21412 1.75Z"
													fill="#A3A3A3"
													className="path-1"
												/>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M0 5C0 2.37665 2.12665 0.25 4.75 0.25C7.37335 0.25 9.5 2.37665 9.5 5V13C9.5 15.6234 7.37335 17.75 4.75 17.75C2.12665 17.75 0 15.6234 0 13V5Z"
													fill="#A3A3A3"
													className="path-1"
												/>
											</svg>
										</span>
										<span className="item-text text-lg font-medium leading-none">
											Logout
										</span>
									</div>
								</div>
							</li>
						</ul>
					</div> */}
				</div>
			</div>
		</aside>
	);
}

Sidebar.propTypes = {
	handleActive: ProtoTypes.func,
};

export default Sidebar;
