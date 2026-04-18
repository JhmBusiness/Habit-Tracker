import { childrenAndStyles } from "@/app/_lib/interfaces/childrenAndStyles";

export default function PostContainer({ children }: childrenAndStyles) {
  return (
    <article>
      <div className="flex flex-col gap-4 justify-center mx-auto sm:max-w-[480px] xl:max-w-full xl:min-w-[360px] xl:flex-auto">
        {children}
      </div>
    </article>
  );
}
