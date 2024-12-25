import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ActionButton from "../../../components/ActionButton";
import ImageWithFallback from "../../../components/ImageWithFallback";
import Tabs, { Tab } from "../../../components/Tabs";
import { GlobalState } from "../../../data/global/global.slice";
import { useGetProfileDetailQuery } from "../../../data/profile/profile.api";
import { useAppSelector } from "../../../hooks/reduxHooks";
import PostTab from "./components/PostTab";
import SavedTab from "./components/SavedTab";
import TaggedTab from "./components/TaggedTab";

function ProfilePage() {
  const { userInfo }: GlobalState = useAppSelector((state) => state.global);

  const { id } = useParams<{ id: string }>();

  const { data: userDetailData } = useGetProfileDetailQuery(
    id || userInfo.userId,
    {
      skip: !id,
    }
  );

  const tabs: Tab[] = useMemo(() => {
    return [
      {
        label: "Posts",
        content: <PostTab />,
      },
      {
        label: "Saved",
        content: <SavedTab />,
      },
      {
        label: "Tagged",
        content: <TaggedTab />,
      },
    ];
  }, []);

  return (
    <div className="flex w-full h-full justify-center overflow-auto">
      <div className="max-w-5xl flex flex-col">
        <div className="flex flex-row justify-between gap-16 items-center mt-16 px-6">
          {userDetailData && (
            <ImageWithFallback
              className="w-36 h-36 rounded-full"
              alt="Profile"
              src={userDetailData.profileImage.url}
            />
          )}
          <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center gap-12">
              <div className="text-lg font-medium">
                @{userDetailData?.username}
              </div>
              {
                // Add ActionButton component here
                userDetailData?.id === userInfo.userId && (
                  <>
                    <ActionButton title="Edit Profile" onClick={() => {}} />
                    <ActionButton title="View Archive" onClick={() => {}} />
                  </>
                )
              }
            </div>
            <div className="flex flex-row gap-16 mt-4">
              <div className="flex flex-row gap-1">
                <span className="font-semibold">
                  {userDetailData?.postCount}
                </span>{" "}
                Posts
              </div>
              <div className="flex flex-row gap-1">
                <span className="font-semibold">
                  {userDetailData?.followerCount}
                </span>
                Followers
              </div>
              <div className="flex flex-row gap-1">
                <span className="font-semibold">
                  {userDetailData?.followingCount}
                </span>
                Followings
              </div>
            </div>
            {userDetailData && (
              <>
                <div className="font-medium text-lg mt-8">
                  {userDetailData.userDisplayName}
                </div>
                <div>{userDetailData.bio}</div>
              </>
            )}
          </div>
        </div>
        <div className="mt-16">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
