import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
import { Container, Grid } from "@material-ui/core"
import MetaLogIn from "./login"
import Dashboard from "./dashboard"

const themeDark = createTheme({
  palette: {
    background: {
      default: "#05182b",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <Container maxWidth="lg" >
        <Grid container justifyContent="flex-end" >
          <MetaLogIn />
        </Grid>
        <Dashboard />
      </Container>
    </ThemeProvider>
  );
};

export default App
