/** 
  All of the routes for the Smart Security Patrol Robot Cloud Platform React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

//  React layouts
import Dashboard from "layouts/dashboard";
import OrganizationTable from "layouts/organizationTable/organizationTable";
import UserTable from "layouts/organizationTable/userTable";
import RobotTable from "layouts/organizationTable/RobotTable";
import OrganizationDashboard from "layouts/dashboard/OrganizationDashboard";
import RobotDashboard from "layouts/dashboard/RobotDashboard";

import AlertmanagementTable from "layouts/alertmanagement/AlertManagementTable";

import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import ErrorPage from "layouts/error";
// @mui icons
import Icon from "@mui/material/Icon";
let isLoggin = JSON.parse(localStorage.getItem("user"))?.sessionID || null;
export const totalRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Organizations",
    key: "Organizations",
    icon: <Icon fontSize="small">Organizations</Icon>,
    route: "/organizations",
    component: <OrganizationTable />,
  },
  {
    name: "Organization",
    key: "Organization",
    icon: <Icon fontSize="small">Organization</Icon>,
    route: "/organization/:id",
    component: <OrganizationDashboard />,
  },

  {
    type: "collapse",
    name: "Users",
    key: "Users",
    icon: <Icon fontSize="small">Users</Icon>,
    route: "/users",
    component: <UserTable />,
  },
  {
    type: "collapse",
    name: "Robots",
    key: "Robots",
    icon: <Icon fontSize="small">Robots</Icon>,
    route: "/robots",
    component: <RobotTable />,
  },
  {
    type: "collapse",
    name: "Robot",
    key: "Robot",
    icon: <Icon fontSize="small">Robot</Icon>,
    route: "/robot/:id",
    component: <RobotDashboard />,
  },
  {
    type: "collapse",
    name: "Alert Management",
    key: "alerts",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/alerts",
    component: <AlertmanagementTable />,
  },
  // {
  //   type: "collapse",
  //   name: "Anomalies",
  //   key: "Anomalies",
  //   icon: <Icon fontSize="small">Anomalies</Icon>,
  //   route: "/anomalies",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "Simulation",
  //   key: "simulation",
  //   icon: <Icon fontSize="small">Simulation</Icon>,
  //   route: "/simulation",
  //   component: <Notifications />,
  // },
  {
    type: "collapse",
    name: "User",
    key: "user",
    icon: <Icon fontSize="small">User</Icon>,
    route: "/user/:userId",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: isLoggin ? "sign Out" : "Sign In",
    key: isLoggin ? "sign-out" : "sign-in",
    icon: <Icon fontSize="small">{isLoggin ? "signout" : "signin"}</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign out",
    key: "sign-out",
    icon: <Icon fontSize="small">sign out</Icon>,
    route: "/authentication/sign-in",
    component: () => {
      localStorage.clear();
    },
  },
  {
    type: "",
    name: "Error",
    key: "errorPage",
    icon: <Icon fontSize="small">Error</Icon>,
    route: "/error",
    component: <ErrorPage />,
  },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "createUser",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/createUser",
  //   component: <SignUp />,
  // },
];

export const UINav = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },

  {
    type: "collapse",
    name: "Robots",
    key: "Robots",
    icon: <Icon fontSize="small">Robots</Icon>,
    route: "/robots",
    component: <RobotTable />,
  },
  {
    type: "collapse",
    name: "Alert Management",
    key: "alerts",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/alerts",
    component: <AlertmanagementTable />,
  },
  {
    type: "collapse",
    name: "Organizations",
    key: "Organizations",
    icon: <Icon fontSize="small">Organizations</Icon>,
    route: "/organizations",
    component: <OrganizationTable />,
  },

  {
    type: "collapse",
    name: "Users",
    key: "Users",
    icon: <Icon fontSize="small">Users</Icon>,
    route: "/users",
    component: <UserTable />,
  },
  {
    type: "collapse",
    name: "Robots",
    key: "Robots",
    icon: <Icon fontSize="small">Robots</Icon>,
    route: "/robots",
    component: <RobotTable />,
  },
  {
    type: "collapse",
    name: "Sign out",
    key: "sign-out",
    icon: <Icon fontSize="small">Signout</Icon>,
    route: "/authentication/sign-in",
    component: () => {
      localStorage.clear();
    },
  },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
];

// export default {totalRoutes, UINav};
