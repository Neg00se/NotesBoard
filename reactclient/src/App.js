import Register from "./components/Register";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import { DataProvider } from "./context/DataContext";
import NotePage from "./components/NotePage";
import EditNote from "./components/EditNote";
import Missing from "./components/Missing";
import NewNote from "./components/NewNote";

function App() {
  return (
    <main className="App">
      <DataProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route element={<RequireAuth />}>
              <Route index element={<Home />} />
              <Route path="note">
                <Route index element={<NewNote />} />
                <Route path=":id" element={<NotePage />} />
                <Route path="edit/:id" element={<EditNote />} />
              </Route>
            </Route>
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </DataProvider>
    </main>
  );
}

export default App;
