import { post } from "@/app/_lib/interfaces/posts";
import IconsAndStreak from "../common/IconsAndStreak";

interface PostChildrenProps {
  postData: post;
}

export default function PostTop({ postData }: PostChildrenProps) {
  return (
    <div className="bg-white rounded-3xl p-6 text-center wrap-anywhere sm:grid sm:grid-cols-[160px_auto_1fr] sm:pl-0">
      {/* Icons and streak */}
      <IconsAndStreak
        milestone_streak={postData.milestone_streak}
        category={postData.category}
        type="fyp"
      />
      {/* Hr */}
      <div className="h-[1px] w-20 bg-dark-eight mx-auto my-4 sm:w-[1px] sm:h-full sm:my-auto"></div>
      {/* Title & content */}
      <div className="sm:px-6 sm:my-auto">
        <h4 className="mb-2">{postData.title}</h4>
        <p>{postData.content}</p>
      </div>
    </div>
  );
}
