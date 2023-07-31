import FormEducations from './FormEducations';

const Magistr = ({questions, formData, handleAddEdu}) => {
	return (
		<div>
			<FormEducations questions={questions} formData={formData} handleAddEdu={handleAddEdu} name="Magistratura" />
		</div>
	);
};

export default Magistr;
