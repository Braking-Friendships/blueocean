import React from 'react';

const Profile = ({profile}) => {
  console.log('individual profile: ', profile);

  return (
    <div>
      {profile.username}
    </div>
  );
};

export default Profile;
