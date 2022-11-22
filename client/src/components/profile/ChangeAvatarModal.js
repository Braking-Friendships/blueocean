import React, { useState, useEffect } from 'react';
import happyCat from '../../assets/avatars/happyCat.png';
import madCat from '../../assets/avatars/madCat.png';
import readingCat from '../../assets/avatars/readingCat.png';
import sageCat from '../../assets/avatars/sageCat.png';
import shockedCat from '../../assets/avatars/shockedCat.png';
import sneakyCat from '../../assets/avatars/sneakyCat.png';
import tongueCat from '../../assets/avatars/tongueCat.png';
import unhappyCat from '../../assets/avatars/unhappyCat.png';
import vampireCat from '../../assets/avatars/vampireCat.png';

const ChangeAvatarModal = ({ avatarModal, setAvatarModal, profileAvatar, submitChange, avatar, setAvatar }) => {
  const avatarChoices = [happyCat, madCat, readingCat, sageCat, shockedCat, sneakyCat, tongueCat, unhappyCat, vampireCat];

  const displayChoice = (e) => {
    const innerHtml = e.target.innerHTML;
    if (innerHtml.includes('happyCat')) { setAvatar(happyCat) }
    if (innerHtml.includes('madCat')) { setAvatar(madCat) }
    if (innerHtml.includes('readingCat')) { setAvatar(readingCat) }
    if (innerHtml.includes('sageCat')) { setAvatar(sageCat) }
    if (innerHtml.includes('shockedCat')) { setAvatar(shockedCat) }
    if (innerHtml.includes('sneakyCat')) { setAvatar(sneakyCat) }
    if (innerHtml.includes('tongueCat')) { setAvatar(tongueCat) }
    if (innerHtml.includes('unhappyCat')) { setAvatar(unhappyCat) }
    if (innerHtml.includes('vampireCat')) { setAvatar(vampireCat) }
  };

  if (!avatarModal) { return null }

  return (
    <div>
      <div
        className='fixed top-0 left-0 w-full h-full backdrop-blur-sm z-10'
        onClick={setAvatarModal}>
      </div>
      <div className='absolute w-auto h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-[#F2CC8F] drop-shadow-2xl z-20  rounded-lg'>
        {/* <div> */}
        <button
          className='h-fit w-8 text-[#3D405B] float-right text-3xl hover:text-[#E07A5F] rounded-lg'
          onClick={setAvatarModal}
        >&times;
        </button>

        <form className='h-96 w-max flex flex-col items-center justify-center ml-10 p-0'
          onSubmit={(e) => submitChange(e)}>
          <h2 className='max-w-max p-2 mb-4 text-3xl'>Choose Avatar:</h2>
          <div className="flex items-center justify-center ">
            {avatarChoices.map(icon => {
              return <label
                className='mb-4 overflow-auto p-1'
                key={icon}
                onClick={(e) => displayChoice(e)}
                name={icon}
              ><img src={icon} className='pointer-events-none w-12 h-auto rounded-full' alt="avatar card" /></label>
            })}
          </div>

          <label>Chosen Avatar</label>
          <div className="p-2">
            <img src={avatar} className='pointer-events-none w-32 h-auto rounded-full' alt="avatar card" />
          </div>
          <button className="p-2 bg-[#81B29A] rounded w-60 h-16 text-xl text-white font-bold hover:outline hover:outline-4 hover:outline-[#E07A5F]" type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ChangeAvatarModal;
