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
  },
}));

function CostumModalCont(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  return (
    <div
      className={`${classes.paper}  outline-none border-0 rounded-xl lg:w-100 `}
      style={modalStyle}
    >
      {props.children}
    </div>
  );
}

export default CostumModalCont;
