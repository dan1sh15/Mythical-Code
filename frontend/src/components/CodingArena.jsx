import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import AddProblem from './AddProblem';
import { AppContext } from '../context/AppContext';

const CodingArena = () => {

  const { userData, fetchUserDetails } = useContext(AppContext);

  const [problems, setProblems] = useState([]);

  const fetchProblems = async () => {
    const url = process.env.REACT_APP_BASE_URL + '/getAllProblems';
    const response = await fetch(url);
    const responseData = await response.json();

    if(responseData.success) {
      setProblems(responseData.data);
      console.log(problems);
    } else {
      toast.error(responseData.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await fetchProblems();
      await fetchUserDetails();
    }
    
    fetchData();
    // eslint-disable-next-line
  }, []);

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={`pt-[13vh] min-h-screen w-10/12 mx-auto flex flex-col gap-y-7 ${showModal && 'opacity-[0.65]'}`}>
      <h1 className='text-4xl font-bold text-center drop-shadow-lg capitalize'>Welcome to the Coding Arena</h1>

      
      {
        userData?.role === "Admin" && (
          <div className='w-full flex items-center justify-end'>
            <button onClick={() => setShowModal(true)} className='flex gap-x-2 items-center text-xl px-5 py-2 rounded-md bg-green-500 text-white hover:scale-[1.03] transition-all duration-300 ease-in-out'>
              Add <FaPlus />
            </button>
          </div>
        )
      }


      <div className='flex flex-col w-full border-2 border-black'>
        <div className='flex items-center bg-[#201E43] text-white text-lg text-center'>
          <p className='w-[10%] p-3'>No.</p>
          <p className='w-full p-3'>Problem</p>
          <p className='w-[15%] p-3 text-center'>Solve It</p>
        </div>

        {
          problems?.map((problem, idx) => (
            <div key={problem._id} className='flex items-center text-lg'>
              <p className='w-[10%] p-3 border-r-2 border-r-black text-center'>{idx+1}</p>
              <p className='w-full p-3 border-r-2 border-r-black'>{problem.title}</p>
              <Link to={`/codingArena/${problem._id}`} className='w-[15%] text-green-500 p-3 underline cursor-pointer text-center'>Solve</Link>
            </div>
          ))
        }

      </div>

      </div>
      <AddProblem showModal={showModal} setShowModal={setShowModal} fetchProblems={fetchProblems} />
    </>
  )
}

export default CodingArena
