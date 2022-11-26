import React, { useState, useEffect } from "react";
import happyCat from "../../assets/avatars/happyCat.png";
import madCat from "../../assets/avatars/madCat.png";
import readingCat from "../../assets/avatars/readingCat.png";
import sageCat from "../../assets/avatars/sageCat.png";
import shockedCat from "../../assets/avatars/shockedCat.png";
import sneakyCat from "../../assets/avatars/sneakyCat.png";
import tongueCat from "../../assets/avatars/tongueCat.png";
import unhappyCat from "../../assets/avatars/unhappyCat.png";
import vampireCat from "../../assets/avatars/vampireCat.png";

const ChangeAvatarModal = ({
  avatarModal,
  closeAvatarModal,
  profileAvatar,
  submitChange,
  avatarRef,
  userAvatar,
}) => {
  const [currentAvatar, setCurrentAvatar] = useState(userAvatar.avatar);
  const avatarChoices = [
    happyCat,
    madCat,
    readingCat,
    sageCat,
    shockedCat,
    sneakyCat,
    tongueCat,
    unhappyCat,
    vampireCat,
  ];

  const displayChoice = (e) => {
    const innerHtml = e.target.innerHTML;
    if (innerHtml.includes("happyCat")) setCurrentAvatar(happyCat);
    if (innerHtml.includes("madCat")) setCurrentAvatar(madCat);
    if (innerHtml.includes("readingCat")) setCurrentAvatar(readingCat);
    if (innerHtml.includes("sageCat")) setCurrentAvatar(sageCat);
    if (innerHtml.includes("shockedCat")) setCurrentAvatar(shockedCat);
    if (innerHtml.includes("sneakyCat")) setCurrentAvatar(sneakyCat);
    if (innerHtml.includes("tongueCat")) setCurrentAvatar(tongueCat);
    if (innerHtml.includes("unhappyCat")) setCurrentAvatar(unhappyCat);
    if (innerHtml.includes("vampireCat")) setCurrentAvatar(vampireCat);
  };

  useEffect(() => {
    avatarRef.current = currentAvatar;
  }, [currentAvatar]);

  if (!avatarModal) return null;

  return (
    <div>
      <div
        className="fixed top-0 left-0 w-full h-full backdrop-blur-sm z-10"
        onClick={closeAvatarModal}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F2CC8F] drop-shadow-2xl z-20  rounded-lg">
        <div className="flex justify-end mr-1">
          <button
            className="h-fit w-8 text-[#3D405B] float-right text-3xl hover:text-[#E07A5F] rounded-lg"
            onClick={closeAvatarModal}
          >
            &times;
          </button>
        </div>

        <form
          className="flex flex-col items-center justify-center m-2 p-2"
          onSubmit={(e) => submitChange(e)}
        >
          <h2 className="p-2 mb-4 text-2xl">Choose Avatar:</h2>
          <div className="flex items-center justify-center ">
            {avatarChoices.map((icon) => {
              return (
                <label
                  className="mb-4 p-1"
                  key={icon}
                  onClick={(e) => displayChoice(e)}
                  name={icon}
                >
                  <img
                    src={icon}
                    className="w-12 h-auto rounded-full pointer-events-none"
                    alt="avatar card"
                  />
                </label>
              );
            })}
          </div>

          <label className="text-2xl">Chosen Avatar</label>
          <div className="p-2">
            {currentAvatar && (
              <img
                src={currentAvatar}
                className="pointer-events-none w-32 h-auto rounded-full"
                alt="avatar card"
              />
            )}
            {!currentAvatar && (
              <img
                src={userAvatar.avatar}
                className="pointer-events-none w-32 h-auto rounded-full"
                alt="avatar card"
              />
            )}
          </div>
          <button
            className="p-2 bg-[#81B29A] rounded w-48 h-16 text-xl text-white font-bold hover:outline hover:outline-4 hover:outline-[#E07A5F]"
            type="submit"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeAvatarModal;
