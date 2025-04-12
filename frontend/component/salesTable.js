import { useState, useEffect } from "react";

export default function SalesTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/api/data")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.salesReps || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch data:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h2 className="text-3xl pb-5">Sales Representative</h2>
            {loading ? (
                <div className="flex items-center justify-center w-full h-56">
                    <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
                </div>
            ) : (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="table-auto border-collapse border border-gray-400 w-full">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Region</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                                <th scope="col" className="px-6 py-3">Skills</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
                                    <td className="px-6 py-4">{user.name} </td>
                                    <td className="px-6 py-4">{user.region}</td>
                                    <td className="px-6 py-4">{user.role}</td>
                                    <td><ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                                        {user.skills.map((value, index) => (
                                            <li key={index}>{value}</li>
                                        ))}
                                    </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
