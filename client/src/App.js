/* import Users from "./components/Users"; */
import { Routes, Route, Link } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import UserDetails from "./components/UserDetails";
import { lazy, Suspense } from "react";
const Users = lazy(() => import("./components/Users"));

function App() {
  return (
    <div>
      <Suspense fallback={<h1>loading....</h1>}>
        <Routes>
          <Route path="/" element={<Users />} />

          <Route path="createuser" element={<CreateUser />} />
          <Route path="userDetails/:id" element={<UserDetails />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
