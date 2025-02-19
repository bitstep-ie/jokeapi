export enum JokeSystemLanguage {
  Czech = "cs",
  German = "de",
  English = "en",
  Italian = "it",
  Russian = "ru"
}

export enum JokeLanguage {
  Czech = "cs",
  German = "de",
  English = "en",
  Spanish = "es",
  French = "fr",
  Portuguese = "pt"
}

export enum JokeFlag {
  NSFW = "nsfw",
  RELIGIOUS = "religious",
  POLITICAL = "political",
  RACIST = "racist",
  SEXIST = "sexist",
  EXPLICIT = "explicit"
}

export enum JokeType {
  ANY = "any",
  SINGLE = "single",
  TWO_PART = "twopart"
}

export enum JokeCategory {
  ANY = "Any",
  PROGRAMING = "Programming",
  MISC = "Misc",
  DARK = "Dark",
  PUN = "Pun",
  SPOOKY = "Spooky",
  CHRISTMAS = "Christmas"
}

export interface JokeBaseResponse {
  error: boolean;
  timestamp: number;
}

export interface JokeFlagsResponse extends JokeBaseResponse {
  flags: string[]
}

export interface JokeErrorResponse extends JokeBaseResponse {
  internalError: boolean;
  code: number;
  message: string;
  causedBy: string[];
  additionalInfo: string;
}

export class JokeError extends Error {
  jokeErrorResponse: JokeErrorResponse;

  constructor(jokeErrorResponse: JokeErrorResponse) {
    super(jokeErrorResponse.message || "JokeAPIError");
    this.jokeErrorResponse = jokeErrorResponse;

    Object.setPrototypeOf(this, JokeError.prototype);
  }
};

export interface JokePingResponse extends JokeBaseResponse {
  ping: string;
}

export interface JokeCategoriesResponse extends JokeBaseResponse{
  categories: string[];
  categoryAliases: JokeCategoryAliasesResponse[];
}

export interface JokeCategoryAliasesResponse {
  alias: string;
  resolved: string;
}

export interface Joke {
  category: string;
  type: JokeType;
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
}

export interface JokeResponse {
  error: boolean;
  // if amount > 1
  amount?: number;
  jokes?: Joke[];
  // if amount = 1
  category?: string;
  type?: JokeType;
  joke?: string; // if single part joke
  setup?: string; // if two part joke
  delivery?: string; // if two part joke
  flags?: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id?: number;
  safe?: boolean;
  lang?: string;
}
