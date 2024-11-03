import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Signup from "./pages/signup";
const client = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <header />
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <div className="bg-blue-500 text-white text-center p-10">
          <h1 className="text-4xl font-bold">Tailwind CSS is Working!</h1>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
