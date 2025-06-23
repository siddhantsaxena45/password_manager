import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-slate-900 md:flex md:justify-evenly h-12 md:items-center px-5 text-white text-md w-full text-center'>
            <div className='md:flex gap-2 '>
            <span>Made with </span><span className='text-red-600'>❤</span>
            <span> by </span><span className='text-green-600'>@siddhant</span>
            </div>
            
            <span>Copyright &copy; 2025 All rights reserved</span>
           
        </footer>
    )
}

export default Footer
