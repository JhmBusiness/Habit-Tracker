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

  return (
    <div className="grid grid-cols-[auto_auto_1fr] p-6 gap-4">
      <IconsAndStreak category={category} milestone_streak={milestone_streak} />
      <div className="h-full w-[1px] bg-dark-sixteen"></div>
      <div className="flex flex-col">
        <h4>{title}</h4>
        <p className="text-xs pt-2 pb-3">{content}</p>
        <LikesAndComments
          likes_count={likes_count}
          comments_count={comments_count}
        />
      </div>
    </div>
  );
}

export default MostRecentPostContent;
