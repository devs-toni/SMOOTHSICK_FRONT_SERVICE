import { Link } from 'react-router-dom'

const Login = () => {


  return (
    <>
      <form        className="flex flex-col gap-4 max-w-md px-10 pb-8 pt-7 m-auto bg-neutral-700 rounded-md">
        <p className="text-2xl font-bol align-content:center;">To continue, sign in to Smoothsic </p>
        <input
          type="text"
          placeholder="email"
          id="email"
          name="email"
          className="text-black"
          required={true}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          name="password"
          className="text-black"
          required={true}
        />

        <p>
          Don't have an Smoothsic account? <br />
          <Link to="/singup">Register free</Link>
        </p>

        <button
          href="#"
          type="submit"
          className="bg-white text-black only: transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  font-bold py-2 px-4 rounded-full"
        >
         Sign in with Google
        </button>
       
        <button
          href="#"
          type="submit"
          className="bg-green-400 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  text-white font-bold py-2 px-4 rounded-full"
        >
          Sign in
        </button>
      </form>
    </>
  );
};

export default Login;
