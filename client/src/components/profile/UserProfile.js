import react, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfileFriends from './UserProfileFriends';
import madCat from '../../assets/avatars/madCat.png';
import happyCat from '../../assets/avatars/happyCat.png';

const UserProfile = ({ socket }) => {
  const [profile, setProfile] = useState({
    username: 'Randy',
    email: 'definitelyNotRandy@isRandy.com',
    friends: ['!Randy', 'Randy++'],
    total_wins: 1,
    total_games: 7,
    firebase_id: '2Phajn1cOASIM4jntQkZeAQwLUv2',
    // avatar: madCat,
  });


  // create fake user on click
  const createUser = async () => {
    console.log('create user clicked')
    const fakeUserCreation = {
      username: 'Not Randy',
      email: 'definitelyNotRandy@isRandy.com',
      friends: [],
      firebaseId: Math.random().toString(),
      firstName: 'Randy',
      lastName: 'Not',
      avatar: madCat
    }
    await socket.emit('create-user', fakeUserCreation)
    socket.on('send-user-data', data => {
      setProfile(data[0]);
    })
  }

  // useEffect(() => {
  // socket.emit('get-user-data', 'Dave');
  // socket.emit('GET-userProfile', 'Dave');
  // socket.on('user-profile-retrieve', data => {
  //   console.log(data);
  // })
  // setProfile(fakeProfile);
  // }, [])

  console.log("~~~~ profile ~~~~")
  console.log(profile)

  const calculateWinRate = () => {
    return ((profile.total_wins / profile.total_games) * 100).toFixed(2) + '%';
  }

  return (
    <div className="w-screen h-screen bg-[#F4F1DE] flex flex-col justify-center items-center">
      {/* <div> */}
      <h1 onClick={() => createUser()}>USER PROFILE</h1>
      <br />

      {!profile.avatar &&
        <img src={happyCat} className='pointer-events-none w-52 h-auto rounded-full' alt="avatar card" />
      }
      {profile.avatar &&
        <img src={profile.avatar} className='pointer-events-none w-52 h-auto rounded-full' alt="avatar card" />
      }
      <br />

      <h4>{profile.username}</h4>
      <br />

      <h4>Number of Wins: {profile.total_wins}</h4>
      <h4>Total games played: {profile.total_games}</h4>
      {profile.total_games > 0 && <h4>Win Rate: {calculateWinRate()}</h4>}
      <br />

      <div>Friends</div>
      {profile.friends.length > 0 &&
        profile.friends.map(friend => { return <UserProfileFriends friend={friend} key={friend} /> })
      }
    </div>
  );
};

export default UserProfile;
