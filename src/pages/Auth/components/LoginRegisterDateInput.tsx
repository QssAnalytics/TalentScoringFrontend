import { useCallback, useEffect, useState } from "react";
import {
    getAllMonths,
    getDayForMonthly,
    getFromTodayYear,
} from "../../../helper/date";

type LoginRegisterDatePickerInputType = {
    register: any;
    label?: string,
    errors?: any
    onchange?: any,
    trigger?: any,
    reset?: any
    day?: string,
    month?: string,
    year?: string
};


const LoginRegisterDatePickerInput = ({ register, label, errors, trigger, day, month, year, reset }: LoginRegisterDatePickerInputType) => {
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [correctDay, setCorrectDay] = useState(false)
    const [correctMonth, setCorrectMonth] = useState(false)
    const [correctYear, setCorrectYear] = useState(false)
    const [forRender, setForRender] = useState(false)

    useEffect(() => {
        setForRender(true)
    }, [])

    const handleError = async (date: string) => {
        if (await trigger(date)) {
            if (date === "day") {
                setCorrectDay(true)
            } else if
                (date === "month") {
                setCorrectMonth(true)
            } else {
                setCorrectYear(true)
            }
        }
    }

    const handleDateError = useCallback(() => {
        if (selectedDay > getDayForMonthly(selectedYear, selectedMonth).length) {
            setCorrectDay(false)
            setCorrectMonth(false)
            setCorrectYear(false)
            setSelectedDay(0)
            setSelectedMonth(0)
            setSelectedYear(0)
            reset({
                day: "",
                month: "",
                year: ""
            })
        }
    }, [selectedDay, selectedMonth, selectedYear])
    return (
        <div className="input-container">
            <label className="label">
                <span className={`${errors.day ? "text-red-500" : correctDay ? "text-green-600 focus:text-green-600" : "text-qss-primary"} label-text`} >{label}</span>
                <div
                    className=" text-qss-primary tooltip label-text"
                >
                </div>
            </label>
            <div className="w-full justify-between flex gap-4">
                <div className="form-control w-full">
                    <select
                        className={`${errors.day ? "border-red-500 focus:border-red-500 text-red-500" : correctDay ? "border-green-600 focus:border-green-600 text-green-600" : "border-gray-300 focus:border-qss-primary"}  cursor-pointer transition-all duration-200  w-full  select-bordered border  bg-white focus:outline-none focus:ring-0 `}
                        id="day"
                        value={selectedDay}
                        {...register('day')}
                        onChange={(e) => {
                            setSelectedDay(Number(e.target.value))
                            register('day').onChange(e)
                        }}
                        onBlur={() => { handleError('day') }}
                        onSelect={handleDateError()}

                    >
                        <option className={`"text-qss-primary" `} hidden value="0">
                            Gün
                        </option>
                        {getDayForMonthly(selectedYear, selectedMonth).map((d) => {
                            return (
                                <option className={`text-qss-primary`} key={d} value={d}>
                                    {d}
                                </option>
                            )
                        })}

                    </select>
                </div>

                <div className="form-control w-full">
                    <select
                        className={`${errors.month ? "text-red-500 border-red-500 focus:border-red-500" : correctMonth ? "border-green-600 focus:border-green-600 text-green-600" : "border-gray-300 focus:border-qss-primary"} cursor-pointer transition-all duration-200 w-full select select-bordered border border-gray-300 bg-white focus:outline-none focus:ring-0 shadow-sm`}
                        value={selectedMonth}
                        id="month"
                        {...register('month')}
                        onChange={(e) => {
                            setSelectedMonth(Number(e.target.value))
                            register('month').onChange(e)

                        }}
                        onBlur={() => { handleError('month'); handleDateError() }}
                    >
                        <option className="text-qss-primary" hidden value="0">
                            Ay
                        </option>
                        {getAllMonths().map((d, i) => {
                            return (
                                <option className="text-qss-primary" key={i + 1} value={i + 1}>
                                    {d[i + 1]}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className="text-qss-primary form-control w-full">
                    <select
                        className={`${errors.year ? "border-red-500 focus:border-red-500 text-red-500" : correctYear ? "border-green-600 focus:border-green-600 text-green-600" : "text-qss-primary border-gray-300 focus:border-qss-primary"} w-full cursor-pointer transition-all duration-200  select select-bordered border border-gray-300 bg-white focus:outline-none focus:ring-0 shadow-sm`}
                        id="year"
                        value={selectedYear}
                        {...register('year')}
                        onChange={(e) => {
                            setSelectedYear(Number(e.target.value))
                            register('year').onChange(e)
                        }}
                        onBlur={() => { handleError('year') }}
                        onMouseLeave={handleDateError()}

                    >
                        <option className={`text-qss-primary`} hidden value="0">
                            İl
                        </option>
                        {getFromTodayYear().map((d) => (
                            <option className="text-qss-primary" key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div >
    );
};

export default LoginRegisterDatePickerInput;
