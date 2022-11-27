import React, { useState } from "react";
import { socket, emitters } from "../../socket";
import Profile from "./Profile";

const SearchProfile = ({ userInfo }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [profileView, setProfileView] = useState([]);

  // * SEARCH PROFILE
  const searchProfiles = (e) => {
    e.preventDefault();
    const search = e.target.username.value;
    const query = { username: search };
    emitters.searchProfile(query);
    socket.on("search-result", (data) => {
      setSearchResults(data);
    });
  };

  // * VIEW PROFILE
  const handleProfileView = (profile) => {
    setShowProfile(true);
    const query = profile.target.lastChild.textContent;
    searchResults.filter((item) => {
      if (item.username === query) setProfileView(item);
    });
  };

  // * ADD FRIEND
  const updateFriendList = (name) => {
    let check = false;
    userInfo.friends.map((friend) => {
      if (friend === name.username) check = true;
    });
    if (!check) userInfo.friends.push(name.username);
    emitters.addFriend(userInfo);
  };

  return (
    <>
      {!showProfile && (
        <div className="w-screen h-screen bg-[#F4F1DE] flex flex-col justify-center items-center">
          <div className="w-72 bg-[#F2CC8F] shadow-md rounded px-8 pt-4 pb-4 mb-4">
            <form onSubmit={(e) => searchProfiles(e)}>
              <h2 className="text-2xl border-b-2 border-black text-center mb-2">
                SEARCH PROFILES
              </h2>
              <label>Enter Username:</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Username"
                name="username"
              />
              <button
                className="bg-[#81B29A] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                SEARCH
              </button>
            </form>

            <div className="flex flex-col">
              {searchResults.map((profile) => {
                return (
                  <button
                    className="my-2 p-2 pl-4 rounded bg-[#E07A5F] text-left"
                    key={profile._id}
                    onClick={(e) => handleProfileView(e)}
                  >
                    {profile.username}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {showProfile && (
        <Profile
          userInfo={userInfo}
          info={profileView}
          returnToSearch={() => {
            setSearchResults([]);
            setShowProfile(false);
          }}
          updateFriendList={updateFriendList}
        />
      )}
    </>
  );
};

export default SearchProfile;
