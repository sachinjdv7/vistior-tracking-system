import Login from "./components/Login";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        Login
      </h1>

      <Login />
    </div>
  );
};

export default App;
