import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { JokeAPI } from "../src/jokeClient";
import { JokeCategoriesResponse, JokeError, JokeErrorResponse, JokeFlagsResponse, JokePingResponse, JokeResponse } from "../src/jokeObjects"

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

  it("should getFlags successfully", async () => {
    const mockFlags: JokeFlagsResponse = {
      error: false,
      flags: [
        "nsfw",
        "religious",
        "political",
        "racist",
        "sexist",
        "explicit"
      ],
      timestamp: 1739918155694
    };

    mock.onGet("flags").reply(200, mockFlags);

    const response = await jokeAPI.getFlags();
    expect(response).toEqual(mockFlags);
  });

  it("should handle flags errors gracefully", async () => {
    let customError: JokeErrorResponse = {
      error: true,
      internalError: true,
      code: 124,
      message: "Sorry this is an internal error",
      causedBy: ["cause 1", "cause 2"],
      additionalInfo: "More information here",
      timestamp: 1233321
    };
    mock.onGet("flags").reply(500, customError);

    await expect(jokeAPI.getFlags()).rejects.toEqual(
      new JokeError(customError)
    )
  });

});
