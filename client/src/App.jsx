import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import Navigation from "./pages/navigation";

const client = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          
        </Routes>
        
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
