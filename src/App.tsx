import "./App.css";
import Hash from "./components/Hash";

export default function App() {
    return (
        <div className="App">
          <img src="logo.png" width={50}></img>
            <h1>Online Poseidon Hash</h1>
            <Hash />
        </div>
    );
}
