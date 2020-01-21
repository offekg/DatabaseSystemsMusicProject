import React from "react";
import HomePage from "./HomePage";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import QuerySelector from "./QuerySelector";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

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
  return (
    <Container maxWidth="lg" align="center">
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          <b>HaMeaser</b>
        </Typography>
        <HomePage />
        <QuerySelector />
        <Copyright />
      </Box>
    </Container>
  );
}
