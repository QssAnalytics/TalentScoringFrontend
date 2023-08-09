
import {Icon} from '@iconify/react';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'redux';
import {addData, addElave, addPop, addRemove, changeTehsilPage} from 'state/dataSlice';
import { EducationQuestionsFormValues } from '../EducationQuestionsForm';
import {useSelector} from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

interface Edu{
	formData:EducationQuestionsFormValues,
	setValue: any
}
interface RootState {
	dataa: {
		removeFunc: boolean;
	};
}
const Educations = ({formData,setValue}:Edu)=> {
	const dispatch: Dispatch = useDispatch();
	const remove = useSelector((state: RootState) => state.dataa.removeFunc);
	const [idd,setId] = useState(0)
	const handleClick = ()=>{
		if (formData?.education.length!==0) {
			dispatch(addElave(true))
		
		}else{
			dispatch(addElave(false))
			dispatch(changeTehsilPage(1))
			
		}
		dispatch(addData(-1))
	}
    const handleDelete =(id:number)=>{
		dispatch(addPop(true))
		setId(id)
       
	}; 
	if (remove===true) {
		const copy = formData?.education?.filter(
			(x) => x.id !== idd
			
		);
		setValue('education',copy)
		dispatch(addRemove(false))
	}
	
	return (
		<div>
			{formData?.education?.map((elem, index) => (
				<div
					className="border flex-grow rounded-full flex justify-between  items-center  relative pr-5 background mb-5"
					key={index}
				>
					<div className="w-36 rounded-l-full flex items-center">
						<div className="info flex gap-5 px-5 py-1 ">
							<span>{elem.id}. </span>
							<span> {elem.university}</span>
						</div>
					</div>
					<div className="border-r">
						<div className="level">
							<span> {elem.specialty.answer}</span>
						</div>
					</div>
					<div className="remove cursor-pointer items-end">
						<Icon icon="material-symbols:cancel" style={{color: 'red'}} onClick={()=>handleDelete(elem.id)} />
					</div>
				</div>
			))}
			<div className="w-full flex items-center justify-center mt-5">
				<button
					className="border p-2 rounded-full px-5 items-center bg-qss-input"
					onClick={ handleClick}
				>
					Yeni təhsil əlavə et +
				</button>
			</div>
		</div>
	);
}

export default Educations;
