import React from "react";
import HomePage from "./HomePage";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import QuerySelector from "./QuerySelector";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      minHeight: "60%",
      minWidth: "80%",
      marginTop: theme.spacing(10)
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
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
        <Typography variant="h2" component="h1" gutterBottom>
          <b>HaMeaser</b>
        </Typography>
        {section}
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
        <Copyright />
      </Box>
    </Container>
  );
}
