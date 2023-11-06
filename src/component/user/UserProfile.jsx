"use client";
import user from "@/assets/images/avatar/user-1.png";
import groupImg1 from "@/assets/images/avatar/group-img-1.png";
import groupImg2 from "@/assets/images/avatar/group-img-2.png";
import groupImg3 from "@/assets/images/avatar/group-img.png";
import hr from "@/assets/images/avatar/hr.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
	getSelectedUserKYC,
	suspendUser,
	unSuspendUser,
	verifyKYC,
	updatePIN,
} from "../../../requests/users";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import {
	convertWeirdDate,
	formatDate,
	prettifyMoney,
} from "../../../utils/helperFuncs";
import InfoRow from "./InfoRow";
import InfoBlock from "./InfoBlock";
import { bankList } from "@/data/bankList";
import Button from "../button";
import { toast } from "react-toastify";
import Modal from "../modal";
import { EditUserEmploymentModal } from "../modal/EditUserEmploymentModal";
import EditPersonalInfoModal from "../modal/EditPersonalInfoModal";

function UserProfile({ params }) {
	const [userData, setUserData] = useState({});
	const [loading, setLoading] = useState(false);
	const [refetch, setRefetch] = useState(false);
	const [suspendLoading, setSuspendLoading] = useState(false);
	const [verifyKYCLoading, setVerifyKYCLoading] = useState(false);
	const [updatePINLoading, setUpdatePINLoading] = useState(false);
	const [fetched, setFetched] = useState(false);
	const [openEmploymentModal, setOpenEmploymentModal] = useState(false);
	const [openPersonalModal, setOpenPersonalModal] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await getSelectedUserKYC(params.id);
			if (res.data?.success) {
				setUserData(res.data?.data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
			setFetched(true);
		}
	};

	const suspendFunc = async () => {
		setSuspendLoading(true);
		try {
			const res = await suspendUser(params?.id);
			if (res?.data?.success) {
				toast.success("User Suspended Successfully");
				setRefetch((val) => !val);
			}
		} catch (error) {
			console.log(error);
			toast.error("Unable to suspend user");
		} finally {
			setSuspendLoading(false);
		}
	};

	const unSuspendFunc = async () => {
		setSuspendLoading(true);
		try {
			const res = await unSuspendUser(params?.id);
			if (res?.data?.success) {
				toast.success("User un-suspended Successfully");
				setRefetch((val) => !val);
			}
		} catch (error) {
			console.log(error);
			toast.error("Unable to suspend user");
		} finally {
			setSuspendLoading(false);
		}
	};

	const verifyKYCFunc = async () => {
		setVerifyKYCLoading(true);
		try {
			const res = await verifyKYC(params?.id, { bvn: "" });
			if (res?.data?.success) {
				toast.success("Customer KYC Verified");
				setRefetch((val) => !val);
			}
		} catch (error) {
			console.log(error);
			toast.error("Unable to verify KYC");
		} finally {
			setVerifyKYCLoading(false);
		}
	};

	const updatePINFunc = async () => {
		setUpdatePINLoading(true);
		try {
			const res = await updatePIN(params?.id);
			if (res?.data?.success) {
				toast.success("Customer PIN Updated");
				// setRefetch((val) => !val);
			}
		} catch (error) {
			console.log(error);
			toast.error("Unable to update PIN");
		} finally {
			setUpdatePINLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [refetch]);

	console.log("userData", userData);

	return fetched ? (
		loading ? (
			<Loading />
		) : (
			<>
				<Modal isActive={openPersonalModal} setIsActive={setOpenPersonalModal}>
					<EditPersonalInfoModal
						isActive={openPersonalModal}
						setIsActive={setOpenPersonalModal}
						personalData={userData ?? {}}
					/>
				</Modal>
				<Modal
					isActive={openEmploymentModal}
					setIsActive={setOpenEmploymentModal}
				>
					<EditUserEmploymentModal
						isActive={openEmploymentModal}
						setIsActive={setOpenEmploymentModal}
						employmentData={userData?.employmentDetail[0] ?? {}}
					/>
				</Modal>

				<div className="2xl:w-[382px] w-full bg-white dark:bg-darkblack-600 rounded-lg px-12 pb-7">
					<header className="flex flex-col items-center text-center -mt-8 pb-7">
						<Image
							priority={true}
							height={64}
							width={64}
							src={userData?.dp}
							className="rounded-lg"
							alt=""
						/>
						<h3 className="text-xl font-bold text-bgray-700 dark:text-white mt-4">
							{`${userData?.firstname ?? "-"} ${userData?.lastname ?? "-"}`}
						</h3>
						<p className="text-base font-medium text-bgray-500 dark:text-white">
							{userData?.email} • +{userData?.phone} • Created{" "}
							{userData?.createdAt ? formatDate(userData?.createdAt) : "-"}
						</p>
						<div className="mt-4 flex flex-row items-center gap-2 ">
							<span
								className={` text-sm ${
									userData?.isKYC
										? "text-[#22C55E] bg-[#D9FBE6]"
										: "text-error-300 bg-[#FEE2E2]"
								} font-medium rounded-lg py-1 px-3`}
							>
								{userData?.isKYC ? "KYC Verified" : "KYC Not Verified"}
							</span>
							<span
								className={` text-sm ${
									userData?.bvnVerificationStatus
										? "text-[#22C55E] bg-[#D9FBE6]"
										: "text-error-300 bg-[#FEE2E2]"
								} font-medium rounded-lg py-1 px-3`}
							>
								{userData?.bvnVerificationStatus
									? "BVN Verified"
									: "BVN Not Verified"}
							</span>
						</div>
						{/* <div className="mt-4 flex -space-x-2 overflow-hidden">
					<Image
						priority={true}
						height={groupImg1.height}
						width={groupImg1.width}
						className="inline-block h-8 w-8 rounded-full ring ring-white"
						src={groupImg1.src}
						alt=""
					/>
					<Image
						priority={true}
						height={groupImg2.height}
						width={groupImg2.width}
						className="inline-block h-8 w-8 rounded-full ring ring-white"
						src={groupImg2.src}
						alt=""
					/>
					<Image
						priority={true}
						height={groupImg3.height}
						width={groupImg3.width}
						className="inline-block h-8 w-8 rounded-full ring ring-white"
						src={groupImg3.src}
						alt=""
					/>
					<div className="inline-flex justify-center h-8 w-8 rounded-full items-center text-gray-500 text-xs font-semibold bg-white">
						+5
					</div>
				</div> */}
						<div className="flex flex-col items-center gap-4 mt-6 ">
							<p className="text-warning-300">
								{userData?.isSuspended
									? "This user account has been suspended"
									: ""}
							</p>
							<Button
								// disabled={true}
								style={{
									backgroundColor: userData?.isSuspended
										? "#86272D"
										: "#dc2626",
								}}
								loading={suspendLoading}
								onClick={() => {
									if (userData?.isSuspended) {
										unSuspendFunc();
									} else {
										suspendFunc();
									}
								}}
							>
								{userData?.isSuspended ? "Un-suspend" : "Suspend"} User
							</Button>
						</div>
					</header>
					<InfoBlock
						title="Personal Info"
						editFunc={() => setOpenPersonalModal(true)}
					>
						<InfoRow
							label="Name"
							value={`${userData?.firstname} ${userData?.lastname}`}
						/>
						<InfoRow label="Phone Number" value={userData?.phone} />
						<InfoRow label="Email Address" value={userData?.email} />
						<InfoRow
							label="Date of Birth (DOB)"
							value={
								userData?.dob
									? formatDate(convertWeirdDate(userData?.dob))
									: "-"
							}
						/>
					</InfoBlock>
					<InfoBlock title="Residential Address">
						<InfoRow
							label="Address"
							value={[
								userData?.residentialAddress[0]?.address,
								userData?.residentialAddress[0]?.city,
								userData?.residentialAddress[0]?.state,
							].join(", ")}
						/>
						<InfoRow
							label="Landmark"
							value={userData?.residentialAddress[0]?.landmark ?? "-"}
						/>
						<InfoRow
							label="Status"
							value={userData?.residentialAddress[0]?.status ?? "-"}
						/>
					</InfoBlock>
					<InfoBlock title="Bank Information">
						<InfoRow
							label="Account Number"
							value={userData?.customerBank[0]?.accountNumber}
						/>
						<InfoRow
							label="Bank Name"
							value={
								bankList.filter(
									(item) => item.code === userData?.customerBank[0]?.bankCode
								)[0]?.name ?? "-"
							}
						/>
						<InfoRow
							label="Phone Number"
							value={userData?.customerBank[0]?.phone}
						/>
						<InfoRow label="BVN" value={userData?.bvn} />
						<InfoRow
							label="CBS Account Reference"
							value={userData?.cbsAccountReference}
						/>
					</InfoBlock>
					<InfoBlock
						title="Employment Information"
						editFunc={() => setOpenEmploymentModal(true)}
					>
						<InfoRow
							label="Employment Status"
							value={userData?.employmentDetail[0]?.status}
						/>
						<InfoRow
							label="Company"
							value={userData?.employmentDetail[0]?.company}
						/>
						<InfoRow
							label="Sector"
							value={userData?.employmentDetail[0]?.sector}
						/>
						<InfoRow
							label="Employment Address"
							value={[
								userData?.employmentDetail[0]?.address,
								userData?.employmentDetail[0]?.city,
								userData?.employmentDetail[0]?.state,
							].join(", ")}
						/>
						<InfoRow
							label="Monthly Income"
							value={`NGN ${prettifyMoney(
								Number(userData?.employmentDetail[0]?.month_income)
							)}`}
						/>
						<InfoRow
							label="Date Started"
							value={
								userData?.employmentDetail[0]?.dateStarted
									? formatDate(
											convertWeirdDate(
												userData?.employmentDetail[0]?.dateStarted
											)
									  )
									: "-"
							}
						/>
					</InfoBlock>
					<div className="mb-6"></div>
					<InfoBlock title="Next of Kin">
						<InfoRow
							label="Name"
							value={`${userData?.nok[0]?.firstName} ${userData?.nok[0]?.lastName}`}
						/>
						<InfoRow label="Phone Number" value={userData?.nok[0]?.phone} />
						<InfoRow label="Address" value={userData?.nok[0]?.address} />
						<InfoRow
							label="Relationship"
							value={userData?.nok[0]?.relationship}
						/>
					</InfoBlock>

					<div className="py-6 border-b border-bgray-200 dark:border-darkblack-400">
						<h2 className="font-bold text-3xl">Actions</h2>
						<div className="grid grid-cols-3 gap-4 py-3">
							<Button>Verify KYC</Button>
							<Button
								onClick={() => {
									updatePINFunc();
								}}
								loading={updatePINLoading}
							>
								Update User PIN
							</Button>
							<Button
								// disabled={true}
								style={{
									backgroundColor: userData?.isSuspended
										? "#86272D"
										: "#dc2626",
								}}
								loading={suspendLoading}
								onClick={() => {
									if (userData?.isSuspended) {
										unSuspendFunc();
									} else {
										suspendFunc();
									}
								}}
							>
								{userData?.isSuspended ? "Un-suspend" : "Suspend"} User
							</Button>
						</div>
					</div>

					{/* <div className="py-6 border-b border-bgray-200 dark:border-darkblack-400">
					<h4 className="font-medium text-gray-500 text-sm dark:text-white mb-3">
						Files
					</h4>
					<ul className="space-y-2.5">
						<li className="bg-[#E4FDED] dark:bg-darkblack-500 py-3 px-2 pr-4 flex justify-between items-center rounded-lg">
							<div className="flex items-center gap-x-3">
								<span className="bg-white dark:bg-darkblack-600 w-10 h-10 rounded-lg inline-flex justify-center items-center">
									<svg
										width="22"
										height="22"
										viewBox="0 0 22 22"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M12.8334 2.74951V6.41618C12.8334 6.65929 12.93 6.89245 13.1019 7.06436C13.2738 7.23627 13.5069 7.33285 13.75 7.33285H17.4167"
											stroke="#86272D"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M15.5834 19.2495H6.41671C5.93048 19.2495 5.46416 19.0564 5.12034 18.7125C4.77653 18.3687 4.58337 17.9024 4.58337 17.4162V4.58285C4.58337 4.09661 4.77653 3.6303 5.12034 3.28648C5.46416 2.94267 5.93048 2.74951 6.41671 2.74951H12.8334L17.4167 7.33285V17.4162C17.4167 17.9024 17.2236 18.3687 16.8797 18.7125C16.5359 19.0564 16.0696 19.2495 15.5834 19.2495Z"
											stroke="#86272D"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M8.25 8.24951H9.16667"
											stroke="#86272D"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M8.25 11.916H13.75"
											stroke="#86272D"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M8.25 15.583H13.75"
											stroke="#86272D"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</span>
								<div className="flex flex-col">
									<h5 className="font-semibold text-bgray-900 dark:text-white text-sm">
										Overview.pdf
									</h5>
									<span className="text-xs text-bgray-500">50 Kb</span>
								</div>
							</div>
							<button aria-label="none">
								<svg
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										className="stroke-bgray-900 dark:stroke-bgray-50"
										d="M17.5 12.4995V15.8328C17.5 16.2749 17.3244 16.6988 17.0118 17.0114C16.6993 17.3239 16.2754 17.4995 15.8333 17.4995H4.16667C3.72464 17.4995 3.30072 17.3239 2.98816 17.0114C2.67559 16.6988 2.5 16.2749 2.5 15.8328V12.4995"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M5.83337 8.33301L10 12.4997L14.1667 8.33301"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M10 12.4995V2.49951"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</li>
						<li className="bg-[#E4FDED] dark:bg-darkblack-500 py-3 px-2 pr-4 flex justify-between items-center rounded-lg">
							<div className="flex items-center gap-x-3">
								<span className="bg-white dark:bg-darkblack-600 w-10 h-10 rounded-lg inline-flex justify-center items-center">
									<svg
										width="22"
										height="22"
										viewBox="0 0 22 22"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M12.8334 2.74951V6.41618C12.8334 6.65929 12.93 6.89245 13.1019 7.06436C13.2738 7.23627 13.5069 7.33285 13.75 7.33285H17.4167"
											stroke="#86272D"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M15.5834 19.2495H6.41671C5.93048 19.2495 5.46416 19.0564 5.12034 18.7125C4.77653 18.3687 4.58337 17.9024 4.58337 17.4162V4.58285C4.58337 4.09661 4.77653 3.6303 5.12034 3.28648C5.46416 2.94267 5.93048 2.74951 6.41671 2.74951H12.8334L17.4167 7.33285V17.4162C17.4167 17.9024 17.2236 18.3687 16.8797 18.7125C16.5359 19.0564 16.0696 19.2495 15.5834 19.2495Z"
											stroke="#86272D"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M8.25 8.24951H9.16667"
											stroke="#86272D"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M8.25 11.916H13.75"
											stroke="#86272D"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M8.25 15.583H13.75"
											stroke="#86272D"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</span>
								<div className="flex flex-col">
									<h5 className="font-semibold text-bgray-900 dark:text-white  text-sm">
										Overview.pdf
									</h5>
									<span className="text-xs text-bgray-500">50 Kb</span>
								</div>
							</div>
							<button aria-label="none">
								<svg
									className="stroke-bgray-900 dark:stroke-bgray-50"
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M17.5 12.4995V15.8328C17.5 16.2749 17.3244 16.6988 17.0118 17.0114C16.6993 17.3239 16.2754 17.4995 15.8333 17.4995H4.16667C3.72464 17.4995 3.30072 17.3239 2.98816 17.0114C2.67559 16.6988 2.5 16.2749 2.5 15.8328V12.4995"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M5.83337 8.33301L10 12.4997L14.1667 8.33301"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M10 12.4995V2.49951"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</li>
					</ul>
				</div>
				<div className="pt-6">
					<h4 className="font-medium text-gray-500 text-sm dark:text-white mb-4">
						Hiring Agent
					</h4>
					<div className="flex gap-x-4">
						<div>
							<Image
								priority={true}
								height={hr.height}
								width={hr.width}
								src={hr.src}
								alt=""
							/>
						</div>
						<div>
							<h5 className="text-base font-semibold text-bgray-900 dark:text-white">
								Annette Black
							</h5>
							<span className="text-sm font-medium text-success-300">
								HR Specialist •
								<span className="text-bgray-500 dark:text-bgray-50">
									4 Yrs Exp
								</span>
							</span>
						</div>
					</div>
				</div>
				<div className="flex justify-center mt-8">
					<button
						aria-label="none"
						data-target="#multi-step-modal"
						className="bg-success-300 hover:bg-success-400 transition duration-300 ease-in-out modal-open py-3 px-7 text-white rounded-lg font-medium"
					>
						Add a contact
					</button>
				</div> */}
				</div>
			</>
		)
	) : (
		<Loading />
	);
}

export default UserProfile;
