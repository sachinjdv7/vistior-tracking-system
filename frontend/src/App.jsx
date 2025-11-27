import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">
      {/* ✅ Navbar always at TOP */}
      <Navbar />

      {/* ✅ Page Content grows in middle */}
      <main className="flex-1 flex items-center justify-center px-4">
        <Outlet />
      </main>

      {/* ✅ Footer always at BOTTOM */}
      <Footer />
    </div>
  );
};

export default App;
