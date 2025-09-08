import { UseFormReset } from "react-hook-form";
import { Inputs } from "../my-account/MyAccount";
import { Dispatch, SetStateAction } from "react";

interface formBtns {
  type: string;
  isSubmitting: boolean;
  reset: UseFormReset<Inputs>;
  initialData: {
    avatarUrl: string | undefined;
  };
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  showMenu: boolean;
  isDirty: boolean;
  pfpHasChanged: boolean;
}

function FormBtns({
  type,
  isSubmitting,
  reset,
  initialData,
  setShowMenu,
  showMenu,
  isDirty,
  pfpHasChanged,
}: formBtns) {
  const isDisabled = isSubmitting || (!isDirty && !pfpHasChanged);

  function closeMenuIfOpen() {
    if (showMenu === true) {
      setShowMenu(!showMenu);
    }
    return;
  }

  //   if (type === "delete")
  //   if (type === "manageFriends")
  if (type === "default")
    return (
      <div className="flex flex-col gap-4">
        <button
          type="submit"
          onClick={() => closeMenuIfOpen()}
          className={`px-[18px] py-3 rounded-xl  text-light w-fit font-semibold  duration-200 ${
            isDisabled
              ? "bg-grey cursor-not-allowed"
              : "bg-add-green hover:scale-105 active:scale-95 hover:cursor-pointer"
          }`}
          disabled={isDisabled}
        >
          {!isSubmitting ? "Save Changes" : "Saving..."}
        </button>
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => {
            console.log(!isDirty && !pfpHasChanged);
            reset({
              username: "",
              avatarUrl: initialData.avatarUrl,
            });
            closeMenuIfOpen();
            console.log(isDirty);
          }}
          className={`px-[18px] py-3 rounded-xl  w-fit font-semibold  duration-200 ${
            isDisabled
              ? "border border-grey text-grey cursor-not-allowed"
              : "hover:scale-105 active:scale-95 hover:cursor-pointer border border-dark"
          }`}
        >
          Cancel
        </button>
      </div>
    );
}

export default FormBtns;
