const Login = () => {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        Login
      </h1>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-sm border p-6 shadow-lg">
        <label className="label">Email</label>
        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="Email"
        />

        <label className="label mt-2">Password</label>
        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Password"
        />

        <button className="btn btn-neutral mt-6 w-full">Login</button>
      </fieldset>
    </>
  );
};

export default Login;
