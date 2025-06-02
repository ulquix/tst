
import {createBrowserRouter,Outlet,RouterProvider} from "react-router-dom"
import Homepage from "./pages/Hompage"
import About from "./pages/About"
import Layout from "./components/Layout";
import Fun from "./pages/Fun";
import Settings from "./context/Settings";
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
<Settings>

<RouterProvider router={router}/>
</Settings>
      </>
  )
}

export default App
