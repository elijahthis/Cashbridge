import RightSide from "@/component/signin/RightSide";
import signinImg from "@/assets/images/illustration/side-3.jpg";
import LeftSide from "@/component/otp";

export const metadata = {
	title: "OTP | Cashbridge",
	description: "Cashbridge OTP",
};

const OTPPage = () => {
	return (
		<section className="bg-white dark:bg-darkblack-500">
			<div className="flex flex-col lg:flex-row justify-between min-h-screen">
				<LeftSide />
				<RightSide img={signinImg} imgURL={"/images/illustration/side-3.jpg"} />
			</div>
		</section>
	);
};

export default OTPPage;
