import { useUserAvatar, useUserProfileById } from "@/app/_lib/_utils/queries";
import { DEFAULT_AVATAR_URL } from "@/app/_lib/constants";
import { post } from "@/app/_lib/interfaces/posts";
import { FaComment, FaCommentDots, FaHeart } from "react-icons/fa6";

interface PostChildrenProps {
  postData: post;
}

export default function PostBottom({ postData }: PostChildrenProps) {
  const { profileData, isLoading } = useUserProfileById(postData.user_id);
  const displayName = profileData?.display_name.split(" ")[0] || "User";

  function getAvatarImageSrc(url: string | null | undefined): string {
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
      return url;
    } else if (url && ["0", "1", "2", "3"].includes(url)) {
      return `/profile-pics/${url}.png`;
    } else if (url && url!.includes("profile-pics")) {
      return `${url}`;
    }
    return DEFAULT_AVATAR_URL;
  }

  const finalAvatarSrc = getAvatarImageSrc(profileData?.avatar_url);

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
        <button className="group duration-200 w-6 h-6 flex items-center justify-center relative active:scale-95">
          <FaCommentDots className="absolute w-6 h-6 opacity-100" />
          <FaComment className="absolute w-6 h-6 group-hover:opacity-0 transition-opacity" />
        </button>
        <div className="w-[1px] h-3 bg-light-fourty"></div>
        <button className="hover:scale-105 active:scale-95 duration-200 hover:text-like-red">
          <FaHeart className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
