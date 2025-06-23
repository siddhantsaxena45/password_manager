import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-900 flex justify-between h-12 items-center px-5 text-white'>
            <div className='font-bold text-2xl'><span className='text-green-600'>&lt;</span> <span>Pass</span><span className='text-green-600'>OP /&gt;</span></div>
           
            <button className='ring-2 ring-green-600 rounded-full'><img className='invert' src="icons/github.svg" alt="" /></button>
        </nav>
    )
}

export default Navbar
