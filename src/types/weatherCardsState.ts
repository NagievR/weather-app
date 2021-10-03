import IErrors from "./errors";
import IWeather from "./weather";

export default interface IWeatherCardsState {
  list: Array<IWeather>;
  isLoading: boolean;
  errors: IErrors;
}
