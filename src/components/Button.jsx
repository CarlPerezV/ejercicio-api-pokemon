import "../sass/Button.scss";

const Button = ({ icon, handleClick }) => {
  return (
    <div className="button__box">
      <button onClick={handleClick} className="button">
        {icon}
      </button>
      <div className="button__shadow"></div>
    </div>
  );
};

export default Button;
