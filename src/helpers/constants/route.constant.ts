export enum ROUTE_NAME {
  LOGIN = "login",
  SIGNUP = "signup",
  MAIN = "",
}

export const APP_ROUTE = {
  LOGIN: ROUTE_NAME.LOGIN,
  SIGNUP: ROUTE_NAME.SIGNUP,
  MAIN: {
    self: ROUTE_NAME.MAIN,
    HOME: `${ROUTE_NAME.MAIN}`,
    EXPLORE: `${ROUTE_NAME.MAIN}/explore`,
    MESSAGES: `${ROUTE_NAME.MAIN}/messages`,
    PROFILE: (id: string) => `${ROUTE_NAME.MAIN}/profile/${id}`,
    SEARCH_POST: `${ROUTE_NAME.MAIN}/search-post`,
  },
};
