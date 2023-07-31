import Bakalavr from './Bakalavr';
import Magistr from './Magistr';
import Phd from './PhD';
import {useSelector} from 'react-redux';
interface RootState {
	dataa: {
		tehsilPage: number;
	};
}
const EducationAdd = ({questions, formData, handleAddEdu}) => {
	const tehsilPage = useSelector((state: RootState) => state.dataa.tehsilPage);
	const DisplayEducations = () => {
		if (tehsilPage === 1) {
			return <Bakalavr questions={questions} formData={formData} handleAddEdu={handleAddEdu} />;
		} else if (tehsilPage === 2) {
			return <Magistr questions={questions} formData={formData} handleAddEdu={handleAddEdu} />;
		} else if (tehsilPage === 3) {
			return <Phd questions={questions} formData={formData} handleAddEdu={handleAddEdu} />;
		}
	};
	return <div className="h-[460px] overflow-y-scroll">{DisplayEducations()}</div>;
};

export default EducationAdd;
