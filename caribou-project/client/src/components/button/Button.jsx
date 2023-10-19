import './Button.scss';

const Button = (props) => {
  const { children, disabled, ...rest } = props;

  return (
    <button disabled={disabled} {...rest} className="button">
      {children}
    </button>
  );
};

export default Button;
