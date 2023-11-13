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
import EditNOKModal from "../modal/EditNOKModal";
import EditAddressModal from "../modal/EditAddressModal";
import MUITable from "../MUITable";
import {
	getUserWalletBalance,
	getUserWalletTransactions,
} from "../../../requests/transactions";
import GoBack from "../GoBack";
import WalletComponent from "../WalletComponent";

function UserProfile({ params }) {
	// Data states
	const [userData, setUserData] = useState({});
	const [transactionList, setTransactionList] = useState([]);
	const [walletData, setWalletData] = useState({
		currency: "-",
		available_balance: 0,
		ledger_balance: 0,
	});
	// loading states
	const [loading, setLoading] = useState(false);
	const [transLoading, setTransLoading] = useState(false);
	const [balanceLoading, setBalanceLoading] = useState(false);
	const [suspendLoading, setSuspendLoading] = useState(false);
	const [verifyKYCLoading, setVerifyKYCLoading] = useState(false);
	const [updatePINLoading, setUpdatePINLoading] = useState(false);
	// fetch states
	const [refetch, setRefetch] = useState(false);
	const [fetched, setFetched] = useState(false);
	// modal states
	const [openEmploymentModal, setOpenEmploymentModal] = useState(false);
	const [openPersonalModal, setOpenPersonalModal] = useState(false);
	const [openNOKModal, setOpenNOKModal] = useState(false);
	const [openAddressModal, setOpenAddressModal] = useState(false);
	// Pagination states
	const [currPage, setCurrPage] = useState(1);
	const [totalTransactionPages, setTotalTransactionPages] = useState(1);

	// data fetching requests
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

	const fetchTransactionData = async () => {
		setTransLoading(true);
		try {
			const res2 = await getUserWalletTransactions(params.id, currPage);
			console.log("res2", res2);
			if (res2.data?.success) {
				setTransactionList(res2.data?.data?.transactions);
				setTotalTransactionPages(res2.data?.data?.page_info?.total_pages);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setTransLoading(false);
			// setFetched(true);
		}
	};

	const fetchWalletBalance = async () => {
		setBalanceLoading(true);
		try {
			const res = await getUserWalletBalance(params.id);
			console.log("res", res);
			if (res.data?.success) {
				setWalletData(res.data?.data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setBalanceLoading(false);
		}
	};
	// -------------------------------------------------

	// action requests
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
	// -------------------------------------------------

	useEffect(() => {
		fetchData();
	}, [refetch]);

	useEffect(() => {
		fetchTransactionData();
	}, [refetch, currPage]);

	useEffect(() => {
		fetchWalletBalance();
	}, [refetch]);

	console.log("userData", userData);
	console.log("transactionList", transactionList);

	return fetched ? (
		loading ? (
			<Loading />
		) : (
			<>
				{openPersonalModal && (
					<Modal
						isActive={openPersonalModal}
						setIsActive={setOpenPersonalModal}
					>
						<EditPersonalInfoModal
							isActive={openPersonalModal}
							setIsActive={setOpenPersonalModal}
							personalData={userData ?? {}}
							refetchFunc={() => setRefetch((val) => !val)}
						/>
					</Modal>
				)}
				{openEmploymentModal && (
					<Modal
						isActive={openEmploymentModal}
						setIsActive={setOpenEmploymentModal}
					>
						<EditUserEmploymentModal
							isActive={openEmploymentModal}
							setIsActive={setOpenEmploymentModal}
							employmentData={userData?.employmentDetail[0] ?? {}}
							refetchFunc={() => setRefetch((val) => !val)}
						/>
					</Modal>
				)}
				{openNOKModal && (
					<Modal isActive={openNOKModal} setIsActive={setOpenNOKModal}>
						<EditNOKModal
							isActive={openNOKModal}
							setIsActive={setOpenNOKModal}
							NOKData={userData?.nok[0] ?? {}}
							refetchFunc={() => setRefetch((val) => !val)}
						/>
					</Modal>
				)}
				{openAddressModal && (
					<Modal isActive={openAddressModal} setIsActive={setOpenAddressModal}>
						<EditAddressModal
							isActive={openAddressModal}
							setIsActive={setOpenAddressModal}
							addressData={userData?.residentialAddress[0] ?? {}}
							refetchFunc={() => setRefetch((val) => !val)}
						/>
					</Modal>
				)}
				<GoBack backLink="/users" />
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
						</div>
					</header>
					<InfoBlock
						title="Personal Info"
						editFunc={() => setOpenPersonalModal(true)}
					>
						<InfoRow
							label="Name"
							value={
								userData?.firstname
									? `${userData?.firstname} ${userData?.lastname}`
									: "-"
							}
						/>
						<InfoRow label="Phone Number" value={userData?.phone ?? "-"} />
						<InfoRow label="Email Address" value={userData?.email ?? "-"} />
						<InfoRow
							label="Date of Birth (DOB)"
							value={
								userData?.dob
									? formatDate(convertWeirdDate(userData?.dob))
									: "-"
							}
						/>
					</InfoBlock>
					<InfoBlock
						title="Residential Address"
						editFunc={() => setOpenAddressModal(true)}
					>
						<InfoRow
							label="Address"
							value={
								userData?.residentialAddress?.[0]?.address
									? [
											userData?.residentialAddress?.[0]?.address,
											userData?.residentialAddress?.[0]?.city,
											userData?.residentialAddress?.[0]?.state,
									  ].join(", ")
									: "-"
							}
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
							value={userData?.customerBank[0]?.accountNumber ?? "-"}
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
							value={userData?.customerBank[0]?.phone ?? "-"}
						/>
						<InfoRow label="BVN" value={userData?.bvn ? userData?.bvn : "-"} />
						<InfoRow
							label="CBS Account Reference"
							value={userData?.cbsAccountReference ?? "-"}
						/>
					</InfoBlock>
					<InfoBlock
						title="Employment Information"
						editFunc={() => setOpenEmploymentModal(true)}
					>
						<InfoRow
							label="Employment Status"
							value={userData?.employmentDetail?.[0]?.status ?? "-"}
						/>
						<InfoRow
							label="Company"
							value={userData?.employmentDetail?.[0]?.company ?? "-"}
						/>
						<InfoRow
							label="Sector"
							value={userData?.employmentDetail?.[0]?.sector ?? "-"}
						/>
						<InfoRow
							label="Employment Address"
							value={
								userData?.employmentDetail[0]?.address
									? [
											userData?.employmentDetail[0]?.address,
											userData?.employmentDetail[0]?.city,
											userData?.employmentDetail[0]?.state,
									  ].join(", ")
									: "-"
							}
						/>
						<InfoRow
							label="Monthly Income"
							value={
								userData?.employmentDetail[0]?.month_income
									? `NGN ${prettifyMoney(
											Number(userData?.employmentDetail[0]?.month_income)
									  )}`
									: "-"
							}
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
					<InfoBlock title="Next of Kin" editFunc={() => setOpenNOKModal(true)}>
						<InfoRow
							label="Name"
							value={
								userData?.nok[0]?.firstName
									? `${userData?.nok[0]?.firstName} ${userData?.nok[0]?.lastName}`
									: "-"
							}
						/>
						<InfoRow
							label="Phone Number"
							value={userData?.nok[0]?.phone ?? "-"}
						/>
						<InfoRow label="Address" value={userData?.nok[0]?.address ?? "-"} />
						<InfoRow
							label="Relationship"
							value={userData?.nok[0]?.relationship ?? "-"}
						/>
					</InfoBlock>

					<div className="py-6 mb-6 border-b border-bgray-200 dark:border-darkblack-400">
						<h2 className="font-bold text-3xl">Actions</h2>
						<div className="grid grid-cols-3 gap-4 py-3">
							{/* <Button>Verify KYC</Button> */}
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
					<div>
						<h2 className="font-bold text-3xl mb-4">Transactions</h2>
						<MUITable
							headers={[
								{ label: "Amount", key: "amount" },
								{ label: "Reference", key: "reference" },
								{ label: "Balance Before", key: "balance_before" },
								{ label: "Balance After", key: "balance_after" },
								{ label: "Remarks", key: "remarks" },
								{ label: "Transaction Date", key: "date" },
							]}
							bodyData={transactionList.map((transItem) => ({
								amount: `${transItem?.currency}${prettifyMoney(
									transItem?.amount
								)}`,
								balance_before: `${transItem?.currency}${prettifyMoney(
									transItem?.balance_before
								)}`,
								balance_after: `${transItem?.currency}${prettifyMoney(
									transItem?.balance_after
								)}`,
								reference: transItem?.reference,
								remarks: transItem?.remarks,
								date: formatDate(transItem?.date),
							}))}
							handlePageClick={(page) => {
								setCurrPage(page);
							}}
							pageCount={totalTransactionPages}
							loading={transLoading}
						/>
					</div>
					<div className="py-6">
						<h2 className="font-bold text-3xl mb-4">Wallet</h2>
						<div className="card-slider relative w-[280px] md:w-[340px]">
							{balanceLoading ? (
								<Loading size="80px" />
							) : (
								<WalletComponent walletData={walletData} />
							)}
						</div>
					</div>
				</div>
			</>
		)
	) : (
		<Loading />
	);
}

export default UserProfile;
