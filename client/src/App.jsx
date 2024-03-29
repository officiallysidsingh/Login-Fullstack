import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import Components
import UserName from "./components/UserName";
import Password from "./components/Password";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import PageNotFound from "./components/PageNotFound";

/* Auth Middleware */
import {
  AuthorizeUserProfile,
  ProtectPasswordRoute,
} from "./middleware/Authorization";

// Root Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserName />,
  },
  {
    path: "/password",
    element: (
      <ProtectPasswordRoute>
        <Password />
      </ProtectPasswordRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: (
      <AuthorizeUserProfile>
        <Profile />
      </AuthorizeUserProfile>
    ),
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
