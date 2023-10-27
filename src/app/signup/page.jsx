import signupImg from "@/assets/images/illustration/signup.svg";
import RightSide from "@/component/signin/RightSide";
import SignUpForm from "@/component/forms/SignUpForm";
import clogoColor from "@/assets/images/logo/c-logo-color.jpg";
import logoWhite from "@/assets/images/logo/logo-white.svg";
import Link from "next/link";
import Image from "next/image";

function SignUp() {
	return (
		<section className="bg-white dark:bg-darkblack-500">
			<div className="flex flex-col lg:flex-row justify-between min-h-screen">
				{/* Left */}
				<div className="lg:w-1/2 px-5 xl:pl-12 pt-10">
					<header>
						<Link href="/" className="">
							<Image
								priority={true}
								height={82}
								width={120}
								src={clogoColor.src}
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

					<div className="max-w-[460px] m-auto pt-24 pb-16">
						<header className="text-center mb-8">
							<h2 className="text-bgray-900 dark:text-white text-4xl font-semibold font-poppins mb-2">
								Sign up for an account
							</h2>
							<p className="font-urbanis text-base font-medium text-bgray-600 dark:text-darkblack-300">
								Send, spend and save smarter
							</p>
						</header>

						{/* Form  */}
						<SignUpForm />
						{/* Form Bottom  */}
						<p className="text-center text-bgray-900 dark:text-bgray-50 text-base font-medium pt-7">
							Already have an account?
							<Link href="/signin" className="font-semibold underline">
								Sign In
							</Link>
						</p>
						<nav className="flex items-center justify-center flex-wrap gap-x-11 pt-24">
							<Link
								href="#"
								className="text-sm text-bgray-700 dark:text-bgray-50"
							>
								Terms & Condition
							</Link>
							<Link
								href="#"
								className="text-sm text-bgray-700 dark:text-bgray-50"
							>
								Privacy Policy
							</Link>
							<Link
								href="#"
								className="text-sm text-bgray-700 dark:text-bgray-50"
							>
								Help
							</Link>
							<Link
								href="#"
								className="text-sm text-bgray-700 dark:text-bgray-50"
							>
								English
							</Link>
						</nav>
						{/* Copyright  */}
						<p className="text-bgray-600 dark:text-darkblack-300 text-center text-sm mt-6">
							&copy; 2023 Cashbridge. All Right Reserved.
						</p>
					</div>
				</div>
				{/*  Right  */}
				<RightSide img={signupImg} />ß
			</div>
		</section>
	);
}

export default SignUp;
