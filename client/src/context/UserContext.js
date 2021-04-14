import React from "react";

const UserContext = React.createContext({
  loggedIn: false,
  user: null,
  logIn: () => {},
  logOut: () => {},
  categories: [],
});

export default UserContext;
