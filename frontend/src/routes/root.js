import { Link } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <h1>The Store</h1>
      <nav>
        <ul>
          <li>
            <Link to={`/auth/login`}>Login</Link>
          </li>
          <li>
            <Link to={`/auth/register`}>Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Root;
