import { AppThunk, RootState } from "./../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IFetchingWeatherArguments } from "../../types/fetching";
import IWeather from "../../types/weather";
import IWeatherCardsState from "../../types/weatherCardsState";
import Errors from "../../enums/errors";

const initialState: IWeatherCardsState = {
  list: [],
  isLoading: false,
  errors: {
    searchBar: null,
    card: null,
    global: null,
  },
};

export const fetchCurrentWeather = createAsyncThunk<any, any, any>(
  "weatherCards/fetchCurrentWeather",
  async function (
    args: IFetchingWeatherArguments,
    { rejectWithValue, getState }
  ) {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${args.city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      if (!res.ok) {
        throw new Error(String(res.status));
      }

      const data: IWeather = await res.json();

      if (!args.isUpdating) {
        const { weatherCards } = getState() as {
          weatherCards: IWeatherCardsState;
        };
        const AlreadyAdded = weatherCards.list.find(
          (it: IWeather) => it.id === data.id
        );
        if (AlreadyAdded) {
          throw new Error(Errors.AlreadyAdded);
        }
      }

      return data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue({ message: String(err.message) });
    }
  }
);

const removeAllErrors = (state: IWeatherCardsState) => {
  // for (const k in state.errors) {
  //   state.errors[k] = null;
  // }
  state.errors.card = null;
  state.errors.global = null;
  state.errors.searchBar = null;
};

const weatherCardsSlice = createSlice({
  name: "weatherCards",
  initialState,
  reducers: {
    removeCard(state, action) {
      state.list = state.list.filter(
        (card: IWeather) => card.id !== action.payload.id
      );
    },
    removeErrors(state) {
      removeAllErrors(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.isLoading = true;
        removeAllErrors(state);
      })

      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        const cards: Array<IWeather> = state.list;
        const existingCardIdx: number = cards.findIndex(
          (card: IWeather) => card.id === action.payload.id
        );
        if (existingCardIdx !== -1) {
          console.log("updated");
          state.list[existingCardIdx] = action.payload;
          return;
        }
        console.log("added");
        state.list = cards.concat(action.payload);
      })

      .addCase(fetchCurrentWeather.rejected, (state, action: any) => {
        state.isLoading = false;
        const errorMessage: string = action.payload.message;
        if (errorMessage === Errors.AlreadyAdded) {
          state.errors.searchBar = Errors.AlreadyAdded;
        } else if (errorMessage === "404") {
          state.errors.searchBar = Errors.NotFound;
        } else {
          state.errors.global = Errors.Unknown;
        }
      });
  },
});

export const { removeErrors, removeCard } = weatherCardsSlice.actions;

export default weatherCardsSlice.reducer;
