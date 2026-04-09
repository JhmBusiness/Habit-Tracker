"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="border border-dark flex items-center justify-center w-full sm:w-fit max-w-[400px] mx-auto gap-3 rounded-xl py-3 px-[18px] cursor-pointer hover:bg-primary-accent hover:text-light hover:border-primary-accent duration-200 sm:mx-0"
    >
      Go Back
    </button>
  );
}
