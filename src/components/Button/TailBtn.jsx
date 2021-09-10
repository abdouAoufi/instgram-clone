import React from "react";

function TailBtn({ click, text, disabled }) {
  return (
    <div>
      <button
        disabled={!disabled}
        onClick={click}
        className="m-auto  mt-2 bg-red-400 hover:bg-blue-light text-white font-bold py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded disabled:opacity-50  disabled:cursor-none"
      >
        {text}
      </button>
    </div>
  );
}

export default TailBtn;
