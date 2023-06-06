import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";

function RootLayout() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>Todo List</h1>
          {user ? <NavLink>{user.username}</NavLink> : <></>}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
