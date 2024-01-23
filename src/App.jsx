import { Suspense, lazy } from "react";
import AppLoader from "./components/atom/AppLoader";
import { useSelector } from "react-redux";

const PublicRoutes = lazy(() => import("./routes/PublicRoutes"));
const PrivateRoutes = lazy(() => import("./routes/PrivateRoutes"));

export default function App() {
  const authToken = useSelector((state) => state.auth.token);

  return (
    <Suspense fallback={<AppLoader />}>{authToken ? <PrivateRoutes /> : <PublicRoutes />}</Suspense>
  );
}
