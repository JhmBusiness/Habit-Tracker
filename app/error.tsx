// error.tsx can be placed in routes and catches all errors aside from layout.tsx and template.tsx. error.tsx is great for assigning a specific error message for a dashboard route, etc.
"use client";

import Link from "next/link";
import BackButton from "./_components/common/BackButton";

export const metadata = {
  title: "Error",
};

export default function Error() {
  return (
    <div className="p-4 h-dvh flex items-center justify-center">
      <div className="bg-white p-10 sm:p-20 w-fit h-fit mx-auto rounded-xl text-center max-w-[560px] flex flex-col gap-3 shadow-primary">
        <h1>
          Oh no, an <span className="text-primary-accent">Error!!!</span>
        </h1>
        <p className="leading-[1.5em]">
          There appears to have been an error. Please use the buttons to go
          back.
        </p>
        <div className="flex gap-4 w-full justify-center mt-2 flex-col sm:flex-row">
          <Link href="/app/dashboard">
            <button className="border border-primary-accent bg-primary-accent text-light flex items-center justify-center w-full sm:w-fit max-w-[400px] mx-auto gap-3 rounded-xl py-3 px-[18px] cursor-pointer hover:text-light duration-200 hover:bg-dark-blue">
              Go to home
            </button>
          </Link>
          <BackButton />
        </div>
      </div>
    </div>
  );
}
