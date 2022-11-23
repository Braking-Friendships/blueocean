import React, { useState, useRef } from 'react';
import { socket, emitters } from '../../socket';
import UserProfile from './UserProfile';
import FriendProfile from './FriendProfile';
import ChangeNameModal from './ChangeNameModal';
import ChangeAvatarModal from './ChangeAvatarModal';

const ViewProfile = ({ userInfo }) => {
  const [userProfileState, setUserProfileState] = useState(true);
  const [friendsProfileState, setFriendsProfileState] = useState(false);
  // Render All friend's profile in an array
    // when player's name is clicked, filter profile to only that person's name and show their profile
  const [friendProfile, setFriendProfile] = useState({});
  const [nameModal, setNameModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const avatarRef = useRef(userInfo.avatar);

  const changeProfileView = async (e) => {
    await socket.emit('get-friend-data', { username: e.target.textContent });
    await socket.on('send-friend-data', data => {
      console.log('data ~~ ', data);
      setFriendProfile(data[0]);
    })
    await setUserProfileState(false);
    await setFriendsProfileState(true);
  }

  const returnToUserProfile = () => {
    setUserProfileState(true);
    setFriendsProfileState(false);
  }
  const changeName = () => {
    setNameModal(true);
  };
  const changeAvatar = () => {
    setAvatarModal(true);
  };

  // EDIT USER INFO
  const submitChange = (e) => {
    e.preventDefault();
    if (e.target.username) {
      const user = {
        firebaseId: userInfo.firebase_id,
        username: e.target.username.value
      }
      emitters.editUserInfo(user);
      setNameModal(false);
    } else {
      const user = {
        firebaseId: userInfo.firebase_id,
        avatar: avatarRef.current
      }
      emitters.editUserInfo(user);
      setAvatarModal(false);
    }
  }

  return (
    <div>
      {userProfileState && !friendsProfileState &&
        <UserProfile
          changeProfileView={changeProfileView}
          userProfile={userInfo}
          changeName={changeName}
          changeAvatar={changeAvatar}
        />
      }
      <ChangeNameModal
        nameModal={nameModal}
        setNameModal={() => setNameModal(false)}
        submitChange={submitChange}
      />
      <ChangeAvatarModal
        avatarModal={avatarModal}
        setAvatarModal={() => setAvatarModal(false)}
        submitChange={submitChange}
        userAvatar={userInfo.avatar}
        avatar={avatarRef}
      />

      {!userProfileState && friendsProfileState &&
        <div>
          {/* <Link to='/profile'>Profile</Link> */}

          <FriendProfile
            changeProfileView={changeProfileView}
            friendProfile={friendProfile}
            returnToUserProfile={returnToUserProfile}
          />
        </div>
      }

    </div>
  );
};

export default ViewProfile;
