import { formatTimeAgo, getAvatarImageSrc } from "@/app/_lib/_utils/actions";
import { useUserProfileById } from "@/app/_lib/_utils/queries";
import { commentTop } from "@/app/_lib/interfaces/comments";

export default function PreviousComments({
  created_at,
  userId,
  content,
}: commentTop) {
  const { profileData, isLoading } = useUserProfileById(userId);
  const userAvatar = getAvatarImageSrc(profileData?.avatar_url);

  return (
    <div className="flex flex-col gap-4 px-4">
      {isLoading ? (
        <div className="animate-pulse flex gap-2 items-center">
          <div className="rounded-full bg-dark-fourty w-10 h-10"></div>
          <div>
            <div className="h-4 w-24 bg-dark-fourty rounded mb-1"></div>
            <div className="h-3 w-16 bg-dark-fourty rounded"></div>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <img
            src={userAvatar}
            alt="Commenter's avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h4>
              {profileData?.display_name
                ? profileData.display_name.length > 10
                  ? profileData.display_name.slice(0, 10) + "..."
                  : profileData.display_name
                : "Unknown user"}
            </h4>

            <p className="text-xs">{formatTimeAgo(`${created_at}`)}</p>
          </div>
        </div>
      )}
      <p>{content}</p>
    </div>
  );
}
