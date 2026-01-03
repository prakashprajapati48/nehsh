import React from 'react'
import { Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const DemandCategory = () => {
    const data = [
        { name: "Phone", price: 100000, color: "#0088FE" },
        { name: "laptop", price: 70000, color: "#00C49F" },
        { name: "bag", price: 1000, color: "#FFBB28" },
        { name: "cloths", price: 5000, color: "#FF8042" },
        { name: "Shoes", price: 2000, color: "#191918ff" },
    ]

    return (
        <div className="category h-100 flex flex-col items-center justify-between" style={{ width: "100%" }}>
            <div className="flex items-center justify-between w-[100%]">
                <div className="header">
                    <p className="title text-bold text-blue-500">Sales Category</p>
                </div>
                <div className="top-demand bg-slate-100 text-blue-500">
                    Top Demand
                </div>

            </div>
            <div className="h-95 w-[100%] my-1 rounded-md">
                <ResponsiveContainer width={"100%"} height={"100%"}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            fill="#8884d8"
                            innerRadius={60}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="price"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ fontSize: "10px" }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default DemandCategory
