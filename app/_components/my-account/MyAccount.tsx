"use client";
import { useUserProfile } from "@/app/_lib/_utils/queries";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa6";
import AccountTitle from "../common/AccountTitle";
import FormRow from "../common/FormRow";
import LoadingSection from "../common/LoadingSection";
import ChangeAvatar from "./ChangeAvatar";
import FormBtns from "../common/FormBtns";

type Inputs = {
  username: string;
  avatarUrl: string;
};

function MyAccount() {
  // Copy User Id
  const { profileData, loading } = useUserProfile();
  const userIdRef = useRef<null | HTMLInputElement>(null);
  function handleCopyText() {
    if (!userIdRef?.current?.value) return;
    navigator.clipboard.writeText(userIdRef?.current?.value);
    toast.success("Copied User ID to Clipboard");
  }

  // React Form State
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
      />
      <FormRow label="Username">
        <input
          defaultValue={profileData?.username}
          {...register("username")}
          disabled={isSubmitting}
          className="border border-dark-sixteen rounded-sm bg-white py-3 px-[18px] w-full mt-2"
        />
      </FormRow>
      <FormRow label="User ID" labelPtTwo="Copy ID">
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
      <FormBtns type="default" isSubmitting={isSubmitting} />
    </form>
  );
}

export default MyAccount;
