import Users from "./components/Users";
import { Routes, Route, Link } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="createuser" element={<CreateUser />} />
        <Route path="userDetails/:id" element={<UserDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
