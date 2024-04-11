import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1 className="text-black">HomePage</h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/dashboard">Dashboard</Link>
    </>
  );
};

export default HomePage;
