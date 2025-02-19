import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { JokeAPI } from "../src/jokeClient";
import { JokeError, JokeErrorResponse, JokePingResponse, JokeResponse, JokeType } from "../src/jokeObjects"

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

  it("should get single type joke successfully", async () => {
    const mockJoke: JokeResponse = {
      "error": false,
      "category": "Dark",
      "type": JokeType.SINGLE,
      "joke": "I'll never forget my Granddad's last words to me just before he died. \"Are you still holding the ladder?\"",
      "flags": {
          "nsfw": false,
          "religious": false,
          "political": false,
          "racist": false,
          "sexist": false,
          "explicit": false
      },
      "id": 208,
      "safe": false,
      "lang": "en"
    };

    mock.onGet(/^joke\/Any/).reply((config) => {
      if(config.params?.blacklist || config.params?.contains) {
        return [400, "These params are not expected to be set for this test"]
      }
      if(config.params?.type != "single" || config.params?.lang != "en" || config.params?.amount != 1) {
        return [400, "These params are expected to be set for this test"]
      }
      return [200, mockJoke];
    });
    
    const response = await jokeAPI.getJoke(undefined, undefined, JokeType.SINGLE);
    expect(response).toEqual(mockJoke);
  });

  it("should get safe joke successfully", async () => {
    const mockJoke: JokeResponse = {
      "error": false,
      "category": "Programming",
      "type": JokeType.TWO_PART,
      "setup": "Why did the database administrator leave his wife?",
      "delivery": "She had one-to-many relationships.",
      "flags": {
          "nsfw": false,
          "religious": false,
          "political": false,
          "racist": false,
          "sexist": false,
          "explicit": false
      },
      "safe": true,
      "id": 265,
      "lang": "en"
    };

    mock.onGet(/^joke\/Any/).reply((config) => {
      const params = new Map<string, any>(Object.entries(config.params))
      
      if(config.params?.blacklist || config.params?.contains) {
        return [400, "These params are not expected to be set for this test"]
      }
      if(config.params?.type != "single" || config.params?.lang != "en" || config.params?.amount != 1 || params.get('safe-mode') != true ) {
        return [400, "These params are expected to be set for this test"]
      }
      return [200, mockJoke];
    });
    
    const response = await jokeAPI.getJoke(undefined, undefined, JokeType.SINGLE, undefined, undefined, undefined, true);
    expect(response).toEqual(mockJoke);
  });

});
