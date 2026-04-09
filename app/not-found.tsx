import Link from "next/link";
import BackButton from "./_components/common/BackButton";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="p-4 h-dvh flex items-center justify-center">
      <div className="bg-white p-10 sm:p-20 w-fit h-fit mx-auto rounded-xl text-center max-w-[560px] flex flex-col gap-3 shadow-primary">
        <h1>
          Page <span className="text-primary-accent">NOT</span> Found!
        </h1>
        <p className="leading-[1.5em]">
          We couldn&apos;t find you page you were looking for. Use the buttons
          below to go back.
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
