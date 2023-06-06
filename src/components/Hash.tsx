import "./Hash.css";
import * as poseidon from "poseidon-lite";
import { useState } from "react";

export default () => {
    const [inputFields, setInputFields] = useState([{ value: "" }]);
    const [hash, setHash] = useState("");

    const computeHash = (values: { value: string }[]) => {
        const len = values.length;
        if (len > 16) {
            setHash("Cannot hash more than 16 elements");
            return;
        }
        for (let e of values) {
            if (e.value === "") {
                setHash("");
                return;
            }
        }
        try {
            setHash(
                (poseidon as any)
                    [`poseidon${len}`](values.map((n) => BigInt(n.value)))
                    .toString()
            );
        } catch (_) {
            setHash("Cannot convert characters");
        }
    };

    const handleInputChange = (index: number, event: any) => {
        const values = [...inputFields];
        values[index].value = event.target.value;
        setInputFields(values);
        computeHash(values);
    };

    const handleAddFields = () => {
        setInputFields([...inputFields, { value: "" }]);
        setHash("");
    };

    const handleRemoveFields = (index: number) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
        computeHash(values);
    };

    return (
        <div>
            {inputFields.map((inputField, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={inputField.value}
                        onChange={(event) => handleInputChange(index, event)}
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveFields(index)}
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button type="button" onClick={handleAddFields}>
                Add Field
            </button>
            <p className="HashOut">{hash}</p>
        </div>
    );
};
