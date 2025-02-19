import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { JokeAPI } from "../src/jokeClient";
import { JokeCategoriesResponse, JokeError, JokeErrorResponse, JokePingResponse, JokeResponse } from "../src/jokeObjects"

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

  it("should getCategories successfully", async () => {
    const mockCategories: JokeCategoriesResponse = {
      error: false,
      categories: [
          "Any",
          "Misc",
          "Programming",
          "Dark",
          "Pun",
          "Spooky",
          "Christmas"
      ],
      categoryAliases: [
          {
              alias: "Miscellaneous",
              resolved: "Misc"
          },
          {
              alias: "Coding",
              resolved: "Programming"
          },
          {
              alias: "Development",
              resolved: "Programming"
          },
          {
              alias: "Halloween",
              resolved: "Spooky"
          }
      ],
      timestamp: 1739918155694
    };

    mock.onGet("categories").reply(200, mockCategories);

    const response = await jokeAPI.getCategories();
    expect(response).toEqual(mockCategories);
  });

  it("should handle categories errors gracefully", async () => {
    let customError: JokeErrorResponse = {
      error: true,
      internalError: true,
      code: 124,
      message: "Sorry this is an internal error",
      causedBy: ["cause 1", "cause 2"],
      additionalInfo: "More information here",
      timestamp: 1233321
    };
    mock.onGet("categories").reply(500, customError);

    await expect(jokeAPI.getCategories()).rejects.toEqual(
      new JokeError(customError)
    )
  });

});
