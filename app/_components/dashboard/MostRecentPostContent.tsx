"use client";
import { post } from "@/app/_lib/interfaces/posts";
import { FaCommentDots, FaHeart } from "react-icons/fa6";
import IconsAndStreak from "../common/IconsAndStreak";

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

  return (
    <div className="grid grid-cols-[auto_auto_1fr] p-6 gap-4">
      <IconsAndStreak category={category} milestone_streak={milestone_streak} />
      <div className="h-full w-[1px] bg-dark-sixteen"></div>
      <div className="flex flex-col">
        <h4>{title}</h4>
        <p className="text-xs pt-2 pb-3">{content}</p>
        <div className="flex gap-4">
          <span className="flex gap-2 items-center">
            <FaHeart className="text-like-red w-5 h-5" />
            {likes_count}
          </span>
          <span className="flex gap-2 items-center">
            <FaCommentDots className="text-grey w-5 h-5" />
            {comments_count}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MostRecentPostContent;
