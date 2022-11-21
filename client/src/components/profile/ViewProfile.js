import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import FriendProfile from './FriendProfile';
import { socket, emitters } from '../../socket';

const ViewProfile = () => {
  const [userProfileState, setUserProfileState] = useState(true);
  const [friendsProfileState, setFriendsProfileState] = useState(false);
  const [friendsName, setFriendsName] = useState();
  const [currentFriendProfile, setCurrentFriendProfile] = useState({});

  const changeProfileView = (e) => {

    console.log('clicked on friend name', e.target.textContent)
    setFriendsName(e.target.textContent);

    // socket.emit('get-user-data', { username: e.target.textContent });
    // socket.on('send-user-data', data => {
    //   setProfile(data[0]);
    // })

  }

  // useEffect(() => {
  //   if (!friendsProfileState) {return}



  // }, [friendsProfileState])

  return (
    <div>
      {userProfileState && !friendsProfileState &&
        <UserProfile
          changeProfileView={changeProfileView}
        />
      }

      {friendsProfileState && !userProfileState &&
        <FriendProfile
          changeProfileView={changeProfileView}
        />
      }

    </div>
  );
};

export default ViewProfile;
