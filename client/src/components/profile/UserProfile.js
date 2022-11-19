import react, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfileFriends from './UserProfileFriends';
import madCat from '../../assets/avatars/madCat.png';
import happyCat from '../../assets/avatars/happyCat.png';
import sageCat from '../../assets/avatars/sageCat.png';
import sneakyCat from '../../assets/avatars/sneakyCat.png';
import tongueCat from '../../assets/avatars/tongueCat.png';
import vampireCat from '../../assets/avatars/vampireCat.png';
import unhappyCat from '../../assets/avatars/unhappyCat.png';

const UserProfile = ({ socket }) => {
  const [profile, setProfile] = useState(    {
    _id: "6379627813a1460fe41c9dd0",
    __v: 0,
    firebase_id: '0.14438257512163855',
    avatar: '/static/media/madCat.7ed8246f766244faa4f5.png',
    email: 'HieuTest@gmail.com',
    username: 'Hieu',
    firstName: 'Hieu',
    lastName: 'Ngo',
    friends: [],
    total_games: 0,
    total_wins: 0,
  });


  // create fake user on click
  // const createUser = async () => {
  //   console.log('create user clicked')
  //   const fakeUserCreation = {
  //     username: 'Hieu',
  //     email: 'HieuTest@gmail.com',
  //     friends: [],
  //     firebaseId: Math.random().toString(),
  //     firstName: 'Hieu',
  //     lastName: 'Ngo',
  //     avatar: madCat
  //   }
  //   await socket.emit('create-user', fakeUserCreation)
  //   socket.on('send-user-data', data => {
  //     setProfile(data[0]);
  //   })
  // }

  // useEffect(() => {
  // socket.emit('get-user-data', 'Dave');
  // socket.emit('GET-userProfile', 'Dave');
  // socket.on('user-profile-retrieve', data => {
  //   console.log(data);
  // })
  // setProfile(fakeProfile);
  // }, [])

  // console.log("~~~~ profile ~~~~")
  // console.log(profile)

  const calculateWinRate = () => {
    return ((profile.total_wins / profile.total_games) * 100).toFixed(2) + '%';
  }

  return (
    <div className="w-screen h-screen bg-[#F4F1DE] flex flex-col justify-center items-center">
      {/* <div> */}
      <h1>USER PROFILE</h1>
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
