"use client";
import { profileData } from "@/app/_lib/interfaces/profile";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FaPencil, FaXmark } from "react-icons/fa6";
import AvatarSelection from "./AvatarSelection";

type Inputs = {
  username: string;
  avatarUrl: string;
};

interface changeAvatarInter {
  profileData: profileData | undefined;
  register: UseFormRegister<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  shownAvatar: string | undefined;
  setShownAvatar: Dispatch<SetStateAction<string | undefined>>;
  selectedAvatar: string | undefined;
  setSelectedAvatar: Dispatch<SetStateAction<string | undefined>>;
  handleShowMenu: () => void;
  showMenu: boolean;
}

function ChangeAvatar({
  profileData,
  register,
  setValue,
  shownAvatar,
  setShownAvatar,
  selectedAvatar,
  setSelectedAvatar,
  handleShowMenu,
  showMenu,
}: changeAvatarInter) {
  const demoPics = ["0", "1", "2", "3"];
  const profileUrl = demoPics.includes(profileData?.avatar_url || "")
    ? `/profile-pics/${profileData?.avatar_url}.png`
    : profileData?.avatar_url;

  useEffect(() => {
    setValue("avatarUrl", shownAvatar! || profileUrl!, {
      shouldValidate: true,
    });
  }, [setValue, shownAvatar, profileUrl]);

  useEffect(() => {
    setSelectedAvatar(profileData?.avatar_url);
  }, [profileData, setSelectedAvatar]);

  return (
    <div className="flex flex-col p-6 rounded-md border border-dark-sixteen bg-white text-center w-fit justify-center items-center min-w-[125px]">
      <input
        defaultValue={shownAvatar || profileUrl}
        {...register("avatarUrl")}
        className="hidden"
      />
      <h4>Avatar</h4>
      <div className="relative max-w-18 max-h-18 mt-2 mb-3">
        <div
          className="rounded-full overflow-hidden relative"
          onClick={() => handleShowMenu()}
        >
          <img src={shownAvatar || profileUrl} />
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
        onClick={() => handleShowMenu()}
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
