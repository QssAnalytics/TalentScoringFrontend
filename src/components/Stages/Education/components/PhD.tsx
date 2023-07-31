import FormEducations from './FormEducations';

const Phd = ({questions, formData, handleAddEdu}) => {
	return (
		<div>
			<FormEducations questions={questions} formData={formData} handleAddEdu={handleAddEdu} name="PhD" />
		</div>
	);
};

export default Phd;
