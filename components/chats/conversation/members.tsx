import Link from "next/link";
import Image from "next/image";
import UserLoader from "../../layout/loader/UserContentLoader";
import { User } from "../../../interfaces/interface";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import decodeJWT from "../../../functions/decodeJWT";
import postRequest from "../../../functions/requests/postRequest";
import { toast } from "react-toastify";

const Members = ({ users }: { users: User[] }) => {
  const host = "https://alinavidi.ir/";
  const router = useRouter();

  const createChat = async (receiverId: string) => {
    const senderId = decodeJWT(getCookie("cookieToken").toString()).userId;
    const result = await postRequest(
      {
        receiverId: receiverId,
        senderId: senderId,
      },
      "api/chats/create",
      true
    );

    if (result?.status === 200) {
      router.push(`/user/chats/${result.data.chatId}`);
    } else toast.error(result.data.message);
  };

  return (
    <section className="user-list">
      {!users
        ? [1, 2, 3, 4, 5, 6, 7].map((elem, index) => {
            return (
              <div className="user profile-notif flex" key={index}>
                <UserLoader />
              </div>
            );
          })
        : null}
      {users?.map((user: User) => (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            createChat(user._id);
          }}
          key={user._id}
          className="user flex profile-notif"
        >
          <div className="flex user-info">
            <Image
              src={host + user.image}
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
              alt="user avatar"
            />

            <strong id="userId">{user.username} </strong>
            {user.verified ? (
              <div className="verify">
                <Image
                  src="/Images/verified (2).png"
                  alt="verify"
                  width={20}
                  height={20}
                />
              </div>
            ) : null}
          </div>
        </a>
      ))}
    </section>
  );
};

export default Members;
