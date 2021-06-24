import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import PostPersons from "./components/PostPersons";
import { store } from "./actions/store";
import { Container, AppBar, Typography } from "@material-ui/core";
import ButterToast,{ POS_RIGHT,POS_TOP } from "butter-toast";

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="lg">
        <AppBar position="static" color="inherit">
          <Typography
            variant="h3"
            align="center" >
            Kompare Zadatak
          </Typography>
        </AppBar>
        <PostPersons />
        <ButterToast position={{vertical:POS_TOP,horizontal:POS_RIGHT}}/>
      </Container>
    </Provider>
  );
}

export default App;
