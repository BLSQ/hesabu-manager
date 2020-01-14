import React from "react";
import { Typography, Dialog, Slide } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import TopBar from "../../Shared/TopBar";
import PageContent from "../../Shared/PageContent";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Compound = props => {
  const history = useHistory();

  const { open, name } = props;

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => history.push("/compounds")}
      TransitionComponent={Transition}
    >
      <TopBar fullscreen backLinkPath="/compounds">
        <Typography variant="h6" color="inherit">
          {name}
        </Typography>
      </TopBar>
      <PageContent fullscreen>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente ut
          quasi, culpa incidunt est pariatur dolore accusantium necessitatibus
          repellat, saepe amet porro repudiandae fugit eligendi recusandae in ad
          ullam quia!
        </p>
      </PageContent>
    </Dialog>
  );
};

Compound.propTypes = {
  open: PropTypes.bool,
  name: PropTypes.string,
};

export default Compound;
