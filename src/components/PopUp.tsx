import React, {useCallback} from 'react';
import img from '../assets/typcn_delete.jpg';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'redux';
import {addPop, addRemove} from 'state/dataSlice';
import {useSelector} from 'react-redux';
import {Fade} from 'react-awesome-reveal';
interface Pop {
	display: string;
}
interface RootState {
	dataa: {
		removeFunc: boolean;
	};
}
function PopUp({display}: Pop) {
	const dispatch: Dispatch = useDispatch();
	const remove = useSelector((state: RootState) => state.dataa.removeFunc);

	const handleClick = () => {
		dispatch(addPop(false));
		dispatch(addRemove(false));
	};
	const handleConfirm = useCallback(
		() => {
			dispatch(addRemove(true));
			dispatch(addPop(false));
		},
		[remove]
	);
	return (
		<div
			className={`fixed  top-[20px] right-[40%] rounded-3xl p-5 px-[30px] pb-[50px] bg-qss-white ${display} `}
			style={{zIndex: '99999'}}
		>
			{' '}
			<div className="flex justify-end cursor-pointer" onClick={handleClick}>
				<img src={img} alt="delete" />
			</div>
			<p className="flex justify-center mt-2 text-sm">Bu məlumatı silmək istədiyinizə əminsinizmi?</p>
			<div className="flex justify-center mt-5">
				<button
					className="bg-qss-secondary text-white py-2 px-[50px] rounded-full mr-[80px]"
					onClick={handleConfirm}
				>
					Bəli
				</button>
				<button onClick={handleClick}>Xeyr</button>
			</div>
		</div>
	);
}

export default PopUp;
