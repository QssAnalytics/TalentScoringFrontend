interface IInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  labelClassName?: string;
  inputClassName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  value?: string;
  haveRadio?: boolean;
}

const TextInput = ({
  label,
  type = "text",
  placeholder,
  register,
  inputClassName
}: IInputProps) => {
  return (
    <div className={` space-y-2`}>
      <label className="pl-2 inline-flex">{label}</label>
      <div className="w-full relative">
        <input
          type={type}
          placeholder={placeholder}
          {...register}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default TextInput;
