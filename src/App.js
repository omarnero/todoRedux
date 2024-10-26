import AddTodo from "./Pages/AddTood/AddTodo";
import EditTodo from "./Pages/EditTodo/EditTodo";
import ViewTodo from "./Pages/ViewTodo/ViewTodo";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  { path: "/", element: <ViewTodo /> },
  { path: "/addtodo", element: <AddTodo /> },
  { path: "/edittodo/:id", element: <EditTodo /> },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
