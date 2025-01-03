import ImageWithFallback from "../../../../components/ImageWithFallback";
import { Modal } from "../../../../components/Modal";
import UserNameDisplay from "../../../../components/UserNameDisplay";
import { UserDTO } from "../../../../types/data.type";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: UserDTO[];
  title: "Followers" | "Followings";
};
export default function FollowModal({ isOpen, onClose, data, title }: Props) {
  return (
    <Modal
      className="flex justify-center items-center"
      isOpen={isOpen}
      onClose={onClose}
      content={
        <div className="w-80 h-72 bg-white p-4 rounded-lg justify-center items-center">
          <div className="text-md font-medium text-center">{title}</div>
          <div className="mt-4">
            <div className="flex flex-col gap-4">
              {data.map((user) => (
                <div key={user.id} className="flex flex-row items-center gap-4">
                  <ImageWithFallback
                    src={user.profileImage.url}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <UserNameDisplay
                    id={user.id}
                    username={user.userDisplayName}
                    className="text-sm font-medium"
                    onSideEffect={onClose}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
}
