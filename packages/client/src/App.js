import "./App.css";
import { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.js";
import LoginRegister from "./pages/Login-register";
import { UserContext } from "./components/UserContext";
import TodoList from "./pages/TodoList";

function App() {
  const [user, setUser] = useState(null);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="" element={<LoginRegister />} />
        <Route path="/list" element={<TodoList />} />
      </Route>
    )
  );
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
