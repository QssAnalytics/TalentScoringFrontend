interface IInputProps {
  label?: string;
  type?: string;
  className?: any;
  placeholder?: string;
  labelClassName?: string;
  inputClassName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  value?: string;  
}

const TextInput = ({
  label,
  className,
  type = "text",
  placeholder,
  register, 
}: IInputProps) => {
  return (
    <div className="space-y-2">
      <label className="pl-2 inline-flex">{label}</label>
      <div className="w-full relative">
        <input
          className={className}
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
