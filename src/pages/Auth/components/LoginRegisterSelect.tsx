import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Icon } from '@iconify/react'

interface ILoginRegisterSelect {
    label: string,
    options: Array<string>
    register?: any,
    defaultvalue?: string,
    value?: string,
    errors?: any
}

const LoginRegisterSelect = ({ options, label, register, defaultvalue, value, errors }: ILoginRegisterSelect) => {
    const [selected, setSelected] = useState("")
    return (
        <div className="">
            <Listbox value={selected}
                onChange={(value) => {
                    setSelected(value);
                    register.onChange(
                        {
                            target: {
                                name: register.name,
                                value,
                            },
                        }
                    );
                }}
            >
                <div className="relative mt-1">
                    <Listbox.Label className={`${errors ? "text-red-500" : selected ? "text-green-600" : "text-qss-primary"}`}>{label}</Listbox.Label>
                    <label className={`${errors ? "border-red-500 focus-within:border-red-500" : selected ? "border-green-600 focus-within:border-green-600" : ""}group w-full flex items-center gap-2 py-2 px-3 border border-gray-300 rounded-3xl`} >
                        <Icon
                            icon={`${selected === "Male" && selected ? "mdi:gender-male" : selected === "Female" && selected ? "mdi:gender-female" : "mdi:gender-male-female"}`}
                            className={`${errors ? "text-red-500" : selected ? "text-green-600" : "text-gray-400"} text-lg transition-all duration-900 group-hover:text-qss-primary`} />
                        <Listbox.Button className="relative w-full cursor-pointer text-left">
                            <span className={`block truncate ${errors ? "text-red-500" : selected ? "text-green-600" : "text-gray-400"}`}>{selected ? selected : defaultvalue}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <Icon
                                    width={"1.5rem"}
                                    className={`${errors ? "text-red-500" : selected ? "text-green-600" : "text-qss-primary"}`}
                                    icon="material-symbols:arrow-drop-down-rounded"
                                />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute top-20 left-0 border border-gray-300 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {options.map((option, idx) => (
                                    <Listbox.Option
                                        key={idx}
                                        className={({ active }) =>
                                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-qss-primary text-white' : 'text-qss-primary'
                                            }`
                                        }
                                        value={option}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {option}
                                                </span>
                                                {selected ? (
                                                    <span className={`absolute inset-y-0 left-0 flex items-center pl-3`}>
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </label>
                </div>
            </Listbox >
        </div >
    )
}

export default LoginRegisterSelect
