import React from 'react';
import { FiFeather } from "react-icons/fi";

const UserProfile = ({ changeProfileView, userProfile, changeName, changeAvatar }) => {
  const calculateWinRate = () => {
    return ((userProfile.total_wins / userProfile.total_games) * 100).toFixed(2) + '%';
  }

  return (
    <div className="w-screen h-screen bg-[#F4F1DE] flex justify-evenly items-center">
      <div className="w-2/3 h-96 flex flex-col items-center gap-10">
        <div className="flex">
          <div>
            <img src={userProfile.avatar} className='pointer-events-none w-52 h-auto rounded-full' alt="avatar card" />
          </div>
          <div>
            <button className="bg-[#81B29A] justify-end hover:outline text-white font-bold py-2 px-4 rounded" onClick={() => changeAvatar()}><FiFeather /></button>
          </div>
        </div>

        <div className="flex items-center bg-[#3D405B] p-2 px-10 text-white rounded">
          <div className="flex-initial justify-center items-center m-8">
            <h2>Username:</h2>
            {userProfile.username} &nbsp;
            <button className=" hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => changeName()}><FiFeather /></button>
          </div>
          <div className="flex-col p-2 ">
            <h4>Number of Wins: {userProfile.total_wins}</h4>
            <h4>Total games played: {userProfile.total_games}</h4>
            {userProfile.total_games > 0 && <h4>Win Rate: {calculateWinRate()}</h4>}
          </div>
        </div>
      </div>

      <div className="w-72 h-96 bg-[#F2CC8F] flex flex-col p-5 mr-60 rounded">
        <div className="flex justify-center ">
          <h2>Friends</h2>
        </div>
        <div className="flex-col py-5 overflow-y-scroll ">
          {userProfile.friends &&
            userProfile.friends.map(friend => {
              return (
                <div className="my-4 p-2 rounded bg-[#E07A5F]"
                  key={friend}
                  onClick={(e) => changeProfileView(e)}
                >{friend}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
