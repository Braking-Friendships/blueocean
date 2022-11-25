import React, { useState } from "react";
import {socket, emitters } from "../../socket";
import Profile from "./Profile";

const SearchProfile = () => {
  const [searchResults, setSearchResults] = useState([]);

  const searchProfiles = (e) => {
    e.preventDefault();
    const search = e.target.username.value;
    const query = {username: search};
    emitters.searchProfile(query);
    socket.on('search-result', data => {
      setSearchResults(data);
    })
  };

  return (
    <div className="w-screen h-screen bg-[#F4F1DE] flex flex-col justify-center items-center">
      SEARCH PROFILES
      <form
        className="w-72 bg-[#F2CC8F] shadow-md rounded px-8 pt-4 pb-4 mb-4"
        onSubmit={(e) => searchProfiles(e)}
      >
        <label>Enter Username:</label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
      <div className="w-72 bg-[#F2CC8F] shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {searchResults.map(profile => { return <Profile key={profile._id} profile={profile}/>})}
      </div>
    </div>
  );
};

export default SearchProfile;
