import cookie from "js-cookie";

export const setCookie = (token) => {
  const date = new Date();
  const minutes = 15;
  date.setTime(date.getTime() + minutes * 60 * 1000);
  cookie.set("token", token, {
    expires: date,
    sameSite: "strict",
    path: "/",
    domain: "localhost",
  });
};

export const removeCookie = () => {
  cookie.remove("token");
};

export const getCookie = () => {
  const token = cookie.get("token");
  return token;
};
