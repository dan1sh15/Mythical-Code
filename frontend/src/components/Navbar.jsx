import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FaLaptopCode } from "react-icons/fa";
import { LuSwords } from "react-icons/lu";

const Navbar = () => {

  const { loggedIn, setLoggedIn, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login');
  }

  return (
    <div className='h-[10vh] bg-[#201E43] fixed w-full z-10'>
      <div className='w-10/12 mx-auto flex justify-between h-full items-center'>
        <Link to="/"><h1 className='text-white text-3xl font-semibold'>Mythical Code</h1></Link>

        <nav className='flex items-center'>
            <ul className='flex gap-x-5 text-white'>
                <li><NavLink className='flex items-center gap-x-2' to='/codingArena'>Coding Arena <FaLaptopCode className='text-xl' /></NavLink></li>
                <li><NavLink className='flex items-center gap-x-2' to={'/codingBattleground'}>Coding Battleground <LuSwords className='text-xl' /></NavLink></li>
            </ul>

        </nav>
        {
            loggedIn ? (
              <div  className='flex items-center justify-center gap-x-3'>
                <p className='text-white font-semibold'>{userData?.name?.split(' ')[0]}</p>
                <button onClick={handleLogout} className=' text-white border-2 border-white rounded font-semibold text-lg px-5 py-1 hover:bg-white hover:text-[#201E43] transition-all duration-300 ease-in-out'>Logout</button>
              </div>
            ) : (
              <Link to={'/login'} className='flex items-center justify-center'>
                <button className=' text-white border-2 border-white rounded font-semibold text-lg px-5 py-1 hover:bg-white hover:text-[#201E43] transition-all duration-300 ease-in-out'>Login</button>
              </Link>
            )
        }
      </div>
    </div>
  )
}

export default Navbar
