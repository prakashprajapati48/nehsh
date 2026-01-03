import { IndianRupee, TrendingDownIcon, TrendingUp } from 'lucide-react'
import React from 'react'
import { ResponsiveContainer, AreaChart, Tooltip, XAxis, YAxis, CartesianGrid, Area } from 'recharts'

const Revenue = () => {
    const data = [
        {
            name: 'a',
            uv: 20,
            amt: 2000,
            year: 2015
        },
        {
            name: 'b',
            uv: 40,
            amt: 4000,
            year: 2016
        },
        {
            name: 'c',
            uv: 40,
            amt: 4700,
            year: 2017
        },
        {
            name: 'd',
            uv: 70,
            amt: 2000,
            year: 2018
        },
        {
            name: 'e',
            uv: 50,
            amt: 4000,
            year: 2019
        },
        {
            name: 'f',
            uv: 80,
            amt: 7000,
            year: 2020
        },
        {
            name: 'g',
            uv: 50,
            amt: 10000,
            year: 2021
        },
        {
            name: 'h',
            uv: 90,
            amt: 11000,
            year: 2022
        },
        {
            name: 'i',
            uv: 30,
            amt: 12000,
            year: 2023
        },
        {
            name: 'j',
            uv: 40,
            amt: 1000,
            year: 2024
        },
        {
            name: 'k',
            uv: 80,
            amt: 15000,
            year: 2025
        },
    ]
    return (
        <>
            <div className="w-full max-w-[-webkit-fill-available] mx-0 md:mx-0 lg:mx-[2.2%] xl:mx-[0.5%] mt-5">
                <div className="revenue_header">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-4xl font-semibold">Revenue</h2>
                        <select name="revenue_filter" id="revenue_filter" className="border w-auto bg-[#f2f5fb] cursor-pointer px-auto md:px-4 lg:px-4 xl:px-4 xl:py-2 outline-slate-400 rounded-md">
                            <option value="30">Last 30 days</option>
                            <option value="60">Last 60 days</option>
                        </select>
                    </div>
                    <div className="my-8">
                        <p className="text-4xl font-medium">₹15,000</p>
                        <span>Total Revenue</span>
                    </div>
                </div>
                <div className="revenuechart">
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart
                            responsive data={data}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid stroke="#F2F4F7" horizontal={true} vertical={false} />
                            <XAxis dataKey="year" angle={-20} />
                            <YAxis
                                dataKey="amt"
                                cursor={false}
                                axisLine={false}
                                width="auto"
                                tick={{ fill: "#6b7280", fontSize: 16 }}
                                tickMargin={20}
                            />
                            <Tooltip cursor={false} />

                            <Area type="monotone" dot={false} dataKey="amt" stroke='#3b82f6' strokeWidth={2} fill="url(#colorRevenue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

            </div>
            <div 
            className={`revenue_footer flex flex-wrap gap-5 mt-4 mx-0 md:mx-[2.2%] lg:mx-[2.2%] xl:mx-[2.2%] md:flex-row lg:flex-row xl:w-auto`}>
                <div className="sale_revenue w-full flex-grow basis-52 p-4 rounded-xl shadow-xl">
                    <span className="w-fit flex gap-3 text-5xl font-semibold items-center">
                        <TrendingUp stroke="#5CBC8A" width={35} height={35} /> 20%</span>
                    <p className="text-lg w-fit  p-2 text-[#676D73] ">Sales</p>
                </div>

                <div className="expenses w-full flex-grow basis-52  p-4 rounded-xl shadow-xl">
                    <span className="flex gap-3 text-5xl font-semibold items-center"><TrendingDownIcon stroke="red" width={35} height={35} /> 5%</span>
                    <p className="text-lg w-fit  p-2 text-[#676D73]">Expenses</p>
                </div>

                <div className="profit w-full flex-grow basis-52  p-4 rounded-xl shadow-xl">
                    <span className="flex gap-3 text-5xl font-semibold items-center"> <IndianRupee width={35} height={35} /> 40.5%</span>
                    <p className="text-lg w-fit  p-2 text-[#676D73]">Profit</p>
                </div>
            </div>
        </>
    )
}

export default Revenue
