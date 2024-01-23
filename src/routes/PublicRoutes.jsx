import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLoader from "../components/atom/AppLoader";

const SignIn = lazy(() => import("../pages/login"));

const PublicRoutes = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <Router>
        <Routes>
          {["/", "signin"].map((path, id) => (
            <Route key={id} path={path} element={<SignIn />} />
          ))}
          <Route path={"*"} element={`404 Error Go to Home Try again`} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default PublicRoutes;
