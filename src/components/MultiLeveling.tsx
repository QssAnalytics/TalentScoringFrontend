import { Fragment, useState } from "react";
import { IAnswer } from "../types";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface IMultiLeveling {
  placeholder: string;
  label: string;
  data?: IAnswer[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  value?: { id: number; name: string; level: string | number }[];
}

const MultiLeveling = ({ value, data, register }: IMultiLeveling) => {
  const [list] = useState(data || []);
  const [selected, setSelected] = useState(value);
  const [dropDown, setDropdown] = useState(false);

  const levels = [
    { id: 1, level: "A1" },
    { id: 2, level: "A2" },
    { id: 3, level: "B1" },
    { id: 4, level: "B2" },
    { id: 5, level: "C1" },
    { id: 6, level: "C2" },
  ];

  return (
    <Fragment>
      <div className="relative">
        <button
          className="w-full bg-qss-input py-2 flexCenter rounded-full gap-1"
          onClick={() => setDropdown(!dropDown)}
        >
          Əlavə et <PlusCircleIcon className="w-4 h-4" />
        </button>

        {dropDown && (
          <ul className="w-full p-4 absolute z-10 rounded-xl mt-2 space-y-2 bg-qss-input">
            {list.map(({ id, answer_title }) => (
              <li
                key={id}
                className="p-2 bg-white rounded-lg cursor-pointer"
                onClick={() => {
                  setDropdown(false);
                  setSelected((prev) =>
                    prev?.find((p) => p.name === answer_title)
                      ? prev
                      : prev && [
                          ...prev,
                          { id: id, name: answer_title, level: "" },
                        ]
                  );
                }}
              >
                {answer_title}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5">
          <ul className="space-y-5">
            {selected?.map(({ id, name }) => (
              <li key={id} className="flex justify-between gap-5">
                <div className="py-2 px-2 gap-1 rounded-full whitespace-nowrap bg-qss-input flex justify-center items-center w-36">
                  <span className="w-3/4 flex justify-center">{name}</span>
                  <XCircleIcon
                    onClick={() =>
                      setSelected(
                        (prev) =>
                          // eslint-disable-next-line no-unsafe-optional-chaining
                          prev && [...prev?.filter((p) => p.name !== name)]
                      )
                    }
                    className="w-5 h-5 text-red-400 cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {levels.map(({ id, level }) => (
                    <label
                      key={id}
                      className="bg-qss-input cursor-pointer relative py-2 max-w-[142px] w-full justify-center items-center flex rounded-full px-4"
                    >
                      <input
                        className={
                          "peer absolute cursor-pointer appearance-none rounded-full checked:bg-qss-secondary w-full h-full"
                        }
                        type="radio"
                        name={name}
                        value={level}
                        onChange={(e) => {
                          setSelected((prev) =>
                            prev?.map((p) =>
                              p.name === name
                                ? {
                                    id: p.id,
                                    name: p.name,
                                    level: e.target.value,
                                  }
                                : p
                            )
                          );

                          register?.onChange({
                            target: {
                              name: register.name,
                              value: selected,
                            },
                          });
                        }}
                      />
                      <span
                        className={
                          "text-qss-inputText whitespace-nowrap relative peer-checked:text-white"
                        }
                      >
                        {level}
                      </span>
                    </label>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default MultiLeveling;
