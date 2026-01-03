import React from 'react'
import { ResponsiveContainer, Bar, BarChart, Legend, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { DollarSign, Users, ShoppingCart, Eye, Dot } from 'lucide-react';

const SalesChart = () => {
    const stats = [
        { month: "Jan", revenue: 45000, expenses: 32000 },
        { month: "Fab", revenue: 52000, expenses: 38000 },
        { month: "Mar", revenue: 48000, expenses: 35000 },
        { month: "Apr", revenue: 61000, expenses: 42000 },
        { month: "May", revenue: 55000, expenses: 40000 },
        { month: "Jun", revenue: 67000, expenses: 45000 },
        { month: "Jul", revenue: 72000, expenses: 48000 },
        { month: "Aug", revenue: 69000, expenses: 46000 },
        { month: "Sep", revenue: 78000, expenses: 52000 },
        { month: "Oct", revenue: 74000, expenses: 50000 },
        { month: "Nov", revenue: 82000, expenses: 55000 },
        { month: "Dec", revenue: 89000, expenses: 58000 },
    ]

    return (
        <div style={{ width: "100%", height: "380px" }}>
            <div className="salesdata flex justify-end">
                <div className="data1 flex items-center ">
                    <Dot fill="grey" color='grey' className="w-10 h-10" />
                    <p>
                        Expenses
                    </p>
                </div>
                <div className="data2 flex items-center">
                    <Dot fill='blue' color='blue' className="w-10 h-10" />
                    Revenue
                </div>
            </div>
            <ResponsiveContainer width="100%" height="100%" >
                <BarChart data={stats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3}  />
                    <XAxis dataKey="month" />
                    <YAxis />

                    <Tooltip contentStyle={{
                        background: "#666666f6",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 10px 40px rgba(49, 32, 124, 0.1)",
                    }} formatter={(value) => [`$${value.toLocaleString()}`, ""]} labelStyle={{ color: "black" }} />

                    <Bar dataKey="revenue" fill='blue' radius={[4, 4, 0, 0]} barSize={80} />

                    <Bar dataKey="expenses" fill='grey' radius={[4, 4, 0, 0]} barSize={80} />
                    <YAxis />

                    <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>

                        <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#94a3b8" />
                            <stop offset="100%" stopColor="#64748b" />
                        </linearGradient>
                    </defs>
                    <Legend />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SalesChart
