import {useState, useEffect} from 'react';

function Leaderboard () {
    const [leaderboard, setLeaderboard] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getLeaderboard = async () => {

            try {
                const res = await fetch('http://127.0.0.1:8000/api/leaderboard/', {
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                }
            })
            
            if (!res.ok) throw new Error("Error fetching leaderboard")
            const data = await res.json()

            setLeaderboard(data);
            
            } catch(error) {
                console.error("Something went wrong:", error)
            } finally {
                setIsLoading(false);
            }
        }
        getLeaderboard();
    },[])

    if(isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return(
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="px-4 py-2">Username</th>
                        <th className="px-4 py-2">Score</th>
                        <th className="px-4 py-2">Level</th>
                        <th className="px-4 py-2">Rebirth</th>
                        <th className="px-4 py-2">Cash</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((entry, index) => (
                        <tr key={index}
                        className={`border-b border-gray-200 ${
                            index === 0
                            ? "bg-yellow-100 font-bold"
                            : index === 1
                            ? "bg-gray-200 font-semibold"
                            : index === 2
                            ? "bg-orange-100 font-semibold"
                            : index % 2 === 0
                            ? "bg-gray-50"
                            : "bg-white"
                        }`}
                        >
                            <td className="px-4 py-2 font-medium">{entry.username}</td>
                            <td className="px-4 py-2">{entry.counter}</td>
                            <td className="px-4 py-2">{entry.level}</td>
                            <td className="px-4 py-2">{entry.rebirth}</td>
                            <td className="px-4 py-2">${entry.cash}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Leaderboard;