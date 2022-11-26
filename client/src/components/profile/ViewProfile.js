import React, { useState, useRef } from "react";
import { socket, emitters } from "../../socket";
import UserProfile from "./UserProfile";
import FriendProfile from "./FriendProfile";
import ChangeNameModal from "./ChangeNameModal";
import ChangeAvatarModal from "./ChangeAvatarModal";

const ViewProfile = ({ userInfo }) => {
  const [userProfileState, setUserProfileState] = useState(true);
  const [friendsProfileState, setFriendsProfileState] = useState(false);
  const [friendProfile, setFriendProfile] = useState({});
  const [nameModal, setNameModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const avatarRef = useRef(userInfo.avatar);

  // * VIEW FRIEND'S PROFILE
  const changeProfileView = async (e) => {
    // await socket.emit("get-friend-data", { username: e.target.textContent });
    await emitters.getFriendData({ username: e.target.textContent })
    await socket.on("send-friend-data", (data) => {
      setFriendProfile(data[0]);
    });
    await setUserProfileState(false);
    await setFriendsProfileState(true);
  };

  // * EDIT USER INFO
  const submitChange = (e) => {
    e.preventDefault();
    if (e.target.username) {
      const user = {
        firebase_id: userInfo.firebase_id,
        username: e.target.username.value,
      };
      emitters.editUserInfo(user);
      setNameModal(false);
    } else {
      const user = {
        firebase_id: userInfo.firebase_id,
        avatar: avatarRef.current,
      };
      emitters.editUserInfo(user);
      setAvatarModal(false);
    }
  };

  // * REMOVE FRIEND
  const removeFriend = (name) => {
    let newFriendArray = [];
    userInfo.friends.map((friend) => {
      if (friend !== name) newFriendArray.push(friend);
    });
    userInfo.friends = newFriendArray;
    emitters.removeFriend(userInfo);
  };

  const returnToUserProfile = () => {
    setUserProfileState(true);
    setFriendsProfileState(false);
  };
  const changeName = () => {
    setNameModal(true);
  };
  const changeAvatar = () => {
    setAvatarModal(true);
  };

  return (
    <div>
      {userProfileState && !friendsProfileState && (
        <UserProfile
          changeProfileView={changeProfileView}
          removeFriend={removeFriend}
          userProfile={userInfo}
          changeName={changeName}
          changeAvatar={changeAvatar}
        />
      )}
      <ChangeNameModal
        nameModal={nameModal}
        setNameModal={() => setNameModal(false)}
        submitChange={submitChange}
      />
      <ChangeAvatarModal
        avatarModal={avatarModal}
        closeAvatarModal={() => setAvatarModal(false)}
        submitChange={submitChange}
        userAvatar={userInfo}
        avatarRef={avatarRef}
      />

      {!userProfileState && friendsProfileState && (
        <div>
          <FriendProfile
            changeProfileView={changeProfileView}
            friendProfile={friendProfile}
            returnToUserProfile={returnToUserProfile}
          />
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
