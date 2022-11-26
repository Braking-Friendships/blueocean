import React from "react";

const FriendProfile = ({ changeProfileView, friendProfile, returnToUserProfile }) => {
  const calculateWinRate = () => {
    return ((friendProfile.total_wins / friendProfile.total_games) * 100).toFixed(2) + "%";
  };

  return (
    <div className="w-screen h-screen bg-[#F4F1DE] flex flex-col justify-center items-center">
      <div className="flex">
        <div>
          <img
            src={friendProfile.avatar}
            className="pointer-events-none w-52 h-auto rounded-full"
            alt="avatar card"
          />
        </div>
        <div className="pl-10">
          <button
            className="bg-[#81B29A] hover:outline hover:bg-[#E07A5F] text-white font-bold py-2 px-4 rounded"
            onClick={() => returnToUserProfile()}
          >
            BACK
          </button>
        </div>
      </div>

      <div className="flex items-center bg-[#3D405B] my-10 p-2 px-10 text-white rounded">
        <div className="flex flex-col py-4 mr-8">
          <h2 className="text-2xl">Username:</h2>
          <h2 className="text-xl">{friendProfile.username}</h2>
        </div>
        <div className="flex-col">
          <h4>Number of Wins: {friendProfile.total_wins}</h4>
          <h4>Total games played: {friendProfile.total_games}</h4>
          {friendProfile.total_games === 0 && <h4>Win Rate: 0%</h4>}
          {friendProfile.total_games > 0 && (
            <h4>Win Rate: {calculateWinRate()}</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;
