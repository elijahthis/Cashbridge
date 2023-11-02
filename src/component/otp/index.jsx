"use client";
import clogoColor from "@/assets/images/logo/c-logo-color.jpg";
import logoWhite from "@/assets/images/logo/logo-white.svg";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import OtpInput from "react-otp-input";
import OTPInput from "react-otp-input";

function LeftSide() {
	const [otp, setOtp] = useState("");

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
				<form action="">
					<div className="mb-6 otpInputWrap">
						<OTPInput
							value={otp}
							onChange={setOtp}
							numInputs={4}
							renderSeparator={<span> • </span>}
							renderInput={(props) => <input {...props} />}
						/>
					</div>

					<Link
						href="/"
						className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg w-full"
					>
						Confirm
					</Link>
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
