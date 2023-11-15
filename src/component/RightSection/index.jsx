import Wallet from "../wallet";
import TeamChat from "../teamChat";

function RightSection() {
	return (
		<section className="flex w-full flex-col space-x-0 lg:flex-row lg:space-x-6 ">
			<Wallet />
			<TeamChat />
		</section>
	);
}

export default RightSection;
