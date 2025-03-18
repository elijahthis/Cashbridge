import { currencyList } from "@/data/constants";
import InfoBlock from "../user/InfoBlock";
import InfoRow from "../user/InfoRow";
import { formatDate } from "../../../utils/helperFuncs";
import GoBack from "../GoBack";

const SelectedBilling = ({ billItem, backFunc }) => {
	return (
		<div className="my-6">
			<div className="mb-4">
				<GoBack backFunc={backFunc} />
			</div>

			<InfoBlock title="Transaction Info" isOpen={true}>
				<InfoRow label="Transaction ID" value={billItem?.tx_id ?? "-"} />
				<InfoRow
					label="Amount"
					value={
						`${
							currencyList.find((item) => item.label === billItem?.currency)
								?.symbol ?? "₦"
						} ${Number(billItem?.amount)}` ?? "-"
					}
				/>
				<InfoRow
					label="Customer ID (Phone)"
					value={billItem?.customer_id ?? "-"}
				/>
				<InfoRow label="Frequency" value={billItem?.frequency ?? "-"} />
				<InfoRow label="Product" value={billItem?.product ?? "-"} />
				<InfoRow label="Product Name" value={billItem?.product_name ?? "-"} />
				<InfoRow label="Commission" value={billItem?.commission ?? "-"} />
				<InfoRow
					label="Created At"
					value={formatDate(billItem?.created_at) ?? "-"}
				/>
			</InfoBlock>
		</div>
	);
};

export default SelectedBilling;
