import {Link} from 'react-router-dom';
import {Icon} from '@iconify/react';

interface ILinkButton {
	label: string;
	type?: btnType;
	nav: navType;
	className: string;
	haveIcon?: boolean;
	disabled?: boolean;
	onClick?: () => void;
}

type btnType = 'outline';

type navType = {
	path: {slugName?: string; subSlugName?: string};
	state: {subStageName?: string; stageName?: string};
};

const LinkButton = ({disabled, label, type, nav, className, haveIcon = true, onClick}: ILinkButton) => {
	return (
		<Link
			to={`/stages/${nav.path.slugName}/${nav.path.subSlugName}`}
			state={{
				subStageName: nav.state.subStageName,
				stageName: nav.state.stageName
			}}
			className={className}
			onClick={onClick}
		>
			<button
				className={`w-[180px] flex rounded-full justify-center items-center py-3.5 gap-4 ${type === 'outline'
					? 'flex-row-reverse border border-qss-secondary text-qss-secondary bg-transparent'
					: 'bg-qss-secondary flex-row text-white'}`}
				disabled={disabled}
			>
				{label}
				{haveIcon && (
					<Icon
						icon="material-symbols:arrow-right-alt-rounded"
						className={type === 'outline' ? 'rotate-180' : 'rotate-0'}
						width="1.5rem"
					/>
				)}
			</button>
		</Link>
	);
};

export default LinkButton;
