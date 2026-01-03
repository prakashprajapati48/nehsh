import React, { useEffect, useState } from 'react'

const Users = () => {
    const [usersdata, setUsersdata] = useState([])
    // const users = [
    //     { id: 1, username: "Rohit", phone: 123456789, email: "rohit45@gmail.com", status: "active" },
    //     { id: 2, username: "virat", phone: 123456789, email: "virat18@gmail.com", status: "active" },
    //     { id: 3, username: "hardik", phone: 123456789, email: "hardik@gmail.com", status: "deactive" },
    //     { id: 4, username: "shubham", phone: 123456789, email: "shubham@gmail.com", status: "active" },
    //     { id: 5, username: "shivam", phone: 123456789, email: "shiam@gmail.com", status: "deactive" },
    // ]

    useEffect(() => {
        fetch("http://localhost:5000/api/auth/users")
            .then(res => res.json())
            .then(sqldata => setUsersdata(sqldata))
            .catch(err => console.error(err))
    }, [usersdata])

    return (
        <>
            <div className="users w-full px-0 mt-10 overflow-auto border border-[#E6E8ED] rounded-xl" style={{ scrollbarWidth: "none" }}>
                <table className="min-w-full ">
                    <thead>
                        <tr>
                            <td scope='row' className="font-semibold px-5 py-2 border border-x-0 border-y-[#E6E8ED] w-fit"> Username</td>
                            <td scope='row' className="font-semibold px-5 py-2 border border-x-0 border-y-[#E6E8ED] w-fit">Phone No.</td>
                            <td scope='row' className="font-semibold px-5 py-2 border border-x-0 border-y-[#E6E8ED] w-fit">Email</td>
                            <td scope='row' className="font-semibold px-5 py-2 border border-x-0 border-y-[#E6E8ED] w-fit">Status</td>
                        </tr>
                    </thead>

                    <tbody>
                        {usersdata.map((data, idx) => (
                            <tr key={idx}>
                                <td className="border border-x-0 border-y-[#E6E8ED] py-5 px-5 w-fit">{data.username}</td>
                                <td className="border border-x-0 border-y-[#E6E8ED] py-5 px-5 w-fit">{data.phone}</td>
                                <td className="border border-x-0 border-y-[#E6E8ED] py-5 px-5 w-fit">{data.email}</td>
                                <td className={`border border-x-0 border-y-[#E6E8ED] py-5 px-5 w-fit ${data.status === "active" ? "text-green-400" : "text-red-500"}`}>{data.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Users
