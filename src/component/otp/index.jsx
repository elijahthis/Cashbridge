"use client";
import clogoColor from "@/assets/images/logo/c-logo-color.jpg";
import logoWhite from "@/assets/images/logo/logo-white.svg";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import OtpInput from "react-otp-input";
import OTPInput from "react-otp-input";
import { confirmOtp } from "../../../requests";
import { getToken } from "../../../config/helpers";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Button from "../button";

function LeftSide() {
	const [otp, setOtp] = useState("");
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	return (
		<div className="lg:w-1/2 px-5 xl:pl-12 pt-10">
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
						Enter your OTP
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
							const res = await confirmOtp({
								otp: otp,
								token: getToken(),
							});
							if (res?.status === 200) {
								toast.success("OTP Verified");
								router.push("/");
							}
						} catch (e) {
							console.log(e);
						} finally {
							setLoading(false);
						}
					}}
				>
					<div className="mb-6 otpInputWrap">
						<OTPInput
							value={otp}
							onChange={setOtp}
							numInputs={6}
							renderSeparator={<span> • </span>}
							renderInput={(props) => (
								<input
									{...props}
									className="text-bgray-800 dark:text-white dark:bg-darkblack-500 dark:border-darkblack-400 text-base border border-bgray-300 h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base "
									required={true}
								/>
							)}
						/>
					</div>

					<Button loading={loading}>Confirm OTP</Button>
				</form>
				<p className="text-center text-bgray-900 dark:text-bgray-50 text-base font-medium pt-7">
					<Link href="/signin" className="font-semibold underline">
						Back to Sign in
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
