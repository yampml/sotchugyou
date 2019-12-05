// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Classrooms from "views/Classrooms/Classrooms.js";
import Classroom from "views/Classrooms/Classroom/Classroom.jsx";
import Exercises from "views/Classrooms/Classroom/Excercise.jsx";
import People from "views/Classrooms/Classroom/People.jsx";

import FullScreenDialog from "components/FullScreenDialog/FullScreenDialog.jsx";

export const studentRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/stu"
  },
  {
    path: "/classrooms", name: "Classrooms", icon: "content_paste", component: Classrooms, layout: "/stu",
    childLink: [
      { path: "/classrooms/:id/", name: "<ClassroomName>", icon: Notifications, component: Classroom, layout: "/stu", exact: true, hideSidebar: true },
      { path: "/classrooms/:id/ex", name: "<ClassroomName>", icon: Notifications, component: Exercises, layout: "/stu", exact: true, hideSidebar: true },
      { path: "/classrooms/:id/all", name: "<ClassroomName>", icon: Notifications, component: People, layout: "/stu", exact: true, hideSidebar: true },
      { path: "/classrooms/:id/gr", name: "<ClassroomName>", icon: Notifications, component: FullScreenDialog, layout: "/stu", exact: true, hideSidebar: true }
    ]
  },
  {
    slash: true
  },
  {
    path: "/user",
    name: "Profile",
    icon: Person,
    component: UserProfile,
    layout: "/stu"
  },
];

export const classroomsRoutes = [
];
