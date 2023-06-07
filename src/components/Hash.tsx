import "./Hash.css";
import * as poseidon from "poseidon-lite";
import { useState } from "react";

export default () => {
    const [inputFields, setInputFields] = useState([{ value: "" }]);
    const [hash, setHash] = useState("");

    const computeHash = (values: { value: string }[]) => {
        const len = values.length;
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
        const values = [...inputFields, {value: ""}];
        const len = values.length;
        if (len > 16) {
            setHash("Cannot hash more than 16 elements");
            return;
        }
        setInputFields(values);
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
                        className="InputField"
                        type="text"
                        value={inputField.value}
                        onChange={(event) => handleInputChange(index, event)}
                    />
                    <button
                        className="RemoveButton"
                        type="button"
                        onClick={() => handleRemoveFields(index)}
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button
                className="AddButton"
                type="button"
                onClick={handleAddFields}
            >
                Add Field
            </button>
            <div>
                <h2>Poseidon Hash Result:</h2>
                <textarea
                    className="HashOut"
                    cols={40}
                    rows={2}
                    value={hash}
                ></textarea>
            </div>
        </div>
    );
};
