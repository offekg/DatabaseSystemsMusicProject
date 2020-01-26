import React from "react";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";

import HomePage from "./HomePage";
import QuerySelector from "./QuerySelector";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      minHeight: "60%",
      minWidth: "80%",
      marginBottom: theme.spacing(5)
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Timor Eizenman, Offek Gil, Ido Lerer, Yael Lerech - "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function App() {
  const classes = useStyles();

  const [section, setSection] = React.useState(<HomePage />);
  const [buttonText, setText] = React.useState("Create Your Own Top 10");

  const handleButtonClick = () => {
    if (buttonText === "Create Your Own Top 10") {
      setSection(<QuerySelector />);
      setText("Back To Our TOP 10");
    } else {
      setSection(<HomePage />);
      setText("Create Your Own Top 10");
    }
  };

  return (
    <Container maxWidth="lg" align="center">
      <Box my={4}>
        <Typography color="primary" variant="h1" component="h1" gutterBottom>
          <b>המְּעַשֵׂר</b>
        </Typography>
        <div className={classes.root}>
          <Fab
            size="large"
            color="primary"
            variant="extended"
            onClick={handleButtonClick}
          >
            <QueueMusicIcon className={classes.extendedIcon} />
            {buttonText}
          </Fab>
        </div>
        {section}
        <Copyright />
      </Box>
    </Container>
  );
}
