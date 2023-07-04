import { Fragment, useCallback, useEffect, useState } from "react";
import { IAnswer } from "../types";
import { Listbox } from "@headlessui/react";
import { Icon } from "@iconify/react";

interface ISelectMult {
  placeholder: string;
  label: string;
  options?: IAnswer[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  value?: string[];
}

const SelectMult = ({
  label,
  options,
  register,
  value,
  placeholder,
}: ISelectMult) => {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <Listbox
      multiple
      as="div"
      placeholder={"Rus Dili"}
      value={selected}
      className="flex flex-col gap-2"
      onChange={(value) => {
        setSelected(value);
        register.onChange({
          target: {
            name: register.name,
            value: value,
          },
        });
      }}
    >
      <Listbox.Label>{label}</Listbox.Label>
      <div className="w-full relative">
        <Listbox.Button as={Fragment}>
          {({ value, open }) => (
            <Listbox.Label
              className={`relative w-full text-left flex items-center text-qss-inputText bg-qss-input py-2 px-4 rounded-full outline-none ${
                open && "  text-qss-secondary border border-qss-base-200"
              }`}
            >
              <span
                className={`w-96 overflow-hidden whitespace-nowrap flex ${
                  value.length > 0 ? "text-qss-inputText" : "text-qss-base-300"
                }`}
              >
                {value.join(", ") || placeholder}
              </span>
              <span className={`absolute right-6 ${open && "rotate-180"}`}>
                <Icon
                  width={"1.5rem"}
                  className="text-qss-secondary"
                  icon="material-symbols:arrow-drop-down-rounded"
                />
              </span>
            </Listbox.Label>
          )}
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 top-10 bg-qss-input ml-4 rounded w-full max-w-[245px] text-qss-inputText text-sm">
          {options?.map(({ id, answer_title }) => (
            <Listbox.Option
              key={id}
              className="px-4 py-2.5 flex items-center justify-between group hover:bg-qss-base-400 cursor-pointer hover:text-qss-secondary hover:font-medium"
              value={answer_title}
            >
              {({ selected }) => (
                <>
                  <span
                    className={selected ? "text-qss-secondary font-medium" : ""}
                  >
                    {answer_title}
                  </span>
                  <span
                    className={`${
                      selected
                        ? "bg-qss-secondary"
                        : "opacity-0 group-hover:opacity-100 bg-white"
                    } w-3 h-3 inline-flex  rounded-full border border-qss-base-200`}
                  ></span>
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default SelectMult;
