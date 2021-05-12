import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
    overflow: "hidden",
    // padding: theme.spacing(2, 4, 3),
  },
}));

function CostumModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <div
        className={`${classes.paper} w-65  min-h-59 outline-none border-0 rounded-xl lg:w-100 `}
        style={modalStyle}
      >
        <div className="flex justify-between flex-col mx-auto h-full">
          <div className="text-base font-semibold text-gray-500 text-center     border-b py-3">
            {props.title}
          </div>
          <div className="text-base font-normal text-gray-600  px-4   py-6  ">
            {" "}
            {props.textInside}
          </div>
          <div className="text-sm   font-semibold text-blue-600 text-center py-3 border-t ">
            <span
              onClick={() => props.setOpen(false)}
              className="cursor-pointer"
            >
              {props.btnText}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CostumModal;
