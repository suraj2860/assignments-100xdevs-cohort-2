import { useRef } from "react";
import { useEffect } from "react";

// Create a component with a text input field and a button. When the component mounts or the button is clicked, 
//automatically focus the text input field using useRef.

export function Assignment1() {
    const ref = useRef(null);
    useEffect(() => {
        ref.current.focus();
    }, [ref]);

    const handleButtonClick = () => {
        ref.current.focus();
    };

    return (
        <div>
            <input type="text" ref={ref} placeholder="Enter text here" />
            <button onClick={handleButtonClick}>Focus Input</button>
        </div>
    );
};
