import React from "react";

function Test() {
  return (
      <div className="relative w-64 mt-4 mb-4">
        <button className="bg-blue-400 border hover:bg-indigo-dark text-white font-bold py-2 px-4 w-full inline-flex items-center">
          <svg
            fill="#FFF"
            height="18"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
          </svg>
          <span className="ml-2">Last opp bilder (max 3)</span>
        </button>
        <input
          className="cursor-pointer absolute block opacity-0 pin-r pin-t"
          type="file"
          name="vacancyImageFiles"
          multiple
        />
      </div>
  );
}

export default Test;
