const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {text}
    </button>
  );
};

export default Button;
