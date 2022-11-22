import React, { useState, useEffect } from 'react';
import { socket, emitters } from '../../socket';
import UserProfile from './UserProfile';
import FriendProfile from './FriendProfile';
import ChangeNameModal from './ChangeNameModal';
import ChangeAvatarModal from './ChangeAvatarModal';

const ViewProfile = () => {
  const [userProfileState, setUserProfileState] = useState(true);
  const [friendsProfileState, setFriendsProfileState] = useState(false);
  // const [friendsName, setFriendsName] = useState();
  const [userProfile, setUserProfile] = useState({});
  const [friendProfile, setFriendProfile] = useState({});
  const [nameModal, setNameModal] = useState(false);
  const [avatar, setAvatar] = useState([])
  const [avatarModal, setAvatarModal] = useState(false);

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

  const submitChange = (e) => {
    e.preventDefault();
    // EDIT USERNAME
    if (e.target.username) {
      socket.emit('post-edit-username', {
        firebaseId: userProfile.firebase_id,
        username: e.target.username.value
      });
      socket.on('send-edit-username', data => {
        console.log('data ~~ ', data);
        setUserProfile(data[0]);
      })
      setNameModal(false);
    } else { // EDIT AVATAR
      socket.emit('post-edit-avatar', {
        firebaseId: userProfile.firebase_id,
        avatar: avatar
      });
      socket.on('send-edit-avatar', data => {
        console.log('data ~~ ', data);
        setUserProfile(data[0]);
      })
      setAvatarModal(false);
    }
  }


  useEffect(() => {
    setUserProfileState(true);
    setFriendsProfileState(false);
    // HARD CODED DATA
    socket.emit('get-user-data', { firebaseId: 0.14438257512163855 });
    socket.on('send-user-data', data => {
      setUserProfile(data[0]);
      setAvatar(data[0].avatar);
    })
  }, [avatarModal])

  // useEffect(() => {
  //   console.log('~~~~~~~~~~~~~~~~~~~~~~~~')
  //   console.log(userProfile.username);
  //   console.log(userProfile);
  //   console.log(avatar);
  // }, [userProfile, avatar])



  return (
    <div>
      {userProfileState && !friendsProfileState &&
        <UserProfile
          changeProfileView={changeProfileView}
          userProfile={userProfile}
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
        profileAvatar={userProfile.avatar}
        submitChange={submitChange}
        avatar={avatar}
        setAvatar={setAvatar}
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
