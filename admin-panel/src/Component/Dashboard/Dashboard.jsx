import React from 'react'
import SalesChart from '../SalesChart'
import DemandCategory from './DemandCategory'
import { CircleUserRound, IndianRupee, ShoppingCart, TrendingDown, TrendingUp } from 'lucide-react'

const Dashboard = ({ setCollapse, collapse }) => {

  return (
    <>
      <div className={`flex flex-col flex-wrap pt-18  w-auto sm:gap-5 lg:flex-row lg:gap-1 ${!collapse ? " justify-between sm:pt-16 md:pt-14 lg:pt-12 sm:px-8 md:px-1 lg-px-8 px-2" : "justify-between "}`}>
        <div className="w-full lg:w-[32.5%] h-40 bg-[#FFEBD6] rounded-xl shadow-xl hover:scale-101 flex flex-col items-center justify-evenly p-5 max-sm:w-full">
          <div className="flex self-start w-full justify-between">
            <p className="text-xl">Total Revenue</p>
            <IndianRupee className="bg-red" />
          </div>
          <div className="flex self-start w-full justify-between">
            <p className="total self-start text-4xl font-semibold">₹80000</p>
            <div className="status flex flex-col items-end">
              <p className="text-green-500">+10.1%</p>
              <p className="text-slate-800 font-normal" >vs last week</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[32.5%] h-40 bg-slate-200/50 rounded-xl shadow-xl hover:scale-101 flex flex-col items-center justify-evenly p-5 max-sm:w-full">
          <div className="flex self-start w-full justify-between">
            <p className="text-xl">Total Orders</p>
            <ShoppingCart />
          </div>
          <div className="flex self-start w-full justify-between">
            <p className="total self-start text-4xl font-semibold">90870</p>
            <div className="status flex font-bold text-red-500 flex-col items-end">-2.08%
              <p className="text-slate-800 font-normal" >vs last week</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[32.5%] h-40 bg-slate-200/50 rounded-xl shadow-xl hover:scale-101 flex flex-col items-center justify-evenly p-5 max-sm:w-full">
          <div className="flex self-start w-full justify-between">
            <p className="text-xl">Total Visitors</p>
            <CircleUserRound stroke="black" />
          </div>
          <div className="flex self-start w-full justify-between">
            <p className="total self-start text-4xl font-semibold">5,00,000</p>
            <div className="status flex flex-col items-end text-green-500">+8.08%
              <p className="text-slate-800">vs last week</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 xl:grid-cols-2 items-center justify-between gap-x-10 gap-y-20 ${!collapse ? "px-2 sm-px-8 md:px-1 lg:px-2 py-8 " : "py-8"}`} >
        <div className="saleschart w-full bg-[#f5f5f5] px-2 py-2 rounded-md" style={{ height: "100%" }}>
          <SalesChart />
        </div>

        <div className={`items-center justify-between bg-[#f5f5f5] py-4 rounded-md sm:px-5 md:px-5 lg:px-5`}>
          <DemandCategory />
        </div>
      </div>
    </>
  )
}

export default Dashboard
