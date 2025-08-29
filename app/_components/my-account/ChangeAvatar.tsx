"use client";
import { FaPencil, FaXmark } from "react-icons/fa6";
import AvatarSelection from "./AvatarSelection";
import { useEffect, useState } from "react";
import { profileData } from "@/app/_lib/interfaces/profile";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

type Inputs = {
  username: string;
  avatarUrl: string;
};

interface changeAvatarInter {
  profileData: profileData | undefined;
  register: UseFormRegister<Inputs>;
  setValue: UseFormSetValue<Inputs>;
}

function ChangeAvatar({ profileData, register, setValue }: changeAvatarInter) {
  const [showMenu, setShowMenu] = useState(false);

  const [selectedAvatar, setSelectedAvatar] = useState(
    profileData?.avatar_url || ""
  );

  const demoPics = ["0", "1", "2", "3"];

  const profileUrl = demoPics.includes(profileData?.avatar_url || "")
    ? `/profile-pics/${profileData?.avatar_url}.png`
    : profileData?.avatar_url;

  const [shownAvatar, setShownAvatar] = useState(profileUrl);

  function handleShowMenu() {
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    setValue("avatarUrl", shownAvatar || "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [setValue, shownAvatar]);

  return (
    <div className="flex flex-col p-6 rounded-md border border-dark-sixteen bg-white text-center w-fit justify-center items-center min-w-[125px]">
      <input
        defaultValue={shownAvatar}
        {...register("avatarUrl")}
        className="hidden"
      />
      <h4>Avatar</h4>
      <div className="relative max-w-18 max-h-18 mt-2 mb-3">
        <div
          className="rounded-full overflow-hidden relative"
          onClick={handleShowMenu}
        >
          <img src={shownAvatar} />
          <div className="absolute w-18 h-18 hover:bg-dark-fourty top-0 duration-200 hover:cursor-pointer flex justify-center items-center opacity-0 hover:opacity-100">
            {showMenu ? (
              <FaXmark className="w-6 h-6 text-light" />
            ) : (
              <FaPencil className="w-4 h-4 text-light" />
            )}
          </div>
        </div>
        {showMenu && (
          <AvatarSelection
            profileData={profileData}
            handleShowMenu={handleShowMenu}
            setShownAvatar={setShownAvatar}
            selectedAvatar={selectedAvatar}
            setSelectedAvatar={setSelectedAvatar}
          />
        )}
      </div>
      <button
        onClick={handleShowMenu}
        type="button"
        className={`text-xs rounded-xl bg-grey duration-200 text-light py-2 px-3 hover:cursor-pointer ${
          showMenu ? "hover:bg-like-red" : "hover:bg-primary-accent"
        }`}
      >
        {showMenu ? "Close" : "Change"}
      </button>
    </div>
  );
}

export default ChangeAvatar;
