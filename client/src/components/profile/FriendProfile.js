import React from 'react';


const FriendProfile = ({ changeProfileView, friendProfile, returnToUserProfile }) => {

  const calculateWinRate = () => {
    return ((friendProfile.total_wins / friendProfile.total_games) * 100).toFixed(2) + '%';
  }

  return (
    <div className="w-screen h-screen bg-[#F4F1DE] flex flex-col justify-center items-center">
      <button className="bg-[#81B29A] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => returnToUserProfile()}>BACK</button>

      <br /><br />

      <img src={friendProfile.avatar} className='pointer-events-none w-52 h-auto rounded-full' alt="avatar card" />
      <br />

      {friendProfile.username} &nbsp;
      <br />

      <h4>Number of Wins: {friendProfile.total_wins}</h4>
      <h4>Total games played: {friendProfile.total_games}</h4>
      {friendProfile.total_games > 0 &&
        <h4>Win Rate: {calculateWinRate()}</h4>
      }
      <br />

      {/* <div>Friends</div>
      {friendProfile.friends &&
        friendProfile.friends.map(friend => { return <div key={friend}>{friend}</div> })
      } */}
    </div>
  );
};

export default FriendProfile;
