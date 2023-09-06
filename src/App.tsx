import "./App.css";
import Footer from "./components/Footer";
import Hash from "./components/Hash";

export default function App() {
    return (
        <div className="App">
            <img alt="logo" src="logo.png" width={50}></img>
            <h1>Online Poseidon Hash</h1>
            <Hash />
            <Footer />
        </div>
    );
}
