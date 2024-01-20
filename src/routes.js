import Dashboard from "./pages/Dashboard";
import Visualization from "./pages/Visualization";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/visualization",
    name: "Visualization",
    component: Visualization
  }
];

export default routes;
