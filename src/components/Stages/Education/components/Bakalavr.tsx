import {IQuestionQuestion} from 'types';
import FormEducations from './FormEducations';
import {EducationQuestionsFormValues} from '../EducationQuestionsForm';
interface Edu {
	questions: IQuestionQuestion[];
	formData: EducationQuestionsFormValues;
	handleAddEdu: () => void;
}
const Bakalavr = ({questions, formData, handleAddEdu}: Edu) => {
	return (
		<div>
			<FormEducations questions={questions} formData={formData} handleAddEdu={handleAddEdu} name="Bakalavr" />
		</div>
	);
};

export default Bakalavr;
