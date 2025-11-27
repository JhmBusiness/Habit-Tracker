import { post } from "@/app/_lib/interfaces/posts";
import Spinner from "../common/Spinner";
import DashCompTitle from "./DashCompTitle";
import MostRecentPostContent from "./MostRecentPostContent";

interface mostRecentPost {
  usersPost: post | undefined;
  loadingPost: boolean;
}

function MostRecentPost({ usersPost, loadingPost }: mostRecentPost) {
  if (loadingPost)
    return (
      <div className="border border-dark-sixteen bg-white rounded-lg sm:order-7 xl:order-4 2xl:order-5">
        <DashCompTitle>Most Recent Post</DashCompTitle>
        <div className="flex justify-center items-center h-[160px]">
          <Spinner />
        </div>
      </div>
    );

  return (
    <div className="border border-dark-sixteen bg-white rounded-lg sm:order-7 xl:order-4 2xl:order-5">
      <DashCompTitle>Most Recent Post</DashCompTitle>
      <MostRecentPostContent usersPost={usersPost} />
    </div>
  );
}

export default MostRecentPost;
