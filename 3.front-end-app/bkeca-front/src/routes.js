// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Classrooms from "views/Classrooms/Classrooms.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import Classroom from "views/Classrooms/Classroom/Classroom.jsx";
import Exercises from "views/Classrooms/Classroom/Excercise.jsx";
import People from "views/Classrooms/Classroom/People.jsx";

import FullScreenDialog from "components/FullScreenDialog/FullScreenDialog.jsx";

export const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    slash: true
  },
  {
    path: "/classrooms", name: "Classrooms", icon: "content_paste", component: Classrooms, layout: "/admin",
    childLink: [
      { path: "/classrooms/:id/", name: "<ClassroomName>", icon: Notifications, component: Classroom, layout: "/admin", exact: true, hideSidebar: true },
      { path: "/classrooms/:id/ex", name: "<ClassroomName>", icon: Notifications, component: Exercises, layout: "/admin", exact: true, hideSidebar: true },
      { path: "/classrooms/:id/all", name: "<ClassroomName>", icon: Notifications, component: People, layout: "/admin", exact: true, hideSidebar: true },
      { path: "/classrooms/:id/gr", name: "<ClassroomName>", icon: Notifications, component: FullScreenDialog, layout: "/admin", exact: true, hideSidebar: true }
    ]
  },
  {
    path: "/typography",
    name: "Schedule",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  }
];

export const classroomsRoutes = [
];
