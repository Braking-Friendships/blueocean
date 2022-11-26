import React from "react";
import { FiFeather } from "react-icons/fi";

const UserProfile = ({ changeProfileView, userProfile, changeName, changeAvatar, removeFriend }) => {
  const calculateWinRate = () => {
    return ((userProfile.total_wins / userProfile.total_games) * 100).toFixed(2) + "%";
  };

  return (
    <div className="w-screen h-screen bg-[#F4F1DE] flex justify-center items-center">
      <div className="h-96 flex flex-col items-center gap-10">
        <div className="flex mt-4">
          <div>
            <img
              src={userProfile.avatar}
              className="pointer-events-none w-52 h-auto rounded-full"
              alt="avatar card"
            />
          </div>
          <div>
            <button
              className="bg-[#81B29A] hover:outline hover:bg-[#3D405B] hover:text-white text-black font-bold py-2 px-4 rounded"
              onClick={() => changeAvatar()}
            >
              <FiFeather />
            </button>
          </div>
        </div>

        <div className="flex items-center bg-[#3D405B] py-3 pr-8 mx-8 text-white rounded">
          <div className="p-4">
            <h2 className="text-2xl">Username:</h2>
            <div className="flex justify-between items-center">
              <h2 className="text-xl">{userProfile.username} </h2>
              <button
                className="bg-[#3D405B] outline hover:outline hover:bg-[#81B29A] hover:text-black text-white font-bold py-2 px-4 rounded"
                onClick={() => changeName()}
              >
                <FiFeather />
              </button>
            </div>
          </div>
          <div className="flex-col pl-8">
            <h4 className="py-1">Number of Wins: {userProfile.total_wins}</h4>
            <h4 className="py-1">
              Total games played: {userProfile.total_games}
            </h4>
            {userProfile.total_games === 0 && (
              <h4 className="py-1">Win Rate: 0%</h4>
            )}
            {userProfile.total_games > 0 && (
              <h4 className="py-1">Win Rate: {calculateWinRate()}</h4>
            )}
          </div>
        </div>
      </div>

      <div className="w-64 h-96 bg-[#F2CC8F] flex flex-col p-4 rounded">
        <div className="flex justify-center ">
          <h2 className="text-2xl">Friends</h2>
        </div>
        <div></div>
        <div className="flex-col py-2 overflow-y-scroll ">
          {userProfile.friends &&
            userProfile.friends.map((friend) => {
              return (
                <div
                  className="flex justify-between my-4 p-2 rounded bg-[#E07A5F] text-xl"
                  key={friend}
                >
                  <div
                    className="cursor-pointer hover:text-white"
                    onClick={(e) => changeProfileView(e)}
                  >
                    {friend}
                  </div>
                  <div
                    className="cursor-pointer hover:text-white"
                    onClick={() => removeFriend(friend)}
                  >
                    &times;
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
