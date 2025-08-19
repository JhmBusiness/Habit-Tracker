"use client";
import { useUserHabitCompletionMilestonesToday } from "@/app/_lib/_utils/queries";
import AccountTitle from "../common/AccountTitle";
import Spinner from "../common/Spinner";

function MyPosts() {
  const { milestoneCompletionsToday, loading } =
    useUserHabitCompletionMilestonesToday();
  if (loading)
    return (
      <div className="p-6 bg-light rounded-md flex flex-col gap-20 justify-center items-center pb-20">
        <AccountTitle category="myPosts" disabled={true}>
          My Posts
        </AccountTitle>
        <Spinner />
      </div>
    );

  return (
    <div className="p-6 bg-light rounded-md flex flex-col gap-6 justify-center">
      {/* Title and btn */}
      <div>
        {milestoneCompletionsToday?.length === 0 ? (
          <AccountTitle category="myPosts" disabled={true}>
            My Posts
          </AccountTitle>
        ) : (
          <AccountTitle category="myPosts">My Posts</AccountTitle>
        )}
        {milestoneCompletionsToday?.length === 0 ? (
          <p className="sm:text-2xl pt-2">
            You are able to create a new post when you reach your next
            milestone.
          </p>
        ) : (
          <p className="sm:text-2xl pt-2">
            Well done for reaching your milestone! You are eligible to create a
            new post.
          </p>
        )}
      </div>
      {/* Filter */}
      {/* Post Cards */}
    </div>
  );
}

export default MyPosts;
