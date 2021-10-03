import React from "react";
import { useAppDispatch, useAppSelector } from "../../types/reduxHooks";
import { IFetchingWeatherArguments } from "../../types/fetching";
import { RootState } from "../../redux/store";
import {
  fetchCurrentWeather,
  removeCard,
} from "../../redux/slices/weatherCardsSlice";
import { Grid } from "@material-ui/core";

const WeatherCard = () => {
  const cards = useAppSelector((state: RootState) => state.weatherCards.list);
  const dispatch = useAppDispatch();

  const updateWeather = (city: string): void => {
    const args: IFetchingWeatherArguments = { city, isUpdating: true };
    dispatch(fetchCurrentWeather(args));
  };

  return (
    <>
      {cards.map((el: any) => (
        <Grid item xs={12} sm={3} key={el.id}>
          <div>{el.name}</div>
          <div>{Math.round(el.main.temp)}°</div>
          <div>{el.weather[0].main}</div>
          <div onClick={() => updateWeather(el.name)}>update</div>
          <div onClick={() => dispatch(removeCard({ id: el.id }))}>remove</div>
        </Grid>
      ))}
    </>
  );
};

export default WeatherCard;
