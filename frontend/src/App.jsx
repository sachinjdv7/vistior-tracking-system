import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 px-4">
      <Outlet />
    </div>
  );
};

export default App;
