// import IWeatherCardsState from "../../types/weatherCardsState";
// import { IFetchingWeatherArguments } from "../../types/fetching";
import weatherCardsReducer, {
  removeErrors,
  removeCard,
  fetchCurrentWeather
} from "../../redux/slices/weatherCardsSlice";

// const argsWithError = {
//   city: "such city is not exist",

// };

describe("counter reducer", () => {
  const initialState = {
    list: [],
    isLoading: false,
    errors: {
      searchBar: null,
      card: null,
      global: null,
    },
  };
  it("should handle initial state", () => {
    expect(weatherCardsReducer(undefined, { type: "unknown" })).toEqual({
      list: [],
      isLoading: false,
      errors: {
        searchBar: null,
        card: null,
        global: null
      }
    });
  });

  it("should handle 404 error", () => {
    const actual = weatherCardsReducer(initialState, fetchCurrentWeather("such city is not exist"));
    console.log(actual)
  });

  // it("should handle decrement", () => {
  //   const actual = weatherCardsReducer(initialState, decrement());
  //   expect(actual.value).toEqual(2);
  // });

  // it("should handle incrementByAmount", () => {
  //   const actual = weatherCardsReducer(initialState, incrementByAmount(2));
  //   expect(actual.value).toEqual(5);
  // });
});
