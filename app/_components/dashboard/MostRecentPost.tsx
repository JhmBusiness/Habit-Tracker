import { post } from "@/app/_lib/interfaces/posts";
import DashCompTitle from "./DashCompTitle";
import MostRecentPostContent from "./MostRecentPostContent";

interface mostRecentPost {
  usersPost: post | undefined;
  loadingPost?: boolean;
}

function MostRecentPost({ usersPost }: mostRecentPost) {
  return (
    <div className="border border-dark-sixteen bg-white rounded-lg sm:order-7 xl:order-4 2xl:order-5 2xl:max-w-[452px] 2xl:flex-1 wrap-anywhere xl:col-span-2">
      <DashCompTitle>Most Recent Post</DashCompTitle>
      <MostRecentPostContent usersPost={usersPost} />
    </div>
  );
}

export default MostRecentPost;
