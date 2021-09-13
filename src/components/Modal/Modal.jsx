import React from "react";
import Transition from "../Transition/Transition";

function Modal(props) {
  const modalPosition = props.center
    ? "fixed inset-0 z-50 overflow-hidden  top-56 flex items-start mb-4 justify-center transform px-4 sm:px-6"
    : " fixed inset-0 z-50 overflow-hidden  top-14 flex items-start mb-4 justify-center transform px-4 sm:px-6";
  return (
    <div className="">
      <Transition
        className="fixed z-50 inset-0 bg-black bg-opacity-70 z-100 transition-opacity"
        show={props.openModal}
        appear={props.openModal}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      <Transition
        id="search-modal"
        className={modalPosition}
        role="dialog"
        aria-modal="true"
        show={props.openModal}
        appear={props.openModal}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        {props.children}
      </Transition>
    </div>
  );
}

export default Modal;
