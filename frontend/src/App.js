import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./login";

function App() {
  async function getLogin() {
    const login = await fetch("http://localhost:8000/auth/login");
  }

  getLogin();

  return (
    <div className="App">
      <header className="App-header">
        <LoginForm>Login</LoginForm>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
