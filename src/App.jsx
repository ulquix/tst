
import {createBrowserRouter,Outlet,RouterProvider} from "react-router-dom"
import Homepage from "./pages/Hompage"
import Settings from "./pages/Settings"
import About from "./pages/About"
import Layout from "./components/Layout";
import Fun from "./pages/Fun";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "settings", element: <Settings /> },
      { path: "about", element: <About /> },
      {path:'fun',element:<Fun/>}
    ]
  }
]);
function App() {
  return (
    <>
<RouterProvider router={router}/>
      </>
  )
}

export default App
