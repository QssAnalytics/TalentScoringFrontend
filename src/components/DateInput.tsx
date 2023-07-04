import React from 'react'
 import calendar from './Stages/JobExperience/images/Vector (2).png'
export interface IDateInputProps {
    label?: string;
    type?: string;
    placeholder?: string;
    register?: any;
}
const DateInput = ({ label, type, placeholder, register }: IDateInputProps) => {
    return (
        <div className="space-y-2 relative">
            <label className="pl-2 inline-flex">{label}</label>
            <div className="w-full relative">
                <input
                    type={type}
                    placeholder={placeholder}
                    {...register}
                    autoComplete="off"
                    className='"w-full'
                />
                <img src={calendar} alt="calendar" className='absolute top-2 right-4' />
            </div>
        </div>
    )
}

export default DateInput
