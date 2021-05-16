import React from "react";

function TailInput({ label, change }) {
  return (
    <div>
      <div className="flex">
        
        <input
          onChange={(e) => change(e)}
          name="field_name"
          className="border border-2 rounded-r px-1 py-2 w-full outline-none"
          type="text"
          placeholder="Write something here..."
        />
      </div>
    </div>
  );
}

export default TailInput;
