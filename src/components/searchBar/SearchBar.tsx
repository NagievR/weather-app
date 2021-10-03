import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../types/reduxHooks";
import { IFetchingWeatherArguments } from "../../types/fetching";
import { RootState } from "../../redux/store";
import {
  fetchCurrentWeather,
  removeErrors,
} from "../../redux/slices/weatherCardsSlice";
import { TextField, Button, CircularProgress } from "@material-ui/core";

const SearchBar: React.FC = () => {
  const [cityName, setCityName] = useState<string>("lozova");
  const dispatch = useAppDispatch();

  const error = useAppSelector(
    (state: RootState) => state.weatherCards.errors.searchBar
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.weatherCards.isLoading
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value: string = event.target.value;
    setCityName(value);
    if (error) {
      dispatch(removeErrors());
    }
  };

  const searchCity = (): void => {
    const validName: string = cityName.trim().toLowerCase();
    if (validName) {
      const args: IFetchingWeatherArguments = { city: validName };
      dispatch(fetchCurrentWeather(args));
      setCityName("");
    }
  };

  return (
    <>
      <TextField
        onChange={handleInputChange}
        value={cityName}
        variant="standard"
      />

      <Button
        onClick={searchCity}
        variant="outlined"
        disabled={isLoading}
        style={{ width: "90px" }}
      >
        {isLoading ? <CircularProgress size={20} /> : "Search"}
      </Button>

      {error && <div>{error}</div>}
    </>
  );
};

export default SearchBar;
