import "./App.css";
import { poseidon1 } from "poseidon-lite";
import { useState } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const computeHash = () => {
    if (inputValue === "") return;
    try {
      return poseidon1([BigInt(inputValue)]).toString();
    } catch (e) {
      return "Cannot convert characters";
    }
  };

  return (
    <div className="App">
      <h1>Poseidon Hash</h1>
      <input value={inputValue} onChange={handleChange} />
      <h2>Hash value: {computeHash()}</h2>
    </div>
  );
}
