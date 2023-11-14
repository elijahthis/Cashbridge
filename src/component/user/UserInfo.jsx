import { useState } from "react";
import Modal from "../modal";
import EditPersonalInfoModal from "../modal/EditPersonalInfoModal";
import { EditUserEmploymentModal } from "../modal/EditUserEmploymentModal";
import EditNOKModal from "../modal/EditNOKModal";
import EditAddressModal from "../modal/EditAddressModal";
import InfoBlock from "./InfoBlock";
import InfoRow from "./InfoRow";
import {
	convertWeirdDate,
	formatDate,
	prettifyMoney,
} from "../../../utils/helperFuncs";
import { bankList } from "@/data/bankList";

const UserInfo = ({ refetch, setRefetch, userId, userData }) => {
	// modal states
	const [openEmploymentModal, setOpenEmploymentModal] = useState(false);
	const [openPersonalModal, setOpenPersonalModal] = useState(false);
	const [openNOKModal, setOpenNOKModal] = useState(false);
	const [openAddressModal, setOpenAddressModal] = useState(false);

	return (
		<>
			{openPersonalModal && (
				<Modal isActive={openPersonalModal} setIsActive={setOpenPersonalModal}>
					<EditPersonalInfoModal
						isActive={openPersonalModal}
						setIsActive={setOpenPersonalModal}
						personalData={userData ?? {}}
						refetchFunc={() => setRefetch((val) => !val)}
					/>
				</Modal>
			)}
			{openEmploymentModal && (
				<Modal
					isActive={openEmploymentModal}
					setIsActive={setOpenEmploymentModal}
				>
					<EditUserEmploymentModal
						isActive={openEmploymentModal}
						setIsActive={setOpenEmploymentModal}
						employmentData={userData?.employmentDetail[0] ?? {}}
						refetchFunc={() => setRefetch((val) => !val)}
					/>
				</Modal>
			)}
			{openNOKModal && (
				<Modal isActive={openNOKModal} setIsActive={setOpenNOKModal}>
					<EditNOKModal
						isActive={openNOKModal}
						setIsActive={setOpenNOKModal}
						NOKData={userData?.nok[0] ?? {}}
						refetchFunc={() => setRefetch((val) => !val)}
					/>
				</Modal>
			)}
			{openAddressModal && (
				<Modal isActive={openAddressModal} setIsActive={setOpenAddressModal}>
					<EditAddressModal
						isActive={openAddressModal}
						setIsActive={setOpenAddressModal}
						addressData={userData?.residentialAddress[0] ?? {}}
						refetchFunc={() => setRefetch((val) => !val)}
					/>
				</Modal>
			)}
			<div>
				<InfoBlock
					title="Personal Info"
					editFunc={() => setOpenPersonalModal(true)}
				>
					<InfoRow
						label="Name"
						value={
							userData?.firstname
								? `${userData?.firstname} ${userData?.lastname}`
								: "-"
						}
					/>
					<InfoRow label="Phone Number" value={userData?.phone ?? "-"} />
					<InfoRow label="Email Address" value={userData?.email ?? "-"} />
					<InfoRow
						label="Date of Birth (DOB)"
						value={
							userData?.dob ? formatDate(convertWeirdDate(userData?.dob)) : "-"
						}
					/>
				</InfoBlock>
				<InfoBlock
					title="Residential Address"
					editFunc={() => setOpenAddressModal(true)}
				>
					<InfoRow
						label="Address"
						value={
							userData?.residentialAddress?.[0]?.address
								? [
										userData?.residentialAddress?.[0]?.address,
										userData?.residentialAddress?.[0]?.city,
										userData?.residentialAddress?.[0]?.state,
								  ].join(", ")
								: "-"
						}
					/>
					<InfoRow
						label="Landmark"
						value={userData?.residentialAddress[0]?.landmark ?? "-"}
					/>
					<InfoRow
						label="Status"
						value={userData?.residentialAddress[0]?.status ?? "-"}
					/>
				</InfoBlock>
				<InfoBlock title="Bank Information">
					<InfoRow
						label="Account Number"
						value={userData?.customerBank[0]?.accountNumber ?? "-"}
					/>
					<InfoRow
						label="Bank Name"
						value={
							bankList.filter(
								(item) => item.code === userData?.customerBank[0]?.bankCode
							)[0]?.name ?? "-"
						}
					/>
					<InfoRow
						label="Phone Number"
						value={userData?.customerBank[0]?.phone ?? "-"}
					/>
					<InfoRow label="BVN" value={userData?.bvn ? userData?.bvn : "-"} />
					<InfoRow
						label="CBS Account Reference"
						value={userData?.cbsAccountReference ?? "-"}
					/>
				</InfoBlock>
				<InfoBlock
					title="Employment Information"
					editFunc={() => setOpenEmploymentModal(true)}
				>
					<InfoRow
						label="Employment Status"
						value={userData?.employmentDetail?.[0]?.status ?? "-"}
					/>
					<InfoRow
						label="Company"
						value={userData?.employmentDetail?.[0]?.company ?? "-"}
					/>
					<InfoRow
						label="Sector"
						value={userData?.employmentDetail?.[0]?.sector ?? "-"}
					/>
					<InfoRow
						label="Employment Address"
						value={
							userData?.employmentDetail[0]?.address
								? [
										userData?.employmentDetail[0]?.address,
										userData?.employmentDetail[0]?.city,
										userData?.employmentDetail[0]?.state,
								  ].join(", ")
								: "-"
						}
					/>
					<InfoRow
						label="Monthly Income"
						value={
							userData?.employmentDetail[0]?.month_income
								? `NGN ${prettifyMoney(
										Number(userData?.employmentDetail[0]?.month_income)
								  )}`
								: "-"
						}
					/>
					<InfoRow
						label="Date Started"
						value={
							userData?.employmentDetail[0]?.dateStarted
								? formatDate(
										convertWeirdDate(userData?.employmentDetail[0]?.dateStarted)
								  )
								: "-"
						}
					/>
				</InfoBlock>
				<div className="mb-6"></div>
				<InfoBlock title="Next of Kin" editFunc={() => setOpenNOKModal(true)}>
					<InfoRow
						label="Name"
						value={
							userData?.nok[0]?.firstName
								? `${userData?.nok[0]?.firstName} ${userData?.nok[0]?.lastName}`
								: "-"
						}
					/>
					<InfoRow
						label="Phone Number"
						value={userData?.nok[0]?.phone ?? "-"}
					/>
					<InfoRow label="Address" value={userData?.nok[0]?.address ?? "-"} />
					<InfoRow
						label="Relationship"
						value={userData?.nok[0]?.relationship ?? "-"}
					/>
				</InfoBlock>
			</div>
		</>
	);
};

export default UserInfo;
