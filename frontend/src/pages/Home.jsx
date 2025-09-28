import {useState, useEffect} from 'react';
import{prices, earns, powerUps, rebirthPrice, rebirthStats} from '../constants';
import {showMessage, patchProfile, fetchProfile} from '../helpers';
import star from '../assets/star.jpg';
import clickFile from '../assets/click_sound.mp3'

function Home() {
    const [counter, setCounter] = useState(0);
    const [cash, setCash] = useState(0);
    const [message, setMessage] = useState("");
    const [level, setLevel] = useState(0);
    const [rebirth, setRebirth] = useState(0);
    const token = localStorage.getItem("ACCESS_TOKEN");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        showMessage("Succesfully logged in", "success", setMessage)
        if (!token) {
            console.error("Token was not found")
            return
        }
        
        const fetchInfo = async () => {
        try {
            const data = await fetchProfile(token)
            setLevel(data.level)
            setCounter(data.counter)
            setCash(parseFloat(data.cash))
            setRebirth(data.rebirth)

        } catch(error) {
            console.error("Something went wrong", error)
        } finally {
            setIsLoading(false)
        }
    }
    fetchInfo();

    const intervalId = setInterval(fetchInfo, 3000);
    return () => clearInterval(intervalId)

    }, [])

    const updateCounter = async (powerUps) => {
        let newCount = counter + powerUps.effect
        let reb = Math.floor(newCount * rebirthStats[rebirth])
        let newCash = parseFloat(cash) + earns[level]
        const clickSound = new Audio(clickFile)

        try {
            const updated = await patchProfile(token, {
                cash: parseFloat(newCash.toFixed(2)),
                counter: reb
            })

        setCash(updated.cash)
        setCounter(updated.counter)
        clickSound.play()

        } catch(error) {
            console.error("Something went wrong with the request", error)
        }
    }

    const buyMultiplier = async () => {
        setIsLoading(true)
        try {
            const updated = await patchProfile(token, {
                level: level + 1,
                cash: cash - prices[level]
            })

            setLevel(updated.level)
            setCash(updated.cash)
            showMessage("Multiplier successfully bought", "success", setMessage)

        } catch(error) {
            console.error("Something went wrong")
            showMessage("Not enough cash for multiplier", "error", setMessage)
        } finally{
            setIsLoading(false);
        }
    }

    const updateRebirth = async () => {
        setIsLoading(true)
        if (counter > rebirthPrice[rebirth]) {
            try {
                const updated = await patchProfile(token, {
                    level: 1,
                    counter: 0,
                    cash: 0,
                    rebirth: rebirth + 1
                })

            setCounter(updated.counter)
            setRebirth(updated.rebirth)
            setCash(parseFloat(updated.cash))
            setLevel(updated.level)
            
            showMessage("Successfully rebirthed !!", "success", setMessage)
            } catch(error) {
                console.error("Something went wrong", error)
            }  finally {
                setIsLoading(false)
            }
        } else {
            showMessage("Not enough cash", "error", setMessage)
        } 
    }

    if(isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return(
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
            <div className="flex flex-wrap justify-between mb-5 mb-4">
                <p className="text-3xl ml-2 text-white"><span className="font-bold">Level</span> <span className="font-semibold text-white">{level}</span></p>
                <p className="text-green-700 mx-5">Multiplier: {rebirthStats[rebirth]}X</p>
            </div>

            <div className="flex flex-wrap justify-between mr-5 ml-2 mb-4 text-white">
                <p><span className="font-bold">Score</span> <span className="font-semibold">{counter}</span></p>
                <p><span className="font-bold">Cash</span>: <span className="font-semibold">${cash}</span></p>
                <p><span className="font-bold">Rebirth:</span> <span className="font-semibold">{rebirth}</span></p>
            </div>
            
            <button 
            onClick={() => updateCounter(powerUps[level])}
            className="relative block mx-auto bg-blue-600 hover:scale-105 transition-transform text-white rounded-full mb-6 
            text-[clamp(1.5rem,5vw,3rem)] 
            w-[clamp(120px,30vw,550px)] 
            h-[clamp(120px,30vw,550px)] 
            flex items-center justify-center overflow-hidden py-auto"
            >
                <img
                src={star}
                alt="Click"
                className="w-full h-full object-cover"
                />
            </button>
            <p className="text-blue-700 text-lg flex justify-center mb-5">Current Increment: {powerUps[level].name}</p>
            
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
                onClick={updateRebirth}
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
    )
}
export default Home;