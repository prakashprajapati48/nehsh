import { Filter } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const Analysis = () => {
    const [resFilter, setResFilter] = useState(false)
    const orderData = [
        { itemname: "Laptop", purchase: 100000, sells: 20000, month: 2015 },
        { itemname: "Cloths", purchase: 90000, sells: 20000, month: 2016 },
        { itemname: "Shoes", purchase: 110000, sells: 1500, month: 2017 },
        { itemname: "Bag", purchase: 10000, sells: 4000, month: 2018 },
        { itemname: "Mobile", purchase: 10000, sells: 10000, month: 2020 },
        { itemname: "earbuds", purchase: 100000, sells: 20000, month: 2022 },
        { itemname: "iPhone", purchase: 50000, sells: 110000, month: 2023 },
    ]

    // const filterdata = [
    //     {
    //         years: 2015, data: [{ itemname: "Laptop", purchase: 100000, sells: 20000, month: 2015 }, { itemname: "Cloths", purchase: 90000, sells: 20000, month: 2016 },
    //         { itemname: "Shoes", purchase: 10000, sells: 1500, month: 2017 },
    //         { itemname: "Bag", purchase: 1000, sells: 4000, month: 2018 },
    //         { itemname: "Mobile", purchase: 10000, sells: 10000, month: 2020 },
    //         { itemname: "earbuds", purchase: 10000, sells: 20000, month: 2022 },
    //         { itemname: "iPhone", purchase: 5000, sells: 110000, month: 2023 }
    //         ]
    //     },
    //     { years: 2016, data: { itemname: "Cloths", purchase: 90000, sells: 20000, month: 2016 } },
    //     { years: 2017, data: { itemname: "Shoes", purchase: 110000, sells: 1500, month: 2017 } },
    //     { years: 2018, data: { itemname: "Bag", purchase: 10000, sells: 4000, month: 2018 } },
    //     { years: 2019, data: { itemname: "Mobile", purchase: 10000, sells: 10000, month: 2020 } },
    //     { years: 2020, data: { itemname: "earbuds", purchase: 100000, sells: 20000, month: 2022 } },
    //     { years: 2021, data: { itemname: "iPhone", purchase: 50000, sells: 110000, month: 2023 } },
    // ]

    const filterdata = [
        {
            years: 2015,
            data: [
                { itemname: "Laptop", purchase: 100000, sells: 20000, month: 2015 },
                { itemname: "Cloths", purchase: 90000, sells: 20000, month: 2015 },
                { itemname: "Shoes", purchase: 10000, sells: 1500, month: 2015 },
                { itemname: "Bag", purchase: 1000, sells: 4000, month: 2015 },
                { itemname: "Mobile", purchase: 10000, sells: 10000, month: 2015 },
                { itemname: "earbuds", purchase: 10000, sells: 20000, month: 2015 },
                { itemname: "iPhone", purchase: 5000, sells: 110000, month: 2015 }
            ]
        },
        {
            years: 2016,
            data: [
                { itemname: "Laptop", purchase: 110000, sells: 25000, month: 2016 },
                { itemname: "Cloths", purchase: 95000, sells: 30000, month: 2016 },
                { itemname: "Shoes", purchase: 15000, sells: 5000, month: 2016 },
                { itemname: "Bag", purchase: 2000, sells: 4500, month: 2016 },
                { itemname: "Mobile", purchase: 12000, sells: 11000, month: 2016 },
                { itemname: "earbuds", purchase: 15000, sells: 25000, month: 2016 },
                { itemname: "iPhone", purchase: 6000, sells: 120000, month: 2016 }
            ]
        },
        {
            years: 2017,
            data: [
                { itemname: "Laptop", purchase: 120000, sells: 30000, month: 2017 },
                { itemname: "Cloths", purchase: 100000, sells: 40000, month: 2017 },
                { itemname: "Shoes", purchase: 18000, sells: 6000, month: 2017 },
                { itemname: "Bag", purchase: 2500, sells: 4700, month: 2017 },
                { itemname: "Mobile", purchase: 15000, sells: 12000, month: 2017 },
                { itemname: "earbuds", purchase: 20000, sells: 27000, month: 2017 },
                { itemname: "iPhone", purchase: 10000, sells: 130000, month: 2017 }
            ]
        },
        {
            years: 2018,
            data: [
                { itemname: "Laptop", purchase: 125000, sells: 35000, month: 2018 },
                { itemname: "Cloths", purchase: 102000, sells: 42000, month: 2018 },
                { itemname: "Shoes", purchase: 20000, sells: 7000, month: 2018 },
                { itemname: "Bag", purchase: 3000, sells: 4900, month: 2018 },
                { itemname: "Mobile", purchase: 18000, sells: 13000, month: 2018 },
                { itemname: "earbuds", purchase: 22000, sells: 29000, month: 2018 },
                { itemname: "iPhone", purchase: 15000, sells: 140000, month: 2018 }
            ]
        },
        {
            years: 2019,
            data: [
                { itemname: "Laptop", purchase: 130000, sells: 37000, month: 2019 },
                { itemname: "Cloths", purchase: 105000, sells: 43000, month: 2019 },
                { itemname: "Shoes", purchase: 21000, sells: 7200, month: 2019 },
                { itemname: "Bag", purchase: 3200, sells: 5000, month: 2019 },
                { itemname: "Mobile", purchase: 20000, sells: 14000, month: 2019 },
                { itemname: "earbuds", purchase: 23000, sells: 31000, month: 2019 },
                { itemname: "iPhone", purchase: 16000, sells: 145000, month: 2019 }
            ]
        },
        {
            years: 2020,
            data: [
                { itemname: "Laptop", purchase: 135000, sells: 38000, month: 2020 },
                { itemname: "Cloths", purchase: 107000, sells: 44000, month: 2020 },
                { itemname: "Shoes", purchase: 22000, sells: 7500, month: 2020 },
                { itemname: "Bag", purchase: 3500, sells: 5200, month: 2020 },
                { itemname: "Mobile", purchase: 21000, sells: 15000, month: 2020 },
                { itemname: "earbuds", purchase: 25000, sells: 33000, month: 2020 },
                { itemname: "iPhone", purchase: 18000, sells: 150000, month: 2020 }
            ]
        },
        {
            years: 2021,
            data: [
                { itemname: "Laptop", purchase: 140000, sells: 40000, month: 2021 },
                { itemname: "Cloths", purchase: 110000, sells: 45000, month: 2021 },
                { itemname: "Shoes", purchase: 25000, sells: 8000, month: 2021 },
                { itemname: "Bag", purchase: 4000, sells: 5500, month: 2021 },
                { itemname: "Mobile", purchase: 22000, sells: 16000, month: 2021 },
                { itemname: "earbuds", purchase: 28000, sells: 35000, month: 2021 },
                { itemname: "iPhone", purchase: 20000, sells: 160000, month: 2021 }
            ]
        }
    ];


    const [val, setVal] = useState(null)
    const [resultFilter, setResultfilter] = useState([])

    const optionFilter = {
        datas: [
            {
                years: 2024,
                month: {
                    month: "January",
                    data: [
                        { itemname: "Laptop", purchase: 12000, sells: 2000 },
                        { itemname: "Cloths", purchase: 12000, sells: 8000 },
                        { itemname: "Shoes", purchase: 32000, sells: 1500 },
                        { itemname: "Bag", purchase: 5000, sells: 2000 },
                        { itemname: "Mobile", purchase: 5000, sells: 2800 },
                        { itemname: "earbuds", purchase: 70000, sells: 20000 },
                        { itemname: "iPhone", purchase: 10000, sells: 7800 }
                    ]
                }
            },
            {
                years: 2024,
                month: {
                    month: "February",
                    data: [
                        { itemname: "Laptop", purchase: 15000, sells: 5000 },
                        { itemname: "Cloths", purchase: 10000, sells: 7000 },
                        { itemname: "Shoes", purchase: 25000, sells: 4000 },
                        { itemname: "Bag", purchase: 8000, sells: 3000 },
                        { itemname: "Mobile", purchase: 9000, sells: 6000 },
                        { itemname: "earbuds", purchase: 65000, sells: 30000 },
                        { itemname: "iPhone", purchase: 12000, sells: 9500 }
                    ]
                }
            },
            {
                years: 2024,
                month: {
                    month: "March",
                    data: [
                        { itemname: "Laptop", purchase: 18000, sells: 7000 },
                        { itemname: "Cloths", purchase: 14000, sells: 9000 },
                        { itemname: "Shoes", purchase: 30000, sells: 8000 },
                        { itemname: "Bag", purchase: 6000, sells: 4000 },
                        { itemname: "Mobile", purchase: 7000, sells: 5000 },
                        { itemname: "earbuds", purchase: 60000, sells: 25000 },
                        { itemname: "iPhone", purchase: 15000, sells: 12000 }
                    ]
                }
            },
            {
                years: 2024,
                month: {
                    month: "April",
                    data: [
                        { itemname: "Laptop", purchase: 20000, sells: 9000 },
                        { itemname: "Cloths", purchase: 13000, sells: 10000 },
                        { itemname: "Shoes", purchase: 35000, sells: 12000 },
                        { itemname: "Bag", purchase: 7000, sells: 3500 },
                        { itemname: "Mobile", purchase: 11000, sells: 8000 },
                        { itemname: "earbuds", purchase: 55000, sells: 30000 },
                        { itemname: "iPhone", purchase: 16000, sells: 13000 }
                    ]
                }
            },
            {
                years: 2024,
                month: {
                    month: "May",
                    data: [
                        { itemname: "Laptop", purchase: 22000, sells: 12000 },
                        { itemname: "Cloths", purchase: 15000, sells: 11000 },
                        { itemname: "Shoes", purchase: 28000, sells: 10000 },
                        { itemname: "Bag", purchase: 7500, sells: 5000 },
                        { itemname: "Mobile", purchase: 9500, sells: 8500 },
                        { itemname: "earbuds", purchase: 50000, sells: 27000 },
                        { itemname: "iPhone", purchase: 18000, sells: 15000 }
                    ]
                }
            },
            {
                years: 2024,
                month: {
                    month: "June",
                    data: [
                        { itemname: "Laptop", purchase: 25000, sells: 15000 },
                        { itemname: "Cloths", purchase: 16000, sells: 13000 },
                        { itemname: "Shoes", purchase: 30000, sells: 15000 },
                        { itemname: "Bag", purchase: 8000, sells: 6000 },
                        { itemname: "Mobile", purchase: 12000, sells: 9500 },
                        { itemname: "earbuds", purchase: 45000, sells: 28000 },
                        { itemname: "iPhone", purchase: 20000, sells: 17000 }
                    ]
                }
            }
        ]
    }

    const searchFilterData = (filteval) => {
        // let result = filterdata.filter((data) => data.years === Number(filteval))
        if (typeof filteval === "number") {
            let result = optionFilter.datas.filter((data) => data.month.month === filteval)
            let normalizedData = result.flatMap((item) =>
                Array.isArray(item.years) ? item.years : [item.years]
            );
            setResultfilter(normalizedData);
            // console.log(`Filter data is: ${normalizedData}`)
            setResFilter(true)
            // console.log(`Result of filter data: ${result.map((item) => item.data.map((itemdata) => itemdata.purchase))}`)
        }
        let result = optionFilter.datas.filter((data) => data.month.month === filteval)
        let normalizedData = result.flatMap((item) =>
            Array.isArray(item.month.data) ? item.month.data : [item.month.data]
        );
        setResultfilter(normalizedData);
        console.log(`Filter data is: ${normalizedData}`)
        setResFilter(true)
        console.log(`Result of filter data: ${result.map((item) => item.data.map((itemdata) => itemdata.purchase))}`)
    }

    const [optionShow, setOptionShow] = useState(false)

    // const optionFilter = [
    //     { years: [2015, 2016, 2017, 2018, 2019, 2020, 2021] },
    //     { month: ["Jan", "Feb"] }
    // ]

    // const optionFilter = {
    //     year: [{ years: 2024 }, { years: 2023 }, { years: 2022 }],
    //     month: [
    //         { month: "January" },
    //         { month: "February" },
    //         { month: "March" },
    //         { month: "April" },
    //     ],
    // };


    const [filterType, setFilterType] = useState(null)
    const [subFilterShow, setSubFilterShow] = useState(false)

    return (
        <>
            <div className="orderData flex flex-col justify-between gap-5">
                <div className="filteration p-8 flex justify-between">
                    <button onClick={() => setOptionShow(!optionShow)} ><Filter /></button>
                    {optionShow &&
                        <>
                            <div className="filterOptions">
                                <select name="filterType" id="filterType" value={filterType} onChange={(e) => setFilterType(e.target.value)} >
                                    <option value="year" onClick={() => setSubFilterShow(false)} >Select Type</option>
                                    <option value="year" onClick={() => setSubFilterShow(!subFilterShow)} >Year</option>
                                    <option value="month" onClick={() => setSubFilterShow(!subFilterShow)} >Month</option>
                                </select>

                                {filterType && (
                                    <select name="filtervalue" id="filtervalue" value={val} onChange={(e) => setVal(e.target.value)}>
                                        {filterType === "year" ?
                                            optionFilter.datas.map((item, idx) => (
                                                <option value={item.years} key={idx}>{item.years}</option>
                                            ))
                                            : (
                                                optionFilter.datas.map((item, idx) => (
                                                    <option value={item.month.month} key={idx}>{item.month.month}</option>
                                                ))
                                            )}
                                    </select>
                                )}
                                <button className="bg-blue-500 hover:bg-blue-400 rounded-md p-2" onClick={() => searchFilterData(val)} >Apply Filter</button>
                            </div>
                        </>
                    }
                </div>

                <div className="Orders p-4">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={resFilter ? resultFilter : orderData} width={500} height={400}>
                            <Line dataKey="sells" stroke="brown" strokeWidth={2} />
                            <Line dataKey="purchase" stroke="blue" strokeWidth={2} />

                            <XAxis dataKey="itemname" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default Analysis
