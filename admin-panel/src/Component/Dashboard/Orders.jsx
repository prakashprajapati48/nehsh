import { SlidersHorizontal, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Orders = ({ setCollapse, collapse }) => {

  const [subValue, setSubvalue] = useState("product")
  const [filterShow, setFilterShow] = useState(false)
  const [filterSelectValue, setFilterSelectValue] = useState([])
  const [filterSelectRes, setFilterSelectRes] = useState([])
  const [resfound, setResfound] = useState(false)
  const [choice, setChoice] = useState(false)

  const tableHeaders = ["Order ID", "Product", "Customer", "Qty", "Amount", "Date", "Status"];

  const orders = [
    {
      orderId: "#00001",
      product: "Laptop",
      customer: "Leonten Parent",
      qty: 1,
      amount: 250.00,
      date: "20 May 2023",
      status: "Paid"
    },
    {
      orderId: "#00002",
      product: "Cloths",
      customer: "John Wick",
      qty: 2,
      amount: 100.00,
      date: "15 June 2023",
      status: "Pending"
    },
    {
      orderId: "#00003",
      product: "Earbuds",
      customer: "Emma Watson",
      qty: 1,
      amount: 210.00,
      date: "22 May 2023",
      status: "Paid"
    },
    {
      orderId: "#00004",
      product: "Shoes",
      customer: "Leonten Parent",
      qty: 1,
      amount: 250.00,
      date: "24 May 2023",
      status: "Pending"
    },
    {
      orderId: "#00005",
      product: "Laptop",
      customer: "Leonten Parent",
      qty: 1,
      amount: 280.00,
      date: "20 May 2023",
      status: "Pending"
    },
  ];

  let filterSearch = () => {
    let seres = orders.filter((item) => item?.[subValue])
    return seres;
  }

  let searchres = filterSearch()

  // useEffect(() => {
  //   const vals = orders.filter((item) => filterSelectValue.includes(item?.[subValue]))

  //   if (vals.length > 0) {
  //     setFilterSelectRes(vals)
  //     setResfound(true)
  //   }
  //   else {
  //     setFilterSelectRes([])
  //     setResfound(false)
  //     console.log("Not founded!")
  //   }
  // }, [filterSelectValue, subValue])

  let searchData = (value) => {
    const vals = orders.filter((item) => filterSelectValue.includes(item?.[value]))

    if (vals.length > 0) {
      setFilterSelectRes(vals)
      setResfound(true)
    }
    else {
      setFilterSelectRes([])
      setResfound(false)
      console.log("Not founded!")
    }
  }

  return (
    <>
      <div className="order_table justify-self-center w-full p-5 px-[0.2%] lg:px-[0.5%] xl:px-[0.5%]">
        <div className={`order_header w-[-webkit-fill-available] absolute flex md:flex-row  justify-between py-5 pr-[3%]`}>
          <h3>Orders</h3>
          <button className="flex gap-2 cursor-pointer" onClick={() => setFilterShow(prev => !prev)}><SlidersHorizontal />
            <span>Filter</span>
          </button>
        </div>

        {/* MY code */}
        {/* {filterShow && (
          <div className="filterOptions h-40 overflow-y-scroll flex flex-row absolute z-50 mr-10 bg-blue-500 w-100 justify-between px-4" style={{ scrollbarWidth: "none" }}>
            <div>
              {filterShow && (
                tableHeaders.filter((item) =>
                  ["product", "date", "amount", "status"].includes(item.toLowerCase())
                ).map((item, idx) => (
                  <div key={idx} className="flex">
                    <button className="cursor-pointer p-2" onClick={() => setSubvalue(item.toLowerCase())} >{item}</button>
                  </div>
                ))
              )}
            </div>

            <div className="flex flex-col h-40 gap-6 overflow-y-scroll" style={{ scrollbarWidth: "none" }}>
              {filterShow && (
                subValue ? (
                  searchres.length > 0 && (
                    [...new Set(orders.map(o => o[subValue]))].map((val, index) => (
                      <div key={index}>
                        <p className="subvalues"
                          onClick={() => {
                            setFilterSelectValue(prev =>
                              prev.includes(val)
                                ? prev.filter(v => v !== val)
                                : [...prev, val]
                            );
                          }}
                        >
                          <div className={`flex items-center gap-2 ${filterSelectValue.includes(val) && ("bg-[#fafafaa1]")} rounded-xl px-1 `}>
                            {val}
                            {filterSelectValue.includes(val) && <X className="w-4 h-4 text-black-500" />}
                          </div>
                        </p>
                      </div>
                    ))
                  )
                ) :
                  <p>No data found</p>
              )}

            </div>

            <button onClick={() => { setFilterShow(false); searchData(subValue) }}>Apply</button>
          </div>
        )} */}

        {/* upgraded code */}
        {filterShow && (
          <div className="absolute justify-self-center md:right-5 top-12 bg-white shadow-xl border border-gray-100 rounded-2xl p-6 w-80 z-50 transition-all duration-300 animate-slideDown">
            <div className="order_filter_header flex">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
              <span className="absolute justify-self-end cursor-pointer left-0 right-7" onClick={() => setFilterShow(!filterShow)}><X /></span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Product</label>
                <select
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={subValue === "product" ? filterSelectValue[0] || "" : ""}
                  onClick={() => setSubvalue("product")}
                  onChange={(e) => {
                    setSubvalue("product");
                    setFilterSelectValue([e.target.value]);
                  }}
                >
                  <option value="">Select Product</option>
                  {[...new Set(orders.map(o => o.product))].map((val, idx) => (
                    <option key={idx} value={val}>{val}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => setSubvalue("amount")}
                  onChange={(e) => setFilterSelectValue([e.target.value])}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => setSubvalue("date")}
                  onChange={(e) => setFilterSelectValue([e.target.value])}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => setSubvalue("status")}
                  onChange={(e) => setFilterSelectValue([e.target.value])}
                >
                  <option value="">Select Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setFilterShow(false);
                  searchData(subValue);
                }}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold hover:opacity-90 transition"
              >
                Apply
              </button>
            </div>
          </div>
        )}

        <table
          className="min-w-full border mt-15 lg:my-15 border-[#C1C8E8] rounded-2xl "
        >
          <thead>
            <tr>
              {tableHeaders.map((headers, index) => (
                <th className="border-y-2 border-[#E4F0F5] px-4 py-2 text-left font-semibold" key={index}>{headers}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resfound !== true ?
              orders.map((item, idx) => (
                <tr key={idx}>
                  <td className="border-y-2 border-[#E4F0F5] text-md font-normal px-2 py-3 text-left">{item.orderId}</td>
                  <td className="border-y-2 border-[#E4F0F5] text-md font-normal px-2 py-3">{item.product}</td>
                  <td className="border-y-2 border-[#E4F0F5] text-md font-normal px-2 py-3">{item.customer}</td>
                  <td className="border-y-2 border-[#E4F0F5] text-md font-normal px-2 py-3">{item.qty}</td>
                  <td className="border-y-2 border-[#E4F0F5] text-md font-normal px-2 py-3">{item.amount}</td>
                  <td className="border-y-2 border-[#E4F0F5] text-md font-normal px-2 py-3">{item.date}</td>
                  <td className={`border-y-2 border-[#E4F0F5] px-2 py-2 rounded-xl`} >
                    <span
                      className={`px-2 py-2 rounded-xl ${item.status.toLowerCase() === "paid" ? "bg-[#98DDA6] text-[15px]" : "bg-[#FFC460] text-[15px]"} `}>{item.status}
                    </span>
                  </td>
                </tr>
              )
              ) : (
                filterSelectRes.map((item, idx) => (
                  <tr key={idx}>
                    <td scope="row" className="border-y-2 border-[#E4F0F5] px-2 py-3 text-left">{item.orderId}</td>
                    <td className="border-y-2 border-[#E4F0F5] px-2 py-3">{item.product}</td>
                    <td className="border-y-2 border-[#E4F0F5] px-2 py-3">{item.customer}</td>
                    <td className="border-y-2 border-[#E4F0F5] px-2 py-3">{item.qty}</td>
                    <td className="border-y-2 border-[#E4F0F5] px-2 py-3">{item.amount}</td>
                    <td className="border-y-2 border-[#E4F0F5] px-2 py-3">{item.date}</td>
                    <td >
                      <span
                        className={`border-y-2 border-[#E4F0F5] px-2 py-2 rounded-xl ${item.status.toLowerCase() === "paid" ? "bg-[#98DDA6] text-[15px]" : "bg-[#FFC460] text-[15px]"} `}>{item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
          </tbody>
        </table>
      </div >
    </>
  )
}

export default Orders
