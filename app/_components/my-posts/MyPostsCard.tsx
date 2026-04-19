import { post } from "@/app/_lib/interfaces/posts";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import IconsAndStreak from "../common/IconsAndStreak";
import LikesAndComments from "../common/LikesAndComments";
import { useModal } from "@/app/_context/ModalContext";
import { usePostComments, usePostLikes } from "@/app/_lib/_utils/queries";

interface postCard {
  post: post;
}

function MyPostsCard({ post }: postCard) {
  const { category, title, content, milestone_streak, id } = post;

  const { postsComments } = usePostComments(id);
  const { postsLikes } = usePostLikes(id);

  const cardBorderColour: { [key: string]: string } = {
    fitness: "border-fitness-accent-sixteen",
    sleepSchedule: "border-sleepSchedule-accent-sixteen",
    learning: "border-learning-accent-sixteen",
    reading: "border-reading-accent-sixteen",
    hydration: "border-hydration-accent-sixteen",
    bedHygiene: "border-bedHygiene-accent-sixteen",
    breakfast: "border-breakfast-accent-sixteen",
    writing: "border-writing-accent-sixteen",
    diet: "border-diet-accent-sixteen",
  };

  const editBtnHoverColour: { [key: string]: string } = {
    fitness: "hover:text-fitness-accent",
    sleepSchedule: "hover:text-sleepSchedule-accent",
    learning: "hover:text-learning-accent",
    reading: "hover:text-reading-accent",
    hydration: "hover:text-hydration-accent",
    bedHygiene: "hover:text-bedHygiene-accent",
    breakfast: "hover:text-breakfast-accent",
    writing: "hover:text-writing-accent",
    diet: "hover:text-diet-accent",
  };

  const { openModal } = useModal();

  return (
    <div>
      <div
        className={`relative p-6 bg-light rounded-md border ${cardBorderColour[category]} text-center sm:grid sm:grid-cols-[auto_auto_1fr] sm:text-left sm:gap-6 break-words overflow-hidden`}
      >
        <IconsAndStreak
          category={category}
          milestone_streak={milestone_streak}
        />
        <div className="my-4 w-20 h-[1px] bg-dark-eight mx-auto sm:w-[1px] sm:h-full sm:my-auto"></div>
        {/* The lines below */}
        <div className="flex flex-col min-w-0">
          <h4 className="wrap-break-word">{title}</h4>
          <p className="text-xs pt-2 font-normal w-full hyphens-auto wrap-break-word">
            {content}
          </p>
        </div>
        {/* The lines above */}
        <button
          onClick={() => openModal("edit-post", { postId: id })}
          className={`${editBtnHoverColour[category]} absolute right-4 top-4 text-grey hover:scale-105 active:scale-95 duration-200 hover:cursor-pointer`}
        >
          <FaPencil className="w-6 h-6" />
        </button>
      </div>
      {/* Likes, comments, & delete */}
      <div className="pt-4 px-6 flex justify-between items-center">
        <LikesAndComments
          comments_count={postsComments.length}
          likes_count={postsLikes.length}
        />
        <button
          onClick={() =>
            openModal("delete-post", { postId: id, postTitle: title })
          }
          className="text-grey hover:scale-105 active:scale-95 duration-200 hover:cursor-pointer hover:text-like-red"
        >
          <FaTrashCan className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default MyPostsCard;
