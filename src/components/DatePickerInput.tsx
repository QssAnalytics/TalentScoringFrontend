import { useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import {
  getAllMonths,
  getDayForMonthly,
  getFromTodayYear,
} from "../utils/date";

type DatePickerInputType = {
  register: any;
};

const DatePickerInput = ({ register }: DatePickerInputType) => {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <div className="input-container">
      <label className="label">
        <span className="label-text">Doğum Tarixi</span>
        <div
          className="tooltip label-text"
          data-tip="Doğum tarixinizi düzgün qeyd etməniz xahiş olunur. Bu sizə daha düzgün nəticələr əldə etməyə köməklik göstərəcək"
        >
          <QuestionMarkCircleIcon className="w-5 h-5" />
        </div>
      </label>
      <div className="w-full justify-between flex gap-4">
        <div className="form-control w-full">
          <select
            className="w-full select select-bordered bg-white focus:border-primary focus:outline-none focus:ring-0 shadow-sm"
            id="day"
            value={selectedDay}
            onChange={(e) => setSelectedDay(Number(e.target.value))}
            {...register}
          >
            <option hidden value="0">
              Gün
            </option>
            {getDayForMonthly(selectedYear, selectedMonth).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control w-full">
          <select
            className="w-full select select-bordered bg-white focus:border-primary focus:outline-none focus:ring-0 shadow-sm"
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            {...register}
          >
            <option hidden value="0">
              Ay
            </option>
            {getAllMonths().map((d, i) => (
              <option key={i} value={i}>
                {d[i + 1]}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control w-full">
          <select
            className="w-full select select-bordered bg-white focus:border-primary focus:outline-none focus:ring-0 shadow-sm"
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            {...register}
          >
            <option hidden value="0">
              İl
            </option>
            {getFromTodayYear().map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DatePickerInput;
