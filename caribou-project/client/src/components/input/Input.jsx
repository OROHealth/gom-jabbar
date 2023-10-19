// styleSheet
import '@components/input/Input.scss';

const Input = (props) => {
  const { id, name, type, value, className, labelText, placeholder, handleChange, style } = props;

  return (
    <div className="form-row">
      {/* define the label if given  */}
      {labelText && (
        <label htmlFor={name} className="form-label">
          {labelText}
        </label>
      )}
      {/* define the input  */}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`'form-input' ${className}`}
        style={style}
        autoComplete="false"
      />
    </div>
  );
};

export default Input;
