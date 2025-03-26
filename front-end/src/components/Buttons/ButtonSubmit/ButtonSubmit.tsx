import "./ButtonSubmit.scss";

interface ButtonSubmitProps extends React.ComponentProps<"button"> {
  children?: React.ReactNode;
}

const ButtonSubmit = ({ children, ...rest }: ButtonSubmitProps) => {
  return (
    <button className="btnSubmit" {...rest}>
      {children}
    </button>
  );
};

export default ButtonSubmit;
