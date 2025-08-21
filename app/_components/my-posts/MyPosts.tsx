"use client";
import {
  useUserHabitCompletionMilestonesToday,
  useUserHabits,
  useUserPosts,
} from "@/app/_lib/_utils/queries";
import { useEffect, useState } from "react";
import AccountTitle from "../common/AccountTitle";
import Spinner from "../common/Spinner";
import MyPostsCard from "./MyPostsCard";
import PostsFilter from "./PostsFilter";
import { useSearchParams } from "next/navigation";

function MyPosts() {
  const {
    milestoneCompletionsToday,
    loading: milestoneCompletionsTodayLoading,
  } = useUserHabitCompletionMilestonesToday();

  const { habitsData, loading: habitsLoading } = useUserHabits();
  const { postsData, loading: postsLoading } = useUserPosts();

  const loading =
    milestoneCompletionsTodayLoading || postsLoading || habitsLoading;

  const categoriesToFilter: string[] = [];
  postsData?.forEach((post) => categoriesToFilter.push(post.category));
  const uniqueCategories = [...new Set(categoriesToFilter)];

  const searchParams = useSearchParams();
  let postsToRender = postsData?.filter(
    (post) => post.category === searchParams.get("filterPosts")
  );
  if (searchParams.get("filterPosts") === "all") postsToRender = postsData;

  const [displayCount, setDisplayCount] = useState(2);
  const postsToDisplay = postsToRender?.slice(0, displayCount);
  function handleIncreaseDisplayCount() {
    setDisplayCount(displayCount + 2);
  }
  function handleDecreaseDisplayCount() {
    if (displayCount === 2) return;
    setDisplayCount(2);
  }

  useEffect(() => {
    setDisplayCount(2);
  }, [searchParams]);

  if (loading)
    return (
      <div className="p-6 bg-light rounded-md flex flex-col gap-20 justify-center items-center pb-20">
        <AccountTitle category="myPosts" disabled={true}>
          My Posts
        </AccountTitle>
        <Spinner />
      </div>
    );

  if (!habitsData) return;
  if (habitsData?.length === 0) return;

  return (
    <div className="p-6 bg-light rounded-md flex flex-col gap-6 justify-center">
      {/* Title, btn, para, filter */}
      <div>
        {milestoneCompletionsToday?.length === 0 ? (
          <AccountTitle category="myPosts" disabled={true}>
            My Posts
          </AccountTitle>
        ) : (
          <AccountTitle category="myPosts">My Posts</AccountTitle>
        )}
        {milestoneCompletionsToday?.length === 0 ? (
          <p className="sm:text-2xl pt-2 pb-4">
            You are able to create a new post when you reach your next
            milestone.
          </p>
        ) : (
          <p className="sm:text-2xl pt-2 pb-4">
            Well done for reaching your milestone! You are eligible to create a
            new post.
          </p>
        )}
        {uniqueCategories.length >= 2 && (
          <PostsFilter uniqueCategories={uniqueCategories} />
        )}
      </div>
      {/* Post Cards */}
      {postsToDisplay?.map((el) => (
        <MyPostsCard key={el.title} post={el} />
      ))}

      {!!postsToRender && postsToRender?.length >= 3 && (
        <>
          {displayCount >= postsToRender!.length ? (
            <button
              onClick={handleDecreaseDisplayCount}
              className="py-3 px-[18px] rounded-xl border border-dark hover:text-primary-accent hover:border-primary-accent duration-200 hover:cursor-pointer w-fit mx-auto"
            >
              Show Less
            </button>
          ) : (
            <button
              onClick={handleIncreaseDisplayCount}
              className="py-3 px-[18px] rounded-xl border border-dark hover:text-primary-accent hover:border-primary-accent duration-200 hover:cursor-pointer w-fit mx-auto"
            >
              Show More
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default MyPosts;
