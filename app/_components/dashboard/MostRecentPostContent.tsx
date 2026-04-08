"use client";
import { post } from "@/app/_lib/interfaces/posts";
import IconsAndStreak from "../common/IconsAndStreak";
import LikesAndComments from "../common/LikesAndComments";

interface mostRecentPostContent {
  usersPost: post | undefined;
}

function MostRecentPostContent({ usersPost }: mostRecentPostContent) {
  if (!usersPost) return;

  const {
    milestone_streak,
    category,
    title,
    content,
    likes_count,
    comments_count,
  } = usersPost;

  const clipContent =
    content.length > 160 ? content.slice(0, 160) + "..." : content;

  return (
    <div className="grid grid-cols-[1fr_auto_3fr] p-6 gap-4 overflow-scroll">
      <IconsAndStreak
        category={category}
        milestone_streak={milestone_streak}
        type="msp"
      />
      <div className="h-full w-[1px] bg-dark-sixteen"></div>
      <div className="flex flex-col">
        <h4 className="max-h-6 overflow-hidden">{title}</h4>
        <p className="text-xs pt-2 pb-3">{clipContent}</p>
        <LikesAndComments
          likes_count={likes_count}
          comments_count={comments_count}
        />
      </div>
    </div>
  );
}

export default MostRecentPostContent;
