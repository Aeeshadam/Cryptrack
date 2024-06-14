const Button = ({ children, onClick }) => {
  return (
    <button
      className="bg-primary text-2xl text-dark px-3 py-4 md:px-8 md:py-4 md:text-3xl hover:bg-opacity-90  transition-all duration-300"
      onClick={onClick}
    >
      <p className="font-medium">{children}</p>
    </button>
  );
};
export default Button;
