import React from 'react';


const FriendProfile = ({ changeProfileView, friendProfile, returnToUserProfile }) => {
  const calculateWinRate = () => {
    return ((friendProfile.total_wins / friendProfile.total_games) * 100).toFixed(2) + '%';
  }

  return (
    <div className="w-screen h-screen bg-[#F4F1DE] flex flex-col justify-center items-center">
      <div className="flex">
        <div>
          <img src={friendProfile.avatar} className='pointer-events-none w-52 h-auto rounded-full' alt="avatar card" />
        </div>
        <div className="pl-10">
          <button className="bg-[#81B29A] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => returnToUserProfile()}>BACK</button>
        </div>
      </div>

      <div className="flex items-center bg-[#3D405B] my-10 p-2 px-10 text-white rounded">
        <div className="flex flex-col p-4 mr-4">
          <h2>Username:</h2>
          {friendProfile.username} &nbsp;
        </div>
        <div>
          <h4>Number of Wins: {friendProfile.total_wins}</h4>
          <h4>Total games played: {friendProfile.total_games}</h4>
          {friendProfile.total_games > 0 &&
            <h4>Win Rate: {calculateWinRate()}</h4>
          }
        </div>
      </div>

      {/* <div>Friends</div>
      {friendProfile.friends &&
        friendProfile.friends.map(friend => { return <div key={friend}>{friend}</div> })
      } */}
    </div>
  );
};

export default FriendProfile;
