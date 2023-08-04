import {IQuestionQuestion} from 'types';
import FormEducations from './FormEducations';
import {EducationQuestionsFormValues} from '../EducationQuestionsForm';
interface Edu {
	questions: IQuestionQuestion[];
	formData: EducationQuestionsFormValues;
	handleAddEdu: () => void;
}
const Magistr = ({questions, formData, handleAddEdu}: Edu) => {
	return (
		<div>
			<FormEducations questions={questions} formData={formData} handleAddEdu={handleAddEdu} name="Magistratura" />
		</div>
	);
};

export default Magistr;
