import LoginRegisterTextInput from "pages/Auth/components/LoginRegisterTextInput";
import TalentScore from 'assets/logo-second.svg'
import LoginRegisterButton from "pages/Auth/components/LoginRegisterButton";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import LoginRegisterPasswordInput from "pages/Auth/components/LoginRegisterPasswordInput";
import axios from "axios";

const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter the valid email"),
    password: Yup.string().required("Password is required").min(8, "Password length must be minimum 8 characters ").max(50)
})

const handleLogin = async (userData: object) => {
    const API_LOGIN_URL = "http://127.0.0.1:8000/login/"

    try {
        const response = await axios.post(API_LOGIN_URL, userData)
        console.log("Login Succesfully", response);

    } catch (error) {
        console.log(error);
    }
}

export type IloginFormValues = Yup.InferType<typeof LoginSchema>;

const LoginSection = () => {
    const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm<IloginFormValues>({
        resolver: yupResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const onSubmit: SubmitHandler<IloginFormValues> = data => {
        const sendedData = {
            email: data.email,
            password: data.password
        }

        handleLogin(sendedData)
    };
    return (
        <div className="px-20 py-16 bg-white w-6/12 flex flex-col gap-14 ">
            <div className="flex items-center justify-start gap-7 w-[405px]" >
                <img className="w-44" src={TalentScore} alt="Logo" />
                <h3 className="font-manrope text-2xl font-medium text-qss-primary">Welcome Back!</h3>
            </div>

            <div className=" gap-5 flex flex-col w-[405px]">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-1">
                        <LoginRegisterTextInput errors={errors.email} label="E-mail ünvanı" type="" icon="ion:person-outline" register={register("email")} value={watch('email')} trigger={trigger} name="email" />
                        <p className="text-red-500 leading-4">{errors.email ? errors.email.message : ""}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <LoginRegisterPasswordInput errors={errors.password} label="Şifrə" icon="material-symbols:lock-outline" register={register("password")} value={watch('password')} trigger={trigger} name="password" />
                        <p className="text-red-500 leading-4">{errors.password ? errors.password.message : ""}</p>
                    </div>

                    <LoginRegisterButton type="submit" buttonClassName="w-full bg-qss-primary rounded-3xl p-3 text-center text-white " text="Daxil ol" />
                </form>

                <p className="w-full text-end text-qss-primary font-normal cursor-pointer">Şifrənizi unutmusunuz?</p>
                <p className="text-center w-[405px]"> Hesabınız yoxdur? <Link to={'/register'} className='text-qss-primary'>Create an account</Link></p>
            </div>
        </div>
    );
}

export default LoginSection