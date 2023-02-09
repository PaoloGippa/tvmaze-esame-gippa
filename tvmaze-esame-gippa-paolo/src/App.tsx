import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";
import "./App.css";
import profilePicPh from "./assets/profile_pic_ph.png";
import useFirebaseAuth from "./hooks/useFirebaseAuth";

const router: any = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
  },

  {
    path: "/:showId",
    element: <DetailPage />,
  },
]);

function App() {
  const [user, isLoading, logout, signInWithGoogle] = useFirebaseAuth();
  return (
    <div className="App">
      {!!user ? (
        <>
          <button className="border" onClick={logout}>
            Logout
          </button>
          <h1>{user.name}</h1>
          <h2>{user.email}</h2>
          <img src={user.profilePic || profilePicPh} />
          <RouterProvider router={router} />
        </>
      ) : (
        <button className="border" onClick={signInWithGoogle}>
          Sign In With Google
        </button>
      )}
    </div>
  );
}

export default App;
