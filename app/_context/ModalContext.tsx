"use client";
import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import {
  useCreateNewUserHabit,
  useDeleteHabit,
  useDeletePost,
  useDeleteUserAccount,
  useUserHabits,
} from "../_lib/_utils/queries";
import NewHabitBtn from "../_components/modals/NewHabitBtn";

type ModalName =
  | "delete-post"
  | "delete-habit"
  | "delete-account"
  | "new-habit"
  | "new-post";

type ArbitraryProps = Record<string, unknown>;

interface modalState {
  name: ModalName | null;
  props: ArbitraryProps;
}

interface ModalWrapperProps {
  children: ReactNode;
  onClose: () => void;
}

// This type is for what the context providers the children.
interface modalContextType {
  openModal: (name: ModalName, props?: ArbitraryProps) => void;
  closeModal: () => void;
}

interface modalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<modalContextType | undefined>(undefined);

// Wraps all of the modals and contains the closeModal func.
function ModalWrapper({ children, onClose }: ModalWrapperProps) {
  return createPortal(
    <div
      className="fixed inset-0 bg-dark-eighty flex justify-center items-center z-50 p-4 transition-opacity duration-300 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg sm:rounded-xl shadow-2xl max-w-[480px] w-full duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

interface DeletePostModalProps {
  postId?: string;
  postTitle?: string;
}

// Tsx for delete post modal.
function DeletePostModal({ postId, postTitle }: DeletePostModalProps) {
  const { closeModal } = useModal();
  const { mutate, isPending } = useDeletePost();
  const handleDelete = () => {
    mutate({ postId });
    closeModal();
  };
  return (
    <>
      <h2 className="text-2xl mb-4">Confirm Post Deletion</h2>
      <p className="text-grey mb-6">
        Are you sure you want to delete:{" "}
        <span className="font-semibold">{postTitle}</span>? This action cannot
        be undone.
      </p>
      <div className="flex gap-3">
        <button
          className="px-[18px] py-3 text-grey bg-transparent border border-grey rounded-full hover:bg-grey hover:text-light transition cursor-pointer"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="px-[18px] py-3 rounded-lg text-white bg-like-red hover:brightness-105 transition cursor-pointer"
          onClick={handleDelete}
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </>
  );
}

interface DeleteHabitModalProps {
  habitId?: string;
  category?: string;
}

function DeleteHabitModal({ habitId, category }: DeleteHabitModalProps) {
  const { closeModal } = useModal();
  const { mutate, isPending } = useDeleteHabit();
  const handleDelete = () => {
    mutate({ habitId });
    closeModal();
  };

  if (!category) return;
  let categoryStreak;
  if (category === "bedHygiene" || category === "sleepSchedule") {
    if (category === "sleepSchedule") categoryStreak = "Sleep";
    if (category === "bedHygiene") categoryStreak = "M.Y.B";
  } else {
    categoryStreak = category.charAt(0).toUpperCase() + category.slice(1);
  }

  return (
    <>
      <h2 className="text-2xl mb-4">Confirm Habit Deletion</h2>
      <p className="text-grey mb-6">
        Are you sure you want to delete your:{" "}
        <span className="font-semibold">{categoryStreak}</span> habit? All
        progress will be lost.
      </p>
      <div className="flex gap-3">
        <button
          className="px-[18px] py-3 text-grey bg-transparent border border-grey rounded-full hover:bg-grey hover:text-light transition cursor-pointer"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="px-[18px] py-3 rounded-lg text-white bg-like-red hover:brightness-105 transition cursor-pointer"
          onClick={handleDelete}
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </>
  );
}

interface DeleteUserAccountProps {
  user?: User;
}

function DeleteAccountModal({ user }: DeleteUserAccountProps) {
  const { closeModal } = useModal();
  const deleteUserAccount = useDeleteUserAccount();

  if (!user) return null;

  function handleDelete() {
    deleteUserAccount.mutate(undefined, {
      onSuccess: () => {
        closeModal();
      },
      onError: (error) => {
        console.error(error);
        toast.error("Error! Please try again.");
      },
    });
  }

  return (
    <>
      <h2 className="text-2xl mb-4">Delete Account</h2>
      <p className="text-grey mb-6">
        Are you sure you want to delete your account? This action cannot be
        reversed.
      </p>
      <div className="flex gap-3">
        <button
          className="px-[18px] py-3 text-grey bg-transparent border border-grey rounded-full hover:bg-grey hover:text-light transition cursor-pointer"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="px-[18px] py-3 rounded-lg text-white bg-like-red hover:brightness-105 transition cursor-pointer"
          onClick={() => handleDelete()}
        >
          Delete Account
        </button>
      </div>
    </>
  );
}

interface NewHabitModalProps {
  user?: User;
}

function NewHabitModal({ user }: NewHabitModalProps) {
  const modalBtns = [
    { label: "Fitness", category: "fitness" },
    { label: "Sleep Hygiene", category: "sleepSchedule" },
    { label: "Learning", category: "learning" },
    { label: "Reading", category: "reading" },
    { label: "Hydration", category: "hydration" },
    { label: "Bed Hygiene", category: "bedHygiene" },
    { label: "Eat Breakfast", category: "breakfast" },
    { label: "Writing", category: "writing" },
    { label: "Healthy Diet", category: "diet" },
  ];

  const { closeModal } = useModal();
  const [habitCategory, setHabitCategory] = useState("");
  const { habitsData } = useUserHabits();
  const habitCategories: string[] = [];
  habitsData?.map((el) => habitCategories.push(el.category));

  const createHabit = useCreateNewUserHabit();

  function handleClick() {
    createHabit.mutate({category: habitCategory})
    closeModal();
  }

  return (
    <>
      <h2 className="text-2xl mb-4">New Habit</h2>
      <p className="text-grey mb-4">Start by selecting the habit category.</p>
      {/* Habit category selection */}
      <div className="gap-3 flex flex-wrap mb-6 sm:gap-4">
        {modalBtns.map((btn) => (
          <NewHabitBtn
            key={btn.label}
            label={btn.label}
            category={btn.category}
            setHabitCategory={setHabitCategory}
            habitCategory={habitCategory}
            habitCategories={habitCategories}
          />
        ))}
      </div>
      {/* Btns */}
      <div className="flex gap-3">
        <button
          disabled={!habitCategory}
          className={`px-[18px] py-3 rounded-lg text-white bg-add-green hover:brightness-105 transition cursor-pointer disabled:bg-grey disabled:cursor-not-allowed`}
          onClick={handleClick}
        >
          Create Habit
        </button>
        <button
          className="px-[18px] py-3 text-grey bg-transparent border border-grey rounded-full hover:bg-grey hover:text-light transition cursor-pointer"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </>
  );
}

// To be done
function NewPostModal({ user }: NewHabitModalProps) {
  const { closeModal } = useModal();

  return (
    <>
      <h2 className="text-2xl mb-4">Delete Account</h2>
      <p className="text-grey mb-6">
        Are you sure you want to delete your account? This action cannot be
        reversed.
      </p>
      <div className="flex gap-3">
        <button
          className="px-[18px] py-3 text-grey bg-transparent border border-grey rounded-full hover:bg-grey hover:text-light transition cursor-pointer"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="px-[18px] py-3 rounded-lg text-white bg-like-red hover:brightness-105 transition cursor-pointer"
          onClick={() => console.log("New habit modal")}
        >
          Delete Account
        </button>
      </div>
    </>
  );
}

// Provider that wraps around app and provides the open and close modal funcs.
function ModalProvider({ children }: modalProviderProps) {
  const [modalState, setModalState] = useState<modalState>({
    name: null,
    props: {},
  });

  const openModal = (name: ModalName, props: ArbitraryProps = {}) => {
    setModalState({ name: name, props: props });
  };

  function closeModal() {
    setModalState({ name: null, props: {} });
  }

  const modalComponents = {
    "new-habit": NewHabitModal,
    "delete-habit": DeleteHabitModal,
    "new-post": NewPostModal,
    // "edit-post": EditPostModal,
    "delete-post": DeletePostModal,
    // comments: CommentsModal,
    // "delete-friend": DeleteFriendModal,
    "delete-account": DeleteAccountModal,
  };

  const ModalComponent = modalState.name
    ? modalComponents[modalState.name]
    : null;

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalState.name && ModalComponent && (
        <ModalWrapper onClose={closeModal}>
          <ModalComponent {...modalState.props} />
        </ModalWrapper>
      )}
    </ModalContext.Provider>
  );
}

// Check for if context is being used wrong.
function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("ModalContext was used outside ModalProvider");
  return context;
}

export { ModalProvider, useModal };
