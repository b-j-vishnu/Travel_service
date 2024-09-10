const InputBox = ({
  label,
  type,
  placeholder,
  labelClassName,
  inputWidth,
  className,
  value,
  name,
}) => {
  return (
    <div className={`${inputWidth} flex flex-col`}>
      <label className={`${labelClassName} roboto-semibold  text-sm mb-2`}>
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
};

export default InputBox;
