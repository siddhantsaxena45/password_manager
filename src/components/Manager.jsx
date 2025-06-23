
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
    const ref = useRef()
    const passref = useRef()
    const [form, setForm] = useState({ site: '', user: '', pass: '' })
    const [passwordArray, setPasswordArray] = useState([])

    const getpassword= async () => {
        let data = await fetch('http://localhost:3000/')
        let result = await data.json()
        console.log(result)
        setPasswordArray(result)

    }
    useEffect(() => {
       getpassword()
    }, [])

    const copytext = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }

    const showpass = () => {
        passref.current.type = 'text'
        if (ref.current.src.includes('icons/show.png')) {
            ref.current.src = 'icons/hide.png'
            passref.current.type = 'password'

        }
        else {
            ref.current.src = 'icons/show.png'
            passref.current.type = 'text'
        }

    }

    const editPassword = (id) => {
        setForm({ ...passwordArray.filter((item) => item.id === id)[0], id:id })
        setPasswordArray(passwordArray.filter((item) => item.id !== id))

    }
    const deletePassword =async (id) => {
        const c = confirm('Are you sure you want to delete this password?') 
        if (!c) return
        setPasswordArray(passwordArray.filter((item) => item.id !== id))
        // localStorage.setItem('passwords', JSON.stringify(passwordArray.filter((item) => item.id !== id)))
         let res= await fetch('http://localhost:3000/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        toast('Password deleted successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }
    const savePassword = async () => {
        if (!form.site || !form.user || !form.pass) {
            toast('Please fill all the fields!')
            return;
        }
        await fetch('http://localhost:3000/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: form.id })
        })
        
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...form, id: uuidv4() })
        })
        toast('Password saved successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
     
        setForm({ site: '', user: '', pass: '', id: '' });

    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="absolute top-0 -z-10 h-full w-full bg-green-50"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(109,244,154,0.5)] opacity-50 blur-[80px]"></div></div>

            <div className="container mx-auto max-w-4xl py-8 px-4 min-h-[88.3vh]">
                <h1 className="text-3xl text-center font-bold">
                    <span className='text-green-600'>&lt;</span> <span>Pass</span><span className='text-green-600'>OP /&gt;</span>
                </h1>
                <p className='text-center '> Your own password manager</p>
                <div className='flex flex-col p-4 gap-3 items-center'>
                    <input className='rounded-full p-2 w-full border border-green-600' value=
                        {form.site} name='site' onChange={handleChange} type="text" id="website" placeholder='Enter URL' />

                    <div className='flex gap-4 w-full '>
                        <input className='rounded-full p-2 w-full border border-green-600' type="text" value={form.user} name='user' onChange={handleChange} id="user" placeholder='Enter Username' />
                        <div className="relative">
                            <input className='rounded-full p-2  border border-green-600 ' ref={passref} type="password" value={form.pass} name='pass' onChange={handleChange} id="pass" placeholder='enter password' />
                            <span className='absolute right-1 top-1 cursor-pointer'><img ref={ref} onClick={showpass} src="icons/show.png" alt="" width={30} /></span>
                        </div>


                    </div>
                    <button onClick={savePassword} className='flex w-fit bg-green-400 rounded-full px-4 py-1 border border-green-600 hover:bg-green-300'><lord-icon
                        src="https://cdn.lordicon.com/efxgwrkc.json"
                        trigger="hover"
                    >
                    </lord-icon>Save</button>
                </div>
                <div className="container mx-auto">
                    <h2 className='text-2xl text-center font-bold'>Your Passwords</h2>
                    {passwordArray.length == 0 && <div className='text-center'>Nothing stored</div>}
                    {passwordArray.length > 0 && (
                        <table className="table-auto w-full rounded-2xl overflow-hidden mb-10">
                            <thead className='bg-green-600 '>
                                <tr >
                                    <th className='py-2 w-32'>Website</th>
                                    <th className='py-2 w-32'>Username</th>
                                    <th className='py-2 w-32'>Password</th>
                                    <th className='py-2 w-32'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-200 text-center '>
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='w-32 py-2'> <div className='flex justify-center items-center gap-2'><a href={item.site} target='_blank'> {item.site} </a>
                                                <lord-icon
                                                    onClick={() => { copytext(item.site) }} src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover" className='cursor-pointer w-7'
                                                >
                                                </lord-icon>
                                            </div> </td>
                                            <td className='w-32 py-2'> <div className='flex justify-center items-center gap-2'><span> {item.user}</span>
                                            <lord-icon
                                                onClick={() => { copytext(item.user) }} src="https://cdn.lordicon.com/xuoapdes.json"
                                                trigger="hover" className='cursor-pointer w-7'
                                            >
                                            </lord-icon></div> </td>
                                            <td className='w-32 py-2'> <div className='flex justify-center items-center gap-2'><span> {"*".repeat(item.pass.length)}</span>
                                                <lord-icon
                                                    onClick={() => { copytext(item.pass) }} src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover" className='cursor-pointer w-7'
                                                >
                                                </lord-icon>
                                            </div> </td>
                                            <td className='w-32 py-2'> <div className='flex justify-center items-center gap-2'>

                                                <lord-icon
                                                    onClick={() => { editPassword(item.id) }}
                                                    className='cursor-pointer w-8'
                                                    src="https://cdn.lordicon.com/exymduqj.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#121331,secondary:#000000"
                                                >
                                                </lord-icon>
                                                <lord-icon
                                                    onClick={() => { deletePassword(item.id) }}
                                                    className='cursor-pointer w-8'
                                                    src="https://cdn.lordicon.com/jzinekkv.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#121331,secondary:#000000"
                                                >
                                                </lord-icon>
                                            </div> </td>
                                        </tr>
                                    )
                                })}


                            </tbody>
                        </table>
                    )}
                </div>

            </div>

        </div>
    )
}

export default Manager
