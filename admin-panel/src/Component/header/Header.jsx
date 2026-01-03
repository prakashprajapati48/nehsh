import React, { useState } from 'react'
import { Bell, ChevronDown, Filter, Icon, Menu, MessageCircle, Search, Settings, User2Icon } from 'lucide-react'

const Header = ({ setCollapse, collapse }) => {
    const [searchToggle, setSearchToggle] = useState(false)
    return (
        <>
            <div className={`dashboard_header self-center flex w-[-webkit-fill-available] justify-between absolute items-center px-4 lg:px-[2%] xl:px-[1.2%]`}>
                <div className={`header1 flex items-center justify-start gap-[3px] md:justify-between md:gap-3 w-full sm:w-auto sm:justify-start mb-2 sm:mb-0}`}>
                    <button onClick={() => setCollapse(!collapse)} className="cursor-pointer" >
                        <Menu />
                    </button>
                    <p className="text text-[12px] md:text-xl lg:text-2xl" >Welcome To Admin Panel
                    </p>
                </div>

                {/* <div className="flex relative flex-col w-fit">
                    <Search className=" top-1/4 mx-2" onClick={() => setSearchToggle(!searchToggle)} />
                </div> */}

                <div className="w-full flex items-center flex-0 sm:gap-5 md:gap-10 lg:gap-10">

                    <Search className=" top-1/4 mx-2" onClick={() => setSearchToggle(!searchToggle)} />
                    {/* <MessageCircle /> */}

                    <Bell />

                    <div className="admin_name flex py-2 justify-between">
                        <div className="img-section w-10 h-5 flex items-center self-center">
                            {/* <img src={<Icon.User2Icon />} alt="admin_img" className="w-fit h-8 rounded-3xl" key="img-1" /> */}
                            <User2Icon className="w-fit h-8 rounded-3xl" key="img-1" />
                        </div>
                        <p className={`w-fit flex self-center text-black cursor-pointer `}>admin
                            <ChevronDown />
                        </p>
                    </div>
                </div>
            </div>

            {searchToggle && (
                <>
                    <div className="searchdata absolute self-center items-center">
                        <input type="text" name="search-input" placeholder="Find" className="flex w-fit pl-10 pr-4 py-2.5 rounded-xl border" />
                        <button className="absolute top-1/4 mx-2 right-2 color-slate-800 bg-black-500 hover:bg-transparent cursor-pointer">
                            <Filter />
                        </button>
                    </div>
                </>
            )}
        </>
    )
}

export default Header
