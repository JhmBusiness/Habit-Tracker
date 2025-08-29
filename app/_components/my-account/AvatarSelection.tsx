"use client";
import { profileData } from "@/app/_lib/interfaces/profile";
import { Dispatch, SetStateAction, useState } from "react";
import { FaXmark } from "react-icons/fa6";

interface changeAvatarInter {
  profileData: profileData | undefined;
  handleShowMenu: () => void;
  setShownAvatar: Dispatch<SetStateAction<string | undefined>>;
  selectedAvatar: string;
  setSelectedAvatar: Dispatch<SetStateAction<string>>;
}

const profilePics = ["0.png", "1.png", "2.png", "3.png"];

function AvatarSelection({
  profileData,
  handleShowMenu,
  setShownAvatar,
  selectedAvatar,
  setSelectedAvatar,
}: changeAvatarInter) {
  const demoPics = ["0", "1", "2", "3"];
  const originalAvatarURL = profileData?.original_avatar_url || "";

  function handleChangeAvatar(newPfp: string) {
    if (newPfp === selectedAvatar) return;
    if (newPfp.length === 5) {
      setSelectedAvatar(newPfp.slice(0, 1));
    } else {
      setSelectedAvatar(newPfp);
    }
    if (newPfp.length > 5) {
      setShownAvatar(newPfp);
    } else {
      setShownAvatar(`/profile-pics/${newPfp}`);
    }
  }

  return (
    <div className="flex flex-wrap min-w-[170px] max-w-[170px] gap-3 p-3 rounded-md rounded-tr-xs border border-dark-sixteen bg-white absolute left-22 -top-[22px] h-fit sm:min-w-[276px] sm:max-w-[276px]">
      {!demoPics.includes(originalAvatarURL) && (
        <img
          onClick={() => handleChangeAvatar(originalAvatarURL)}
          src={originalAvatarURL}
          className={`rounded-full w-10 h-10 ${
            selectedAvatar === originalAvatarURL
              ? "border border-primary-accent border-2 cursor-auto"
              : "cursor-pointer"
          }`}
        />
      )}
      {profilePics.map((pfp) => (
        <img
          onClick={() => handleChangeAvatar(pfp)}
          key={pfp}
          src={`/profile-pics/${pfp}`}
          className={`h-10 w-10 rounded-full ${
            pfp === selectedAvatar + ".png"
              ? "border border-primary-accent border-2 cursor-auto"
              : "cursor-pointer"
          }`}
        />
      ))}
      <FaXmark
        onClick={handleShowMenu}
        className="w-3 h-3 absolute top-1 right-1 text-grey cursor-pointer hover:text-like-red duration-200"
      />
    </div>
  );
}

export default AvatarSelection;
