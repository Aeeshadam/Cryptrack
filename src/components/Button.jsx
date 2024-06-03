const Button = ({ children }) => {
  return (
    <button className="bg-primary text-2xl text-dark px-3 py-4 md:px-8 md:py-4 md:text-3xl ">
      <p className="font-medium">{children}</p>
    </button>
  );
};
export default Button;
