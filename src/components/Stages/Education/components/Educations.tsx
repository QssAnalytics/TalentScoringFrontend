import React from 'react';
import {Icon} from '@iconify/react';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'redux';
import {addData, addElave} from 'state/dataSlice';

function Educations({formData,setValue}) {
	const dispatch: Dispatch = useDispatch();
	const handleClick = ()=>{
		dispatch(addElave(true))
		dispatch(addData(-1))
	}
    const handleDelete = (id: number) => {
        const copy = formData?.education?.filter(
          (x) => x.id !== id
          
        );
        setValue('education',copy)
    
        
      };
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
