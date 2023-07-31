import FormEducations from './FormEducations';

const Bakalavr = ({questions, formData, handleAddEdu}) => {
	return (
		<div>
			<FormEducations questions={questions} formData={formData} handleAddEdu={handleAddEdu} name="Bakalavr" />
		</div>
	);
};

export default Bakalavr;
