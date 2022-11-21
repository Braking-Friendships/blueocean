import react, { useState, useEffect } from 'react';
import { socket, emitters } from '../../socket';
import UserProfileFriends from './UserProfileFriends';
import madCat from '../../assets/avatars/madCat.png';
import happyCat from '../../assets/avatars/happyCat.png';
import sageCat from '../../assets/avatars/sageCat.png';
import sneakyCat from '../../assets/avatars/sneakyCat.png';
import tongueCat from '../../assets/avatars/tongueCat.png';
import vampireCat from '../../assets/avatars/vampireCat.png';
import unhappyCat from '../../assets/avatars/unhappyCat.png';

const UserProfile = () => {
  // CHANGES WHEN ACTUAL USER IS DETERMINED
  const [user, setUser] = useState('0.14438257512163855');
  const [profile, setProfile] = useState(
    {
      _id: "6379627813a1460fe41c9dd0",
      __v: 0,
      firebase_id: '0.14438257512163855',
      avatar: sageCat,
      email: 'HieuTest@gmail.com',
      username: 'blahblah',
      firstName: 'Hieu',
      lastName: 'Ngo',
      friends: ['Randy'],
      total_games: 0,
      total_wins: 0,
    });


  const changeName = () => {
    // console.log('change name button clicked');
  };

  const changeAvatar = () => {
    // console.log('change avatar button clicked');
  };



  useEffect(() => {
    socket.emit('get-user-data', { firebaseId: user });
    socket.on('send-user-data', data => {
      setProfile(data[0]);
    })
  }, [user])



  const calculateWinRate = () => {
    return ((profile.total_wins / profile.total_games) * 100).toFixed(2) + '%';
  }

  return (
    <div className="w-screen h-screen bg-[#F4F1DE] flex flex-col justify-center items-center">
      {/* <div> */}
      <h1>USER PROFILE</h1>
      <br />

      {!profile.avatar &&
        <div>
          <img src={happyCat} className='pointer-events-none w-52 h-auto rounded-full' alt="avatar card" />
          <br />
          <button className="bg-[#81B29A] hover:outline text-white font-bold py-2 px-4 rounded" onClick={changeAvatar()}>Change Avatar</button>
        </div>
      }
      {profile.avatar &&
        <div>
          <img src={profile.avatar} className='pointer-events-none w-52 h-auto rounded-full' alt="avatar card" />
          <br />
          <button className="bg-[#81B29A] hover:outline text-white font-bold py-2 px-4 rounded" onClick={changeAvatar()}>Change Avatar</button>
        </div>
      }
      <br />

      <h4>{profile.username}</h4>
      <br />
      <button className="bg-[#81B29A] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={changeName()}>Change Name</button>
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
