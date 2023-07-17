import { Fragment, useEffect, useState } from "react";
import { IAnswer } from "../types";
import { Listbox } from "@headlessui/react";
import { Icon } from "@iconify/react";
interface ISelect {
  label: string;
  options?: IAnswer[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  value?: string;
  disabled?: boolean;
}

const Select = ({
  label,
  options,
  register,
  value,
  disabled = false,
}: ISelect) => {
  const [selected, setSelected] = useState(value || options?.[0]?.answer_title);
  console.log(selected);
  const getAnswerId = (answerTitle: string) =>
    options?.find(({ answer_title }) => answerTitle === answer_title)?.id;

  useEffect(() => {
    value || setSelected(options?.[0]?.answer_title);
  }, [value, options]);

  return (
    <Listbox
      as="div"
      placeholder={selected}
      value={selected}
      className="flex flex-col gap-2 w-full"
      onChange={(value) => {
        setSelected(value);
        const curId = getAnswerId(value);
        register.onChange({
          target: {
            name: register.name,
            value: { id: curId, answer: value },
          },
        });
      }}
      disabled={disabled}
    >
      <Listbox.Label>{label}</Listbox.Label>
      <div className="w-full relative">
        <Listbox.Button as={Fragment}>
          {({ value: defaultVal, open }) => (
            <Listbox.Label
              className={`relative w-full text-left flex items-center border  bg-qss-input py-2 px-4 rounded-full outline-none ${
                open && "text-qss-secondary border border-qss-base-200"
              } ${value ? "text-qss-secondary" : "text-qss-base-300"} `}
            >
              {value || defaultVal}
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
        <Listbox.Options className="absolute z-10 min-h-full max-h-40 overflow-y-auto top-10 bg-qss-input ml-4 rounded w-full max-w-[245px] text-qss-inputText text-sm">
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

export default Select;
