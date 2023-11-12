import { prettifyMoney } from "../../../utils/helperFuncs";

const WalletComponent = ({ walletData }) => {
	const { currency, available_balance, ledger_balance } = walletData;
	return (
		<div className="min-w-[280px] md:min-w-[340px] w-full bg-[#1f2530] rounded-lg text-white py-7 px-6 flex flex-col items-stretch gap-2 ">
			<div className="flex flex-row items-center gap-4 justify-between">
				{/* <p>Currency:</p> */}
				<p className="font-bold md:text-lg">{currency}</p>
			</div>
			<div className="flex flex-row items-center gap-4 justify-between">
				<p className="md:text-lg text-sm font-medium">Available Bal:</p>
				<p className="font-bold md:text-xl">
					{currency} {prettifyMoney(available_balance)}
				</p>
			</div>
			<div className="flex flex-row items-center gap-4 justify-between">
				<p className="text-sm md:text-base">Ledger Bal:</p>
				<p className="font-bold">
					{currency} {prettifyMoney(ledger_balance)}
				</p>
			</div>
		</div>
	);
};

export default WalletComponent;
