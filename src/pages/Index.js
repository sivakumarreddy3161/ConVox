import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import { Switch, Route } from "react-router-dom";
import AppBar from "../components/Layout/AppBar";
import CustomDrawer from "../components/Layout/Drawer";
import Home from "./Home";
import Reports from "./Reports";
import Mointerningtool from "./Mointerningtool";
import Systemsettings from "./Systemsettings";
import Agentperformancereports from "./Agentperformancereports";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar setOpen={setOpen} open={open} />
      <CustomDrawer open={open} setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/reports">
            <Reports />
          </Route>
          <Route path="/agentperformancereports">
            <Agentperformancereports />
          </Route>
          <Route path="/mointerningtool">
            <Mointerningtool />
          </Route>
          <Route path="/systemsettings">
            <Systemsettings />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
