import {IQuestionQuestion} from 'types';
import FormEducations from './FormEducations';
import {EducationQuestionsFormValues} from '../EducationQuestionsForm';
interface Edu {
	questions: IQuestionQuestion[];
	formData: EducationQuestionsFormValues;
	handleAddEdu: () => void;
}
const PesheTehsil = ({questions, formData, handleAddEdu}: Edu) => {
	return (
		<div>
			<FormEducations questions={questions} formData={formData} handleAddEdu={handleAddEdu} name="Peşə təhsili" />
		</div>
	);
};

export default PesheTehsil;
