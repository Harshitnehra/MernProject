import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./Components/Header";
import Addblog from "./pages/Addblog";
import Addcategory from "./pages/Addcategory";
import Singleblog from "./pages/singleblog";
import PrivateRoute from "./services/Protactedfiel";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-blog" element={<Addblog />} />
          <Route path="/add-category" element={<Addcategory />} />
          <Route path="/blog/:id" element={<Singleblog />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
