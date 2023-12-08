import ProtoTypes from "prop-types";
import Link from "next/link";

function ResProfilePopup({ isActive }) {
	return (
		<div
			style={{
				filter: `drop-shadow(12px 12px 40px rgba(0, 0, 0, 0.08))`,
				zIndex: 999,
			}}
			className={`profile-box absolute right-0 top-[81px]  w-[300px] overflow-hidden rounded-lg bg-white ${
				isActive ? "block" : "hidden"
			}`}
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
										<span className="text-sm font-semibold">Inbox</span>
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
										<span className="text-sm font-semibold">Log Out</span>
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
	);
}

ResProfilePopup.propTypes = {
	isActive: ProtoTypes.bool,
};

export default ResProfilePopup;
