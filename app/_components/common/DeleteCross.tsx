import { FaXmark } from "react-icons/fa6";

interface deleteCrossInterface {
  handleClick: () => void;
}

function DeleteCross({ handleClick }: deleteCrossInterface) {
  return (
    <button
      className="absolute right-2 top-2 cursor-pointer"
      onClick={handleClick}
    >
      <FaXmark className="w-3 h-3 hover:text-like-red duration-200" />
    </button>
  );
}

export default DeleteCross;
