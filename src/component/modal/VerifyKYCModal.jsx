import { useState } from "react";
import { toast } from "react-toastify";
import { verifyKYC } from "../../../requests/users";
import InputComponent from "../InputComponent";
import Button from "../button";

const VerifyKYCModal = ({ userId, setIsActive }) => {
	const [BVN, setBVN] = useState("");
	const [loading, setLoading] = useState("");

	const verifyKYCFunc = async () => {
		setLoading(true);
		try {
			const res = await verifyKYC(userId, { bvn: BVN });
			if (res?.data?.success) {
				toast.success("Customer KYC Verified");
				setIsActive(false);
				// setRefetch((val) => !val);
			}
		} catch (error) {
			console.log(error);
			toast.error("Unable to verify KYC");
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			verifyKYCFunc();
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<div className="bg-white rounded-lg px-6 py-8 ">
			<h2 className="font-bold text-4xl mb-2 ">Verify KYC</h2>
			<p className="mb-5">Please enter the user's BVN </p>
			<form
				action=""
				className="flex flex-col items-stretch gap-3 "
				onSubmit={handleSubmit}
			>
				<InputComponent
					label="BVN"
					name="bvn"
					value={BVN}
					onChange={(e) => setBVN(e.target.value)}
					required={true}
				/>
				<Button loading={loading}>Verify</Button>
			</form>
		</div>
	);
};

export default VerifyKYCModal;
