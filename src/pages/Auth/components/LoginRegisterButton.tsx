
interface ILoginRegisterButton {
    text: string,
    type?: btnType,
    buttonClassName: string | undefined
}

type btnType = "button" | "submit";

const LoginRegisterButton = ({ text, type, buttonClassName }: ILoginRegisterButton) => {
    return (
        <button type={type} className={`${buttonClassName} transition duration-500 border border-qss-primary hover:text-qss-primary hover:bg-white`} >
            {text}
        </button>
    )
}

export default LoginRegisterButton