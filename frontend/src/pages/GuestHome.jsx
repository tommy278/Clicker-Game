import { useState, useEffect } from "react";
import { powerUps, earns, rebirthStats, rebirthPrice, prices } from "../constants";
import { showMessage } from '../helpers';
import star from '../assets/star.jpg';
import clickFile from '../assets/click_sound.mp3'

function Guest() {
    const [counter, setCounter] = useState(0);
    const [cash, setCash] = useState(100);
    const [level, setLevel] = useState(1);
    const [rebirth, setRebirth] = useState(0);
    const [message, setMessage] = useState({text: "", type:""});
    const [nextIndex, setNextIndex] = useState(0);

    // Auto-increment cash and counter like the main page
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prev => Math.floor(prev + (rebirthStats[rebirth] * (level + 1))));
            setCash(prev => parseFloat((prev + earns[level]).toFixed(2)));
        }, 3000);

        return () => clearInterval(interval);
    }, [level, rebirth]);

    const handlePowerUp = () => {
        if (nextIndex >= powerUps.length) return;

        const powerUp = powerUps[nextIndex];
        const newCount = counter + powerUp.effect;
        const reb = Math.floor(newCount * rebirthStats[rebirth]);
        const clickSound = new Audio(clickFile)

        setCounter(reb);
        clickSound.play()
        setCash(prev => parseFloat((prev + earns[level]).toFixed(2)));
    };

    const buyMultiplier = () => {
        const price = prices[level];
        if (cash >= price && level < powerUps.length) {
            setLevel(prev => prev + 1);
            setCash(prev => parseFloat((prev - price).toFixed(2)));
            setNextIndex(prev => prev + 1);
            showMessage(`Multiplier successfully bought!`, "success", setMessage);
            console.log(message.type)
        } else {
            showMessage("Not enough cash for multiplier", "error", setMessage);
        }
    };

    const handleRebirth = () => {
        const price = rebirthPrice[rebirth];
        if (counter >= price) {
            setRebirth(prev => prev + 1);
            setCounter(0);
            setCash(0);
            setLevel(1);
            setNextIndex(0);
            showMessage("Successfully rebirthed!", "sucess", setMessage);
        } else {
            showMessage("Not enough cash to rebirth", "error", setMessage);
        }
    };

    return (
        <div>
            {message.text && (
            <p
                className={`flex justify-center my-4 ${
                message.type === "success" ? "text-green-500" : "text-red-500"
                }`}
            >
                {message.text}
            </p>
            )}
            <div className="flex justify-between items-center mb-5">
                <p className="text-3xl ml-2"><span className="font-bold text-white">Level</span> <span className="font-semibold text-white">{level}</span></p>
                <p className="text-green-700 mx-5">Rebirth Multiplier: {rebirthStats[rebirth]}X</p>
            </div>
           <div className="flex flex-wrap justify-between mr-5 ml-2 text-white text-[clamp(1rem,3vw,2rem)]">
                <p><span className="font-bold">Score</span> <span className="font-semibold">{counter}</span></p>
                <p><span className="font-bold">Cash</span>: <span className="font-semibold">${cash}</span></p>
                <p><span className="font-bold text-white">Rebirth:</span> <span className="font-semibold">{rebirth}</span></p>
            </div>

            <button 
            onClick={() => handlePowerUp(powerUps[level])}
            className="relative block mx-auto bg-blue-600 hover:scale-105 transition-transform text-white rounded-full mb-6 
            text-[clamp(1.5rem,5vw,3rem)] 
            w-[clamp(120px,30vw,550px)] 
            h-[clamp(120px,30vw,550px)] 
            flex items-center justify-center overflow-hidden my-10"
            >
                <img
                    src={star}
                    alt="Click"
                    className="w-full h-full object-cover"
                />
            </button>

            <p className="text-blue-700 text-lg flex justify-center mb-5">Current Increment: {powerUps[nextIndex].name}</p>
            <button onClick={buyMultiplier}
                disabled={cash < prices[level]|| level >= powerUps.length}
                className={`block mx-auto bg-blue-600 text-[clamp(0.5rem,4vw,2rem)] hover:scale-105 transition-transform rounded-lg ${
                    cash < prices[level]
                    ? "text-red-700"
                    : "text-green-600"

                }`}
            > Buy Multiplier (${prices[level]})</button>

            {counter >= rebirthPrice[rebirth] && (
                <button 
                onClick={handleRebirth}
                className="block mx-auto bg-blue-600 rounded-lg my-5 text-orange-700 text-[clamp(0.5rem,4vw,2rem)] hover:scale-105 transition-transform"
                >
                    Rebirth
                </button>
            )}

            {counter <= rebirthPrice[rebirth] ? (
                <p className="flex justify-end mr-5 text-yellow-700 my-10">{rebirthPrice[rebirth] - counter} till next rebirth</p>
            ): <p className="flex justify-end mr-5 text-yellow-400 my-10">You can rebirth now!!</p>
            }

        </div>
    );
}

export default Guest;