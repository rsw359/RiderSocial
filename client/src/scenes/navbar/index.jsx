import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch(); //used to dispatch actions from the reducers
  const navigate = useNavigate(); //used to navigate to different routes
  const user = useSelector((state) => state.user); //used to get the user from the redux store
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); //used to check if the screen is mobile or not\
  const theme = useTheme(); //used to get the theme from theme.js

  return <div>Navbar</div>;
};

export default NavBar;
