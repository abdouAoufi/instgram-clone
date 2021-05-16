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

function CostumModalCont(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <div
        className={`${classes.paper}  outline-none border-0 rounded-xl lg:w-100 `}
        style={modalStyle}
      >
        {props.children}
      </div>
    </Modal>
  );
}

export default CostumModalCont;
