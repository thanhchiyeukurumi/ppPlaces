import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AllPlace from "./pages/place/AllPlace";
import PlaceDetail from "./pages/place/PlaceDetail";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/dashbroad/Dashboard";

function App(){
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="places" element={<AllPlace />} />
        <Route path="places/:id" element={<PlaceDetail />} />
        <Route path="login" element={<AuthPage />} />
        <Route path="register" element={<AuthPage />} />
        <Route path="dashboard" element={<Dashboard />}></Route>

        <Route path="*" element={<h1>Not Found</h1>} /> {/*to lazy to creat a page */}
      </Route>
    </Routes>
  )
}

export default App;
