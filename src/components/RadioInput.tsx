interface IRadioProps {
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  value?: string | number;
}

const Radio = ({ label, value, register }: IRadioProps) => (
  <label className="bg-qss-input cursor-pointer relative py-2 max-w-[142px] w-full justify-center items-center flex rounded-full px-4">
    <input
      className="peer absolute right-3"
      type="radio"
      value={value}
      {...register}
    />
    <span className="text-qss-inputText peer-checked:text-qss-secondary">
      {label}
    </span>
  </label>
);

export default Radio;
