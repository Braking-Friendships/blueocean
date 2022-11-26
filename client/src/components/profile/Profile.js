import React from "react";

const Profile = ({ userInfo, info, returnToSearch, updateFriendList }) => {
  const calculateWinRate = () => {
    return ((info.total_wins / info.total_games) * 100).toFixed(2) + "%";
  };

  return (
    <div className="w-screen h-screen bg-[#F4F1DE] flex flex-col justify-center items-center">
      <div className="flex">
        <div>
          <img
            src={info.avatar}
            className="pointer-events-none w-52 h-auto rounded-full"
            alt="avatar card"
          />
        </div>
        <div className="flex flex-col pl-10">
          {userInfo.username !== info.username && (
            <button
              className="bg-[#81B29A] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                updateFriendList(info);
                // returnToSearch();
              }}
            >
              Add Friend
            </button>
          )}
          <button
            className="bg-[#81B29A] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2"
            onClick={() => returnToSearch()}
          >
            BACK
          </button>
        </div>
      </div>

      <div className="flex items-center bg-[#3D405B] my-10 p-2 px-10 text-white rounded">
        <div className="flex flex-col p-4 mr-4">
          <h2>Username:</h2>
          {info.username} &nbsp;
        </div>
        <div>
          <h4>Number of Wins: {info.total_wins}</h4>
          <h4>Total games played: {info.total_games}</h4>
          {info.total_games > 0 && <h4>Win Rate: {calculateWinRate()}</h4>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
