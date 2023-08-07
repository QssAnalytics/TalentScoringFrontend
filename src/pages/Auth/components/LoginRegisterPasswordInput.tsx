import { useState } from "react";
import { Icon } from "@iconify/react";
interface ILoginRegisterPasswordInput {
    label?: string,
    icon: string,
    register?: any
    errors?: any,
    value?: string,
    name?: string,
    trigger?: any
}

const LoginRegisterPasswordInput = ({ label, icon, register, errors, value, name, trigger }: ILoginRegisterPasswordInput) => {
    const [inputPassValue, setInputPassValue] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleErrors = async () => {
        if (trigger(name) && value !== undefined) {
            setInputPassValue(value)
        }
    }

    return (
        <>
            <label className={`${errors ? 'text-red-500' : inputPassValue && !errors ? 'text-green-600' : "text-qss-primary"} w-full flex justify-center flex-col gap-1 `}>
                {label}
                <div className={` ${inputPassValue && !errors ? "border-green-600 focus-within:border-green-600" : errors ? "border-red-500 focus-within:border-red-500" : "border-gray-300 focus-within:border-qss-primary"} group w-full border-gray-300bg-transparent border rounded-3xl flex items-center gap-2 py-2 px-3 transition-all duration-900 `}>
                    < Icon icon={icon} className={`${inputPassValue && !errors ? "text-green-600 group-hover:border-green-600" : errors ? "text-red-500 group-hover:text-red-500" : "group-hover:text-qss-primary"}  text-gray-500 focus-within:border-qss-primary" text-lg transition duration-300`} />
                    <input className={`${inputPassValue && !errors ? "text-green-600" : "text-qss-primary"} ${errors && "text-red-500 group-hover:text-red-500"} w-full border-0 text-lg  bg-transparent focus:outline-none`} type={showPassword ? "" : "password"} autoComplete='off' {...register} onInput={handleErrors} />
                    <Icon icon={showPassword ? "iconamoon:eye-off" : 'iconamoon:eye'} onClick={() => { setShowPassword(!showPassword) }} className={`${inputPassValue && !errors ? "text-green-600" : "text-qss-primary"} ${errors && "text-red-500 group-hover:text-red-500"} group-hover:opacity-100 transition duration-900 text-2xl cursor-pointer opacity-0`} />
                </div>
            </label >
        </>
    );
}

export default LoginRegisterPasswordInput