import { useAuth } from "@/app/_context/AuthContext";
import { useModal } from "@/app/_context/ModalContext";
import { getAvatarImageSrc } from "@/app/_lib/_utils/actions";
import {
  useDeletePostLike,
  usePostLikes,
  useUserLikePost,
  useUserProfileById,
} from "@/app/_lib/_utils/queries";
import { post } from "@/app/_lib/interfaces/posts";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaComment, FaCommentDots, FaHeart } from "react-icons/fa6";

interface PostChildrenProps {
  postData: post;
}

export default function PostBottom({ postData }: PostChildrenProps) {
  const { profileData } = useUserProfileById(postData.user_id);
  const displayName = profileData?.display_name.split(" ")[0] || "User";
  const { mutate: likePost, isPending: pendingLike } = useUserLikePost();
  const { mutate: deleteLike, isPending: pendingDelete } = useDeletePostLike();
  const { user } = useAuth();
  const { postsLikes } = usePostLikes(postData.id);
  const hasLiked = postsLikes.some((like) => like.user_id === user?.id);
  const [animatingLike, setAnimatingLike] = useState(false);

  const { openModal } = useModal();

  const finalAvatarSrc = getAvatarImageSrc(profileData?.avatar_url);

  function handleClick() {
    setAnimatingLike(true);

    setTimeout(() => setAnimatingLike(false), 400);

    hasLiked
      ? deleteLike({ postId: postData.id })
      : likePost({ postId: postData.id });
  }

  return (
    <div className="px-6 flex items-center justify-between text-light">
      <div className="flex items-center gap-3">
        <img
          className="w-8 h-8 rounded-full"
          src={finalAvatarSrc}
          alt="Users profile picture"
        />
        <h4>
          {displayName.length > 10
            ? displayName.slice(0, 10) + "..."
            : displayName}
        </h4>
      </div>

      <div className="text-light flex items-center gap-4">
        <button
          className="group duration-200 w-6 h-6 flex items-center justify-center relative active:scale-95"
          onClick={() => openModal("comments", { postId: postData.id })}
        >
          <FaCommentDots className="absolute w-6 h-6 opacity-100" />
          <FaComment className="absolute w-6 h-6 group-hover:opacity-0 transition-opacity" />
        </button>
        <div className="w-[1px] h-3 bg-light-fourty"></div>
        <button
          className={`${hasLiked ? "text-like-red" : "hover:text-red-700"} hover:scale-110 active:scale-95 duration-200 disabled:cursor-not-allowed`}
          onClick={handleClick}
          disabled={pendingLike || pendingDelete}
        >
          <FaHeart className={`w-6 h-6`} />
        </button>
      </div>
    </div>
  );
}

// 1. Make comment modal
// 2. Add like function
