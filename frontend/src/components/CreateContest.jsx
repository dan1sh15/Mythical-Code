import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import AddProblem from './AddProblem';

const CreateContest = () => {

    const [contest, setContest] = useState({});
    const { loading, setLoading } = useContext(AppContext);
    const navigate = useNavigate(); 
    const { id } = useParams();

    const fetchContestDetails = async () => {
        setLoading(true);
        const url = process.env.REACT_APP_BASE_URL + `/goToContest/${id}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('token')
            },
        });

        const responseData = await response.json();

        if(responseData.success) {
            setLoading(false);
            setContest(responseData.contest);
        } else {
            toast.error(responseData.message);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            const fetchData = async () => {
                await fetchContestDetails();
            }
            fetchData();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    const [showModal, setShowModal] = useState(false);


  return (
    <div className='w-10/12 mx-auto min-h-screen flex flex-col gap-y-10 pt-[13vh] pb-10'>
      <h1 className='text-3xl font-bold capitalize text-center'>{contest?.name}</h1>

      <div className='flex flex-col gap-y-3'>
        <div className='flex flex-col w-10/12 mx-auto rounded border-2 border-black'>
            <div className='flex items-center bg-[#201E43] text-white text-lg text-center'>
                <p className='w-[10%] p-3'>No.</p>
                <p className='w-full p-3'>Problem</p>
                <p className='w-[15%] p-3 text-center'>Delete</p>
            </div>

            {
                contest?.problems?.map((problem, idx) => (
                    <div key={problem?._id} className='flex items-center text-lg'>
                        <p className='w-[10%] p-3 border-r-2 border-r-black text-center'>{idx+1}</p>
                        <p className='w-full p-3 border-r-2 border-r-black'>{problem?.title}</p>
                        <div className='w-[15%] text-green-500 p-3 underline cursor-pointer text-center'>Delete</div>
                    </div>
                ))
            }
        </div>
      </div>

      <button onClick={() => setShowModal(true)} className='w-fit text-lg mx-auto rounded-md text-white bg-green-400 px-5 py-2'>Add Problem</button>

      <AddProblem fetchContestDetails={fetchContestDetails} showModal={showModal} setShowModal={setShowModal} from="Contest" contestId={contest._id} />
    </div>
  )
}

export default CreateContest
