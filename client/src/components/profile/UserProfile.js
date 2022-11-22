import React from 'react';
import { FiFeather } from "react-icons/fi";

const UserProfile = ({ changeProfileView, userProfile, changeName, changeAvatar }) => {
  const calculateWinRate = () => {
    return ((userProfile.total_wins / userProfile.total_games) * 100).toFixed(2) + '%';
  }

  return (
    <div className="w-screen h-screen bg-[#F4F1DE] flex flex-col justify-center items-center">
        <button className="bg-[#81B29A] justify-end hover:outline text-white font-bold py-2 px-4 rounded" onClick={() => changeAvatar()}><FiFeather /></button>
        <img src={userProfile.avatar} className='pointer-events-none w-52 h-auto rounded-full' alt="avatar card" />
      <br />

      <h4>
        {userProfile.username} &nbsp;
        <button className="bg-[#81B29A] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => changeName()}><FiFeather /></button>
      </h4>
      <br />

      <h4>Number of Wins: {userProfile.total_wins}</h4>
      <h4>Total games played: {userProfile.total_games}</h4>
      {userProfile.total_games > 0 && <h4>Win Rate: {calculateWinRate()}</h4>}
      <br />

      <div>Friends</div>
      {userProfile.friends &&
        userProfile.friends.map(friend => { return <div key={friend} onClick={(e) => changeProfileView(e)}>{friend}</div> })
      }
    </div>
  );
};

export default UserProfile;
