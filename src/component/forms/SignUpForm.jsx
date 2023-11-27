"use client";
import Link from "next/link";
import Button from "../button";
import { useState } from "react";
import { registerUser, userLogin } from "../../../requests";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import TogglePassword from "../TogglePassword";

function SignUpForm() {
	const [signupData, setSignupData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		confirm_password: "",
	});

	const router = useRouter();

	const [loading, setLoading] = useState(false);

	return (
		<form
			action=""
			onSubmit={async (e) => {
				e.preventDefault();

				if (signupData.password !== signupData.confirm_password) {
					toast.error("Password and confirm password does not match.");
				} else {
					setLoading(true);
					try {
						const res = await registerUser({
							firstname: signupData.firstname,
							lastname: signupData.lastname,
							email: signupData.email,
							password: signupData.password,
						});
						if (res?.status === 201) {
							toast.success("Congratulations! Your account has been created.");
							router.push("/signin");
						}
					} catch (e) {
						console.log(e);
					} finally {
						setLoading(false);
					}
				}
			}}
		>
			<div className="flex flex-col md:flex-row gap-4 justify-between mb-4">
				<div>
					<input
						type="text"
						className="text-bgray-800 dark:text-white dark:bg-darkblack-500 dark:border-darkblack-400 text-base border border-bgray-300 h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base "
						placeholder="First name"
						required={true}
						value={signupData.firstname}
						onChange={(e) => {
							setSignupData({
								...signupData,
								firstname: e.target.value.trim(),
							});
						}}
					/>
				</div>
				<div>
					<input
						type="text"
						className="text-bgray-800 dark:text-white dark:bg-darkblack-500 dark:border-darkblack-400  text-base border border-bgray-300 h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
						placeholder="Last name"
						required={true}
						value={signupData.lastname}
						onChange={(e) => {
							setSignupData({ ...signupData, lastname: e.target.value.trim() });
						}}
					/>
				</div>
			</div>
			<div className="mb-4">
				<input
					type="text"
					className="text-bgray-800 dark:text-white dark:bg-darkblack-500 dark:border-darkblack-400  text-base border border-bgray-300 h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
					placeholder="Email"
					required={true}
					value={signupData.email}
					onChange={(e) => {
						setSignupData({ ...signupData, email: e.target.value.trim() });
					}}
				/>
			</div>
			<TogglePassword
				value={signupData.password}
				onChange={(e) => {
					setSignupData({ ...signupData, password: e.target.value });
				}}
				placeholder="Password"
			/>
			<TogglePassword
				value={signupData.confirm_password}
				onChange={(e) => {
					setSignupData({ ...signupData, confirm_password: e.target.value });
				}}
				placeholder="Confirm Password"
			/>

			{/* <div className="flex justify-between mb-7">
				<div className="flex items-center gap-x-3">
					<input
						type="checkbox"
						className="w-5 h-5 focus:ring-transparent rounded-md border border-bgray-300 focus:accent-success-300 text-success-300 dark:bg-transparent dark:border-darkblack-400"
						name="remember"
						id="remember"
					/>
					<label
						htmlFor="remember"
						className="text-bgray-600 dark:text-bgray-50 text-base"
					>
						By creating an account, you agreeing to our
						<span className="text-bgray-900 dark:text-white">
							Privacy Policy,
						</span>{" "}
						and
						<span className="text-bgray-900 dark:text-white">
							Electronics Communication Policy
						</span>
						.
					</label>
				</div>
			</div> */}
			<Button
				onClick={() => {}}
				loading={loading}
				disabled={
					signupData.firstname === "" ||
					signupData.lastname === "" ||
					signupData.email === "" ||
					signupData.password === "" ||
					signupData.confirm_password === ""
				}
			>
				Sign Up
			</Button>
			{/* <Link
				href="/signin"
				className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg w-full"
			>
				Sign Up
			</Link> */}
		</form>
	);
}

export default SignUpForm;
