import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import MetaLogIn from './login'
import Dashboard from './dashboard'

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
      <Container fixed>
        <Grid container>
          <Grid item xs={12} sm={3} md={3}>
            <MetaLogIn />
          </Grid>
          <Grid item xs={12} sm={9} md={9}>
            <Dashboard />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
