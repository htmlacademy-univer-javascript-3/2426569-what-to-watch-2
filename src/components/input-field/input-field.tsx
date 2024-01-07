interface InputFieldProps {
  type: string;
  classPrefix: string;
  placeholder: string;
  name: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  classPrefix,
  type,
  placeholder,
  name,
  id,
  value,
  onChange,
}: InputFieldProps) => (
  <div className={`${classPrefix}__field`}>
    <input
      className={`${classPrefix}__input`}
      type={type}
      placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
    />
    <label className={`${classPrefix}__label visually-hidden`} htmlFor={id}>
      {placeholder}
    </label>
  </div>
);
