"use client";
import { useModal } from "@/app/_context/ModalContext";
import { childrenAndStyles } from "@/app/_lib/interfaces/childrenAndStyles";
import { FaCirclePlus } from "react-icons/fa6";
import { LuCirclePlus } from "react-icons/lu";

interface AccountTitleInterface extends childrenAndStyles {
  category?: string;
  disabled?: boolean;
}

type modalType = "post-category-selection" | "new-habit";

function AccountTitle({ children, category, disabled }: AccountTitleInterface) {
  const { openModal } = useModal();
  
  if (category === "myHabits" || category === "myPosts") {
    let habitOrPost;
    let habitOrPostOnClickModal: modalType;
    if (category === "myHabits") {
      habitOrPost = "Habit";
      habitOrPostOnClickModal = "new-habit";
    } else {
      habitOrPost = "Post";
      habitOrPostOnClickModal = "post-category-selection";
    }
    return (
      <div className="flex items-center justify-between w-full">
        <h1>{children}</h1>
        <button
          className={`flex items-center gap-2 sm:hidden w-10 h-10 relative ${
            disabled === true ? "hover:cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={disabled}
          onClick={() => openModal(`${habitOrPostOnClickModal}`)}
        >
          <LuCirclePlus
            className={`${
              disabled
                ? "text-grey"
                : "text-add-green hover:scale-105 active:scale-95 hover:cursor-pointer"
            } w-full h-full  duration-200 `}
          />
        </button>
        <button className="hidden sm:flex items-center gap-2">
          <FaCirclePlus /> New {habitOrPost}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>{children}</h1>
    </div>
  );
}

export default AccountTitle;
