import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import showToast from "crunchy-toast";

import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { getAuth, signOut } from "firebase/auth";

function Navbar() {
  const [isUserAuthenticated, setIsserAuthenticated] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (!user) {
        return;
      }
      if (user) {
        setIsserAuthenticated(user?.displayName);
      } else {
        setIsserAuthenticated("user");
        window.location.href = "/login";
      }
    });
  }, []);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      showToast("Logout successful", "warning", 4000);
      // Redirect to the login page after the toast message is displayed
      window.location.href = "/login";
    } catch (error) {
      showToast(error.message, "warning", 4000);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Dummy Post 📃
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <List>
                  <ListItem
                    button
                    component={Link}
                    to="/"
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/login"
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary="Login" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/signup"
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary="Signup" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/post"
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary="Post" />
                  </ListItem>
                  {isUserAuthenticated ? (
                    <Button color="inherit">
                      Hello 👋 {isUserAuthenticated}
                    </Button>
                  ) : (
                    <Button> User</Button>
                  )}
                  {isUserAuthenticated ? (
                    <Button color="inherit" onClick={handleLogout}>
                      Log Out
                    </Button>
                  ) : null}
                </List>
              </Drawer>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
              <Button color="inherit" component={Link} to="/post">
                Post
              </Button>

              {isUserAuthenticated ? (
                <Button color="inherit">Hello 👋 {isUserAuthenticated}</Button>
              ) : (
                <Button> User</Button>
              )}
              {isUserAuthenticated ? (
                <Button color="inherit" onClick={handleLogout}>
                  Log Out
                </Button>
              ) : null}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
