import React, { useEffect } from "react";

interface IRadioProps {
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  value?: string | number;
  type?: string;
}

const Radio = ({ label, value, register, inputClassName, type = "default" }: IRadioProps) => {
  return (
    <label className={`${inputClassName} bg-qss-input cursor-pointer relative py-2 max-w-[142px] w-full justify-center items-center flex rounded-full px-4`}>
      <input
        className={`peer absolute cursor-pointer  ${
          type === "default"
            ? "right-3 appearance-none w-3 h-3 bg-white rounded-full checked:bg-qss-secondary border border-qss-base-200"
            : "appearance-none rounded-full checked:bg-qss-secondary w-full h-full"
        }`}
        type="radio"
        value={value}
        {...register}
      />
      <span
        className={`text-qss-inputText whitespace-nowrap relative ${
          type === "default"
            ? "peer-checked:text-qss-secondary"
            : "peer-checked:text-white"
        }`}
      >
        {label}
      </span>
    </label>
  );
};

export default Radio;
