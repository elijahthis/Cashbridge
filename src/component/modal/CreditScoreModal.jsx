const CreditScoreModal = ({ score }) => {
	return (
		<div className="bg-white rounded-lg px-6 py-8 ">
			<p className="mb-2">Their Credit Score is </p>
			<h2 className="font-bold text-4xl ">{score}</h2>
		</div>
	);
};

export default CreditScoreModal;
