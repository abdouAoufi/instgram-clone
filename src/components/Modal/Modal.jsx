import React from "react";
import "./modal.css";

function Modal(props) {
  return (
    <div className="fixed z-50 opacity-50 bg-gray-600 inset-0">
      {props.children}
    </div>
  );
}

export default Modal;
