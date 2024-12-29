import { currencyList } from "@/data/constants";
import InfoBlock from "../user/InfoBlock";
import InfoRow from "../user/InfoRow";
import { formatDate, prettifyMoney } from "../../../utils/helperFuncs";
import GoBack from "../GoBack";

const SelectedSavings = ({ transItem, backFunc }) => {
	return (
		<div className="my-6">
			<div className="mb-4">
				<GoBack backFunc={backFunc} />
			</div>

			<InfoBlock title="Transaction Info" isOpen={true}>
				<InfoRow
					label="Amount"
					value={
						`${
							currencyList.find((item) => item.label === transItem?.currency)
								?.symbol ?? "₦"
						}${prettifyMoney(transItem?.amount ?? 0)}` ?? ""
					}
				/>
				<InfoRow
					label="Type"
					value={
						transItem?.type === "lock"
							? "BRIDGE LOCK"
							: transItem?.type === "saving"
							? "BRIDGE SAVE"
							: transItem?.type
					}
				/>
				<InfoRow
					label="Lock Period"
					value={`${transItem?.lockPeriod || 0} days`}
				/>
				<InfoRow label="Interest Rate" value={`${transItem?.interestRate}%`} />
				<InfoRow
					label="Interest Earned"
					value={`${
						currencyList.find((item) => item.label === transItem?.currency)
							?.symbol ?? "₦"
					}${prettifyMoney(transItem?.interestEarned ?? 0)}`}
				/>
				<InfoRow
					label="Status"
					value={
						transItem?.status === "inactive" ? (
							<span className="px-3 py-2 rounded-lg bg-[#FCDEDE] text-[#DD3333] ">
								Inactive
							</span>
						) : transItem?.status === "active" ? (
							<span className="px-3 py-2 rounded-lg bg-[#D9FBE6] text-[#22C55E] ">
								Active
							</span>
						) : (
							transItem?.status
						)
					}
				/>
				<InfoRow
					label="Created At"
					value={formatDate(transItem?.createdAt) ?? "-"}
				/>
				<InfoRow
					label="Last Updated"
					value={formatDate(transItem?.updatedAt) ?? "-"}
				/>
			</InfoBlock>
		</div>
	);
};

export default SelectedSavings;
