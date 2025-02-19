import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { JokeAPI } from "../src/jokeClient";
import {
  JokeError,
  JokeErrorResponse,
  JokePingResponse,
  JokeResponse,
} from "../src/jokeObjects";

describe("JokeAPI", () => {
  let mock: MockAdapter;
  let jokeAPI: JokeAPI;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    jokeAPI = new JokeAPI();
  });

  afterEach(() => {
    mock.reset();
  });

  it("should ping successfully", async () => {
    const mockPing: JokePingResponse = {
      error: false,
      ping: "pong",
      timestamp: 1739902953422,
    };

    mock.onGet("ping").reply(200, mockPing);

    const response = await jokeAPI.ping();
    expect(response).toEqual(mockPing);
  });

  it("should handle ping errors gracefully", async () => {
    let customError: JokeErrorResponse = {
      error: true,
      internalError: true,
      code: 124,
      message: "Sorry this is an internal error",
      causedBy: ["cause 1", "cause 2"],
      additionalInfo: "More information here",
      timestamp: 1233321,
    };
    mock.onGet("ping").reply(500, customError);

    await expect(jokeAPI.ping()).rejects.toEqual(new JokeError(customError));
  });
});
