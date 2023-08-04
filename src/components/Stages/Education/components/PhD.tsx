import {IQuestionQuestion} from 'types';
import FormEducations from './FormEducations';
import {EducationQuestionsFormValues} from '../EducationQuestionsForm';
interface Edu {
	questions: IQuestionQuestion[];
	formData: EducationQuestionsFormValues;
	handleAddEdu: () => void;
}
const Phd = ({questions, formData, handleAddEdu}: Edu) => {
	return (
		<div>
			<FormEducations questions={questions} formData={formData} handleAddEdu={handleAddEdu} name="PhD" />
		</div>
	);
};

export default Phd;
