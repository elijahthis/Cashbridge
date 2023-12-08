"use client";
import ProtoTypes from "prop-types";
import clogoColor from "@/assets/images/logo/c-logo-color.jpg";
import logoW from "@/assets/images/logo/logo-white.svg";
import profile from "@/assets/images/avatar/profile-52x52.png";
import { useState } from "react";
import Link from "next/link";
import ResProfilePopup from "./ResProfilePopup";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa6";

function HeaderTwo({ handleSidebar }) {
	const [activePopup, handleActivePopup] = useState(false);
	return (
		<div>
			<header className="mobile-wrapper fixed z-20 block w-full md:hidden">
				<div className="flex h-[80px] w-full items-center justify-between bg-white dark:bg-darkblack-600">
					<div className="flex h-full w-full items-center space-x-5">
						<button
							aria-label="none"
							type="button"
							className="drawer-btn rotate-180 transform"
							onClick={handleSidebar}
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
										fill="#F7F7F7"
									/>
									<path
										d="M10 15L6 20.0049L10 25.0098"
										stroke="#A0AEC0"
										strokeWidth="1.2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</span>
						</button>
						<div>
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
									height={logoW.height}
									width={logoW.width}
									src={logoW.src}
									className="hidden dark:block"
									alt="logo"
								/>
							</Link>
						</div>
					</div>
					<div className="mr-2">
						<div
							onClick={() => handleActivePopup(!activePopup)}
							className="flex cursor-pointer space-x-0 lg:space-x-3"
						>
							<div className="h-[52px] w-[52px] overflow-hidden rounded-xl border border-bgray-300 grid place-items-center ">
								{/* <Image
									priority={true}
									height={profile.height}
									width={profile.width}
									className="object-cover"
									src={profile.src}
									alt="avater"
								/> */}
								<FaRegUser color="#86272d" />
							</div>
							<div className="hidden 2xl:block">
								<div className="flex items-center space-x-2.5">
									<h3 className="text-base font-bold leading-[28px] text-bgray-900">
										John Doe
									</h3>
									<span>
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M7 10L12 14L17 10"
												stroke="#28303F"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</span>
								</div>
								<p className="text-sm font-medium leading-[20px] text-bgray-600">
									Super Admin
								</p>
							</div>
						</div>

						<div className="profile-wrapper">
							<div
								onClick={() => handleActivePopup(!activePopup)}
								className="profile-outside fixed -left-[43px] top-0 hidden h-full w-full"
							></div>
							<div
								style={{
									filter: `drop-shadow(12px 12px 40px rgba(0, 0, 0, 0.08))`,
								}}
								className="profile-box absolute right-0 top-[81px] hidden w-[300px] overflow-hidden rounded-lg bg-white"
							>
								<div className="relative w-full px-3 py-2">
									<div>
										<ul>
											{/* <li className="w-full">
												<Link href="/messages">
													<div className="flex items-center space-x-[18px] rounded-lg p-[14px] text-bgray-600 hover:bg-bgray-100 hover:text-bgray-900">
														<div className="w-[20px]">
															<span>
																<svg
																	width="24"
																	height="24"
																	viewBox="0 0 24 24"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M2 12V7C2 4.79086 3.79086 3 6 3H18C20.2091 3 22 4.79086 22 7V17C22 19.2091 20.2091 21 18 21H8M6 8L9.7812 10.5208C11.1248 11.4165 12.8752 11.4165 14.2188 10.5208L18 8M2 15H8M2 18H8"
																		stroke="#2A313C"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																	/>
																</svg>
															</span>
														</div>
														<div className="flex-1">
															<span className="text-sm font-semibold">
																Inbox
															</span>
														</div>
													</div>
												</Link>
											</li> */}
											<li className="w-full">
												<Link href="#">
													<div className="flex items-center space-x-[18px] rounded-lg p-[14px] text-success-300">
														<div className="w-[20px]">
															<span>
																<svg
																	width="24"
																	height="24"
																	viewBox="0 0 24 24"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M15 10L13.7071 11.2929C13.3166 11.6834 13.3166 12.3166 13.7071 12.7071L15 14M14 12L22 12M6 20C3.79086 20 2 18.2091 2 16V8C2 5.79086 3.79086 4 6 4M6 20C8.20914 20 10 18.2091 10 16V8C10 5.79086 8.20914 4 6 4M6 20H14C16.2091 20 18 18.2091 18 16M6 4H14C16.2091 4 18 5.79086 18 8"
																		stroke="#86272D"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																	/>
																</svg>
															</span>
														</div>
														<div className="flex-1">
															<span className="text-sm font-semibold">
																Log Out
															</span>
														</div>
													</div>
												</Link>
											</li>
										</ul>
									</div>
									<div className="my-[14px] h-[1px] w-full bg-bgray-300"></div>
									<div>
										<ul>
											<li className="w-full">
												<Link href="/users">
													<div className="rounded-lg p-[14px] text-bgray-600 hover:bg-bgray-100 hover:text-bgray-900">
														<span className="text-sm font-semibold">Users</span>
													</div>
												</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<ResProfilePopup isActive={activePopup} />
		</div>
	);
}

HeaderTwo.propTypes = {
	handleSidebar: ProtoTypes.func,
};

export default HeaderTwo;
