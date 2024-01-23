// App component

import "./App.css";
import { Route, Routes } from "react-router-dom";
import RoutesList from "./routes";
import NavBar from "./components/NavBar";
import { CsvDataProvider } from "./context";

export default function App() {
  const renderRoutes = () => {
    const renderRoute = (Component) => {
      return <Component />;
    };

    return RoutesList.map((route) => (
      <Route element={renderRoute(route.component)} key={route.name} path={route.path} />
    ));
  };

  return (
    <>
      <CsvDataProvider>
        <NavBar />
        <div className="App">
          <Routes>{renderRoutes()}</Routes>
        </div>
      </CsvDataProvider>
    </>
  );
}
