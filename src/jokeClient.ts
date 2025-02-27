import axios, { AxiosInstance } from "axios";
import {
  JokeCategoriesResponse,
  JokeCategory,
  JokeError,
  JokeErrorResponse,
  JokeFlag,
  JokeFlagsResponse,
  JokeLanguage,
  JokePingResponse,
  JokeResponse,
  JokeType,
} from "./jokeObjects";

export class JokeAPI {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = "https://v2.jokeapi.dev/") {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  async ping(): Promise<JokePingResponse> {
    const url = "ping";
    try {
      const response = await this.axiosInstance.get<JokePingResponse>(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const jokeErrorResponse = error.response.data as JokeErrorResponse;
        throw new JokeError(jokeErrorResponse);
      } else {
        throw error;
      }
    }
  }

  async getCategories(): Promise<JokeCategoriesResponse> {
    const url = "categories";
    try {
      const response =
        await this.axiosInstance.get<JokeCategoriesResponse>(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const jokeErrorResponse = error.response.data as JokeErrorResponse;
        throw new JokeError(jokeErrorResponse);
      } else {
        throw error;
      }
    }
  }

  async getFlags(): Promise<JokeFlagsResponse> {
    const url = "flags";
    try {
      const response = await this.axiosInstance.get<JokeFlagsResponse>(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const jokeErrorResponse = error.response.data as JokeErrorResponse;
        throw new JokeError(jokeErrorResponse);
      } else {
        throw error;
      }
    }
  }

  async getJoke(
    category: JokeCategory[] = [JokeCategory.ANY],
    banFlags: JokeFlag[] = [],
    type: JokeType = JokeType.ANY,
    lang: JokeLanguage = JokeLanguage.English,
    contains: string = "",
    amount: number = 1,
    safemode: boolean = false,
  ): Promise<JokeResponse> {
    let url = `joke/${category.join(",")}`;
    if (safemode) {
      url += "?safe-mode&";
    }
    let params = {
      blacklistFlags: safemode ? "" : banFlags.join(","),
      type: type === JokeType.ANY ? "" : type,
      contains: encodeURIComponent(contains),
      lang: lang,
      amount: amount,
    };

    try {
      const response = await this.axiosInstance.get<JokeResponse>(url, {
        params,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const jokeErrorResponse = error.response.data as JokeErrorResponse;
        throw new JokeError(jokeErrorResponse);
      } else {
        throw error;
      }
    }
  }

  async getRandomJoke(): Promise<JokeResponse> {
    return this.getJoke();
  }
}
