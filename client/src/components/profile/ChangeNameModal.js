import React from "react";

const ChangeNameModal = ({ nameModal, setNameModal, submitChange }) => {
  if (!nameModal) return null;

  return (
    <div>
      <div
        className="fixed top-0 left-0 w-full h-full backdrop-blur-sm z-10"
        onClick={setNameModal}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F2CC8F] drop-shadow-2xl z-20  rounded-lg">
        <button
          className="h-fit w-8 text-[#3D405B] float-right text-3xl hover:text-[#E07A5F] rounded-lg"
          onClick={setNameModal}
        >
          &times;
        </button>

        <form
          className="flex flex-col items-center justify-center m-10"
          onSubmit={(e) => submitChange(e)}
        >
          <h2 className="p-2 mb-4 text-3xl text-black">Edit Username:</h2>
          <input
            className="mb-4 rounded-md text-[#3D405B] text-3xl text-center"
            type="text"
            name="username"
            required
          />
          <button
            className="p-2 bg-[#81B29A] rounded w-60 h-16 text-xl text-white font-bold hover:outline hover:outline-4 hover:outline-[#E07A5F]"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeNameModal;
