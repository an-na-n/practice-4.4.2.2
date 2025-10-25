import React from "react";
import { Container } from "@mantine/core";
import "@mantine/core/styles.css";
import { Header } from "./components/header/Header";
import { MainPage } from "./pages/main_page/MainPage";
import classes from "./App.module.css";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container className={classes.container} mt="md">
        <MainPage />
      </Container>
    </>
  );
};

export default App;
