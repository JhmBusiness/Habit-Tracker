"use client";
import PostBottom from "@/app/_components/fyp/PostBottom";
import PostContainer from "@/app/_components/fyp/PostContainer";
import PostTop from "@/app/_components/fyp/PostTop";
import { useAllPublicPosts } from "@/app/_lib/_utils/queries";

export default function Page() {
  const { postsData, loading } = useAllPublicPosts();

  return (
    <div className="h-full">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="bg-bg-light px-20 py-15 rounded-lg md:rounded-xl">
            <h1 className="flex items-center gap-1 mb-2">
              Loading
              <span className="flex">
                <span className="animate-bounce [animation-delay:0ms]">.</span>
                <span className="animate-bounce [animation-delay:150ms]">
                  .
                </span>
                <span className="animate-bounce [animation-delay:300ms]">
                  .
                </span>
              </span>
            </h1>
            <div className="h-1 bg-gray-100 overflow-hidden rounded-full">
              <div className="h-full bg-gradient-to-r from-light-blue to-primary-accent animate-[slide_1.6s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pb-[102px] sm:pb-[78px] md:pb-0 columns-1 xl:columns-2 space-y-6 xl:gap-10">
          {postsData.map((post) => (
            <div key={post.id} className="break-inside-avoid mb-6 xl:mb-10">
              <PostContainer>
                <PostTop postData={post} />
                <PostBottom postData={post} />
              </PostContainer>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
