import React from 'react'

import Home from "../pages/Home";
import LeaderBoard from "../pages/LeaderBoard";
import Login from "../pages/Login";
import Register from "../pages/Register";

const ROUTES = [
  {
    path: "/login",
    key: "login",
    component: Login,
    exact: true,
    isProtected : false 
  },
  {
    path: "/register",
    key: "register",
    component: Register,
    exact: true,
    isProtected : false
  },
  {
    path: "/",
    key: "home",
    component: Home,
    exact: true,
    isProtected : true
  },
  {
    path: "/leaderBoard",
    key: "leaderBoard",
    component: LeaderBoard,
    exact: true,
    isProtected : true
  },
  {
    key: "notFound",
    component: () => <h1>404 Not Found!!</h1>,
    exact: true,
    isProtected : false
  },
];

export default ROUTES;