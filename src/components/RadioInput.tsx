import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import { IAnswer, ISelectedValue } from "types";

interface IRadioProps {
  options?: IAnswer[];
  label?: string;
  register: any;
  value: ISelectedValue;
}

const Radio = ({ options, label, register, value }: IRadioProps) => {
  const [selected, setSelected] = useState(options?.[0]);

  return (
    <RadioGroup
      value={selected}
      onChange={(value) => {
        setSelected(value);
        console.log(value, selected);
        register.onChange({
          target: {
            name: register.name,
            value,
          },
        });
      }}
    >
      <RadioGroup.Label>{label}</RadioGroup.Label>
      <div className="flex gap-5 mt-2">
        {options?.map(({ id, answer_title, answer_weight }) => (
          <RadioGroup.Option
            key={id}
            value={{ answer: answer_title, weight: answer_weight }}
            className="bg-qss-input py-2 cursor-pointer w-full max-w-[142px] px-4 gap-1 justify-center items-center flex rounded-full"
          >
            <span
              className={`whitespace-nowrap relative flex flex-1 justify-center ${
                value?.answer === answer_title
                  ? "text-qss-secondary"
                  : "text-qss-inputText"
              }`}
            >
              {answer_title}
            </span>

            <div
              className={`w-2.5 h-2.5 outline rounded-full outline-qss-base-200 ${
                value?.answer === answer_title
                  ? "bg-qss-secondary"
                  : "bg-qss-background"
              }`}
            />
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default Radio;
