import { Grid } from "@material-ui/core";
import React from "react";

import SearchBar from "../components/searchBar/SearchBar";
import WeatherCard from "../components/weatherCard/WeatherCard";

const MainPage = () => {
  return (
    <>
      <SearchBar />
      <Grid container spacing={2}>
        <WeatherCard />
      </Grid>
    </>
  );
};

export default MainPage;
