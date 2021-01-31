import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import clsx from "clsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

let menu = [
  {
    title: "Dashboard",
    path: "/",
    icon: <InboxIcon />,
  },
  {
    title: "MointerningTool",
    path: "/mointerningtool",
    icon: <SettingsApplicationsIcon />,
  },
  {
    title: "System Setting",
    path: "/systemsettings",
    icon: <SettingsApplicationsIcon />,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <AssessmentIcon />,
    children: [
      {
        title: "Dump Report",
        path: "/reports",
        icon: <AssessmentIcon />,
      },
      {
        title: "Agent Performance Custom Report",
        path: "/agentperformancereports",
        icon: <AssessmentIcon />,
      },
    ],
  },
];

function CustomDrawer({ open, setOpen }) {
  const classes = useStyles();
  const theme = useTheme();
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [collapseOpen, setCollapseOpen] = useState(false);

  const handleClick = () => {
    setCollapseOpen(!collapseOpen);
  };

  return (
    <div>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menu.map((item) => {
            if (item.children) {
              return (
                <>
                  <ListItem button onClick={handleClick}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                    {collapseOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((menuitem) => (
                        <Link
                          to={menuitem.path}
                          style={{ textDecoration: "none", color: "initial" }}
                        >
                          <ListItem button className={classes.nested}>
                            <ListItemIcon>{menuitem.icon}</ListItemIcon>
                            <ListItemText primary={menuitem.title} />
                          </ListItem>
                        </Link>
                      ))}
                    </List>
                  </Collapse>
                </>
              );
            }
            return (
              <Link
                to={item.path}
                style={{ textDecoration: "none", color: "initial" }}
              >
                <ListItem button>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}

export default CustomDrawer;
