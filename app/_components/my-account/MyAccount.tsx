"use client";
import {
  useUpdateUserProfile,
  useUserProfile,
} from "@/app/_lib/_utils/queries";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa6";
import AccountTitle from "../common/AccountTitle";
import FormBtns from "../common/FormBtns";
import FormRow from "../common/FormRow";
import LoadingSection from "../common/LoadingSection";
import ChangeAvatar from "./ChangeAvatar";

export type Inputs = {
  username: string;
  avatarUrl: string;
};

function MyAccount() {
  const { profileData, loading } = useUserProfile();
  const userIdRef = useRef<null | HTMLInputElement>(null);
  function handleCopyText() {
    if (!userIdRef?.current?.value) return;
    navigator.clipboard.writeText(userIdRef?.current?.value);
    toast.success("Copied User ID to Clipboard");
  }

  const initialData = {
    displayName: profileData?.display_name,
    avatarUrl: profileData?.avatar_url,
  };

  // React Form State
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      avatarUrl: "",
    },
  });
  const { updateSetting } = useUpdateUserProfile();
  const onSubmit: SubmitHandler<Inputs> = (data) => updateSetting(data);

  const demoPics = ["0", "1", "2", "3"];

  const profileUrl = demoPics.includes(profileData?.avatar_url || "")
    ? `/profile-pics/${profileData?.avatar_url}.png`
    : profileData?.avatar_url;

  const [shownAvatar, setShownAvatar] = useState(profileUrl);
  const [selectedAvatar, setSelectedAvatar] = useState(profileData?.avatar_url);
  const [showMenu, setShowMenu] = useState(false);
  const pfpHasChanged = initialData.avatarUrl !== selectedAvatar;
  function handleShowMenu() {
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    if (profileData) {
      reset({
        username: profileData.display_name,
        avatarUrl: profileData.avatar_url,
      });
    }
  }, [profileData, reset]);

  function handleReset() {
    try {
      reset({
        username: initialData.displayName,
        avatarUrl: initialData.avatarUrl,
      });
      setShownAvatar(profileData?.avatar_url || "");
      setSelectedAvatar(profileData?.avatar_url || "");
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) return <LoadingSection title="My Account" />;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-light rounded-md flex flex-col gap-6 justify-center"
    >
      <AccountTitle>My Account</AccountTitle>
      <ChangeAvatar
        profileData={profileData}
        register={register}
        setValue={setValue}
        shownAvatar={shownAvatar}
        setShownAvatar={setShownAvatar}
        selectedAvatar={selectedAvatar}
        setSelectedAvatar={setSelectedAvatar}
        handleShowMenu={handleShowMenu}
        showMenu={showMenu}
      />
      <FormRow label="Username">
        <input
          id="username"
          type="text"
          {...register("username")}
          disabled={isSubmitting}
          className="border border-dark-sixteen rounded-sm bg-white py-3 px-[18px] w-full mt-2 placeholder:text-dark"
        />
      </FormRow>
      <FormRow
        label="User ID"
        labelPtTwo="Copy ID"
        handleCopyText={handleCopyText}
      >
        <div
          className="border border-dark-sixteen rounded-sm bg-white py-3
          px-[18px] w-full mt-2 font-paragraph placeholder:text-dark overflow-hidden relative"
        >
          <input
            id="userId"
            className="whitespace-nowrap w-full"
            readOnly
            value={profileData?.id}
            ref={userIdRef}
          />
          <button
            type="button"
            onClick={handleCopyText}
            data-copy
            className="absolute h-full right-0 w-[52px] bg-gradient-to-r from-[#ffffffCC] to-white top-0"
          >
            <FaCopy className="absolute right-[18px] h-full top-0 z-10 text-grey hover:cursor-pointer hover:text-primary-accent duration-200 hover:scale-105 active:scale-95" />
          </button>
        </div>
      </FormRow>
      <FormBtns
        type="default"
        isSubmitting={isSubmitting}
        reset={handleReset}
        initialData={initialData}
        setShowMenu={setShowMenu}
        showMenu={showMenu}
        isDirty={isDirty}
        pfpHasChanged={pfpHasChanged}
      />
    </form>
  );
}

export default MyAccount;
