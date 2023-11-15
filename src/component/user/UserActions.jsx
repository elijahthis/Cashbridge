"use client";

import { useState } from "react";
import Button from "../button";
import { toast } from "react-toastify";
import {
	suspendUser,
	unSuspendUser,
	updatePIN,
	verifyKYC,
} from "../../../requests/users";
import { getUserCreditScore } from "../../../requests/loans";
import Modal from "../modal";
import CreditScoreModal from "../modal/CreditScoreModal";

const UserActions = ({ refetch, setRefetch, userId, userData }) => {
	// data states
	const [creditScore, setCreditScore] = useState(0);
	// loading states
	const [suspendLoading, setSuspendLoading] = useState(false);
	const [verifyKYCLoading, setVerifyKYCLoading] = useState(false);
	const [updatePINLoading, setUpdatePINLoading] = useState(false);
	const [creditScoreLoading, setCreditScoreLoading] = useState(false);
	// modal states
	const [openCreditScoreModal, setOpenCreditScoreModal] = useState(false);

	// action requests
	const suspendFunc = async () => {
		setSuspendLoading(true);
		try {
			const res = await suspendUser(userId);
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
			const res = await unSuspendUser(userId);
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
			const res = await verifyKYC(userId, { bvn: "" });
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
			const res = await updatePIN(userId);
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

	const getCreditScoreFunc = async () => {
		setCreditScoreLoading(true);
		try {
			const res = await getUserCreditScore(userId);
			if (res?.data?.success) {
				setCreditScore(res?.data?.data?.score);
				setOpenCreditScoreModal(true);
			}
		} catch (error) {
			console.log(error);
			toast.error("Unable fetch user Credit Score");
		} finally {
			setCreditScoreLoading(false);
		}
	};

	return (
		<>
			{openCreditScoreModal && (
				<Modal
					isActive={openCreditScoreModal}
					setIsActive={setOpenCreditScoreModal}
				>
					<CreditScoreModal score={creditScore} />
				</Modal>
			)}
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
							backgroundColor: userData?.isSuspended ? "#86272D" : "#dc2626",
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
					<Button
						onClick={() => {
							getCreditScoreFunc();
						}}
						loading={creditScoreLoading}
					>
						Get Credit Score
					</Button>
				</div>
			</div>
		</>
	);
};

export default UserActions;
