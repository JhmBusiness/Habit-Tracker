import { FaCommentDots, FaHeart } from "react-icons/fa6";

interface likesAndComments {
  likes_count: number;
  comments_count: number;
}

function LikesAndComments({ likes_count, comments_count }: likesAndComments) {
  return (
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
  );
}

export default LikesAndComments;
