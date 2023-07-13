import React from 'react'
 import calendar from '../assets/Vector (1).svg';
export interface IDateInputProps {
    label?: string;
    type?: string;
    placeholder?: string;
    register?: any;
    inputClassName?:string;
    disabled?:boolean;
}
const DateInput = ({ label, type, placeholder, register,inputClassName,disabled }: IDateInputProps) => {
    return (
        <div className={`relative w-full space-y-2 ${inputClassName}`}>
            <label className="pl-2 inline-flex">{label}</label>
            <div className="w-full relative">
                <input
                    type={type}
                    placeholder={placeholder}
                    {...register}
                    autoComplete="off"
                    className='"w-full'
                    disabled={disabled}
                />
                <img src={calendar} alt="calendar" className='absolute top-2 right-4' />
            </div>
        </div>
    )
}

export default DateInput
