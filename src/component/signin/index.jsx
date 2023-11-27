"use client";
import clogoColor from "@/assets/images/logo/c-logo-color.jpg";
import logoColor from "@/assets/images/logo/logo-color.svg";
import logoWhite from "@/assets/images/logo/logo-white.svg";
import Link from "next/link";
import PasswordResetModal from "../modal/PasswordResetModal";
import { useState } from "react";
import Image from "next/image";
import Button from "../button";
import { userLogin } from "../../../requests";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import TogglePassword from "../TogglePassword";

function LeftSide() {
	const [modalOpen, setModalOpen] = useState(false);
	const [modalData, setModalData] = useState("");

	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	return (
		<div className="lg:w-1/2 px-5 xl:pl-12 pt-10">
			<PasswordResetModal
				isActive={modalOpen}
				modalData={modalData}
				handelModalData={setModalData}
				handleActive={setModalOpen}
			/>
			<header>
				<Link href="/" className="">
					<Image
						priority={true}
						height={82}
						width={120}
						src={clogoColor}
						className="block dark:hidden"
						alt="Logo"
					/>
					<Image
						priority={true}
						height={logoWhite.height}
						width={logoWhite.width}
						src={logoWhite.src}
						className="hidden dark:block"
						alt="Logo"
					/>
				</Link>
			</header>
			<div className="max-w-[450px] m-auto pt-24 pb-16">
				<header className="text-center mb-8">
					<h2 className="text-bgray-900 dark:text-white text-4xl font-semibold font-poppins mb-2">
						Sign in to Cashbridge.
					</h2>
					<p className="font-urbanis text-base font-medium text-bgray-600 dark:text-bgray-50">
						Send, spend and save smarter
					</p>
				</header>
				<form
					action=""
					onSubmit={async (e) => {
						e.preventDefault();

						setLoading(true);
						try {
							const res = await userLogin({
								email: loginData.email,
								password: loginData.password,
							});
							if (res?.status === 200) {
								toast.success("Login successful."); // success notification
								router.push("/otp");
								// updateNewLogin();
							}
						} catch (e) {
							console.log(e);
						} finally {
							setLoading(false);
						}
					}}
				>
					<div className="mb-4">
						<input
							type="text"
							className="text-bgray-800 text-base border border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
							placeholder="Email"
							value={loginData.email}
							onChange={(e) => {
								setLoginData({ ...loginData, email: e.target.value.trim() });
							}}
							required={true}
						/>
					</div>
					<TogglePassword
						value={loginData.password}
						onChange={(e) => {
							setLoginData({ ...loginData, password: e.target.value });
						}}
						placeholder="Password"
					/>

					<div className="flex justify-between mb-7">
						<div className="flex items-center space-x-3">
							<input
								type="checkbox"
								className="w-5 h-5 dark:bg-darkblack-500 focus:ring-transparent rounded-full border border-bgray-300 focus:accent-success-300 text-success-300"
								name="remember"
								id="remember"
							/>
							<label
								htmlFor="remember"
								className="text-bgray-900 dark:text-white text-base font-semibold"
							>
								Remember me
							</label>
						</div>
						<div>
							<a
								onClick={() => setModalOpen(true)}
								data-target="#multi-step-modal"
								className="modal-open text-success-300 font-semibold text-base underline"
							>
								Forgot Password?
							</a>
						</div>
					</div>
					<Button
						loading={loading}
						disabled={loginData.email === "" || loginData.password === ""}
					>
						Sign In
					</Button>
				</form>
				<p className="text-center text-bgray-900 dark:text-bgray-50 text-base font-medium pt-7">
					Don’t have an account?{" "}
					<Link href="/signup" className="font-semibold underline">
						Sign Up
					</Link>
				</p>
				<nav className="flex items-center justify-center flex-wrap gap-x-11 pt-24">
					<Link href="#" className="text-sm text-bgray-700 dark:text-white">
						Terms & Condition
					</Link>
					<Link href="#" className="text-sm text-bgray-700 dark:text-white">
						Privacy Policy
					</Link>
					<Link href="#" className="text-sm text-bgray-700 dark:text-white">
						Help
					</Link>
					<Link href="#" className="text-sm text-bgray-700 dark:text-white">
						English
					</Link>
				</nav>
				<p className="text-bgray-600 dark:text-white text-center text-sm mt-6">
					@ 2023 Cashbridge. All Right Reserved.
				</p>
			</div>
		</div>
	);
}

export default LeftSide;
