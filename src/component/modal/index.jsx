const Modal = ({ isActive, setIsActive, children }) => {
	return (
		<div
			className={`modal fixed inset-0 z-50 overflow-y-auto flex items-center justify-center ${
				isActive ? "" : "hidden"
			}`}
			id="multi-step-modal"
			onClick={() => setIsActive(false)}
		>
			<div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75 dark:bg-bgray-900 dark:opacity-50"></div>
			<div
				className="modal-content w-full max-w-lg mx-auto px-4 py-4 max-h-[100vh] overflow-y-auto rounded-lg no-scrollbar "
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;
