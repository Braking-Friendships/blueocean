import React, { useState, useEffect } from 'react';
import { socket, emitters } from '../../socket';
import UserProfile from './UserProfile';
import FriendProfile from './FriendProfile';
import ChangeNameModal from './ChangeNameModal';
import ChangeAvatarModal from './ChangeAvatarModal';

const ViewProfile = () => {
  const [userProfileState, setUserProfileState] = useState(true);
  const [friendsProfileState, setFriendsProfileState] = useState(false);
  const [friendsName, setFriendsName] = useState();
  const [userProfile, setUserProfile] = useState({})
  const [currentFriendProfile, setCurrentFriendProfile] = useState({});
  const [nameModal, setNameModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);


  const changeProfileView = async (e) => {
    console.log('Friend ~~ ', e.target.textContent)
    await socket.emit('get-friend-data', { username: e.target.textContent });
    await socket.on('send-friend-data', data => {
      console.log('data ~~ ', data);
      setCurrentFriendProfile(data[0]);
    })
    await setUserProfileState(false);
    await setFriendsProfileState(true);
  }

  const changeName = () => {
    console.log('change name clicked');
    setNameModal(true);

  };

  const changeAvatar = () => {
    console.log('change avatar clicked');
  };



  useEffect(() => {
    setUserProfileState(true);
    setFriendsProfileState(false);
    socket.emit('get-user-data', { username: 'Hieu' });
    socket.on('send-user-data', data => {
      setUserProfile(data[0]);
    })
  }, [])

  useEffect(() => {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~')
    console.log(userProfile.username);
    console.log(userProfile);
  }, [userProfile])

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
        setNameModal={setNameModal}
      />

      {friendsProfileState && !userProfileState &&
        <div>
          {/* <Link to='/profile'>Profile</Link> */}

          <FriendProfile
            changeProfileView={changeProfileView}
          />
        </div>
      }

    </div>
  );
};

export default ViewProfile;
