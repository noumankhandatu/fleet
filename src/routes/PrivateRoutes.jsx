import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLoader from "../components/atom/AppLoader";

const Dashboard = lazy(() => import("../pages/dashboard"));

const PrivateRoutes = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <Router>
        <Routes>
          {["/", "/map-dashboard"].map((path, id) => (
            <Route key={id} path={path} element={<Dashboard />} />
          ))}
          <Route path={"*"} element={`404 Error Go to Home Try again`} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default PrivateRoutes;
