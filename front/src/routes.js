import Dashboard from "layouts/dashboard";

const routes = [
    {
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      icon: <Icon fontSize="small">dashboard</Icon>,
      route: "/dashboard",
      component: <Dashboard />,
    }
];

export default routes;