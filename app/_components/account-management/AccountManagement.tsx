"use client";
import { useAuth } from "@/app/_context/AuthContext";
import AccountTitle from "../common/AccountTitle";
import { useModal } from "@/app/_context/ModalContext";

export default function AccountManagement() {
  const { user, loading: authLoading, logout } = useAuth();
  const { openModal } = useModal();

  return (
    <div className="p-6 bg-light rounded-md flex flex-col gap-6 justify-center sm:gap-8">
      <AccountTitle>Account Management</AccountTitle>
      <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row">
        <button
          onClick={() => openModal("delete-account", { user })}
          disabled={authLoading}
          className="border bg-like-red border-like-red text-light px-[18px] py-3 rounded-xl  w-fit font-semibold duration-200 cursor-pointer hover:scale-105 active:scale-95"
        >
          Delete Account
        </button>
        <button
          onClick={logout}
          disabled={authLoading}
          className="border border-grey text-grey px-[18px] py-3 rounded-xl  w-fit font-semibold duration-200 cursor-pointer hover:scale-105 active:scale-95"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
