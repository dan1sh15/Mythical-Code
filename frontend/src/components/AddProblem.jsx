import React, { useState } from 'react'
import Loader from './Loader';
import toast from 'react-hot-toast';
import { AiOutlineClose } from "react-icons/ai";

const AddProblem = ({ showModal, setShowModal, fetchProblems }) => {

    const [problem, setProblem] = useState({
        title: "",
        difficulty: "Easy",
        description: "",
        input: "",
        output: ""
    });

    const [loading, setLoading] = useState(false);

    const changeHandler = (e) => {
        setProblem(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = process.env.REACT_APP_BASE_URL + '/addProblem';
        problem.slug = problem.title;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...problem})
        });

        const responseData = await response.json();

        if(responseData.success) {
            toast.success(responseData.message);
            await fetchProblems();
        } else {
            toast.error(responseData.message);
        }
        setLoading(false);
        setShowModal(false);
    };

  return (
    <div className={`min-h-screen z-20 w-full left-0 absolute flex justify-center items-center ${showModal ? 'top-0' : '-top-[10000px]'} transition-all duration-300 ease-linear`}>
      {
        loading ? (<Loader />) : (
            <div className='w-[40%] relative flex flex-col gap-y-5 bg-white rounded-lg p-5 shadow-2xl' >
                <button onClick={() => setShowModal(false)} className='right-5 top-5 w-fit absolute text-2xl'><AiOutlineClose /></button>
                <h1 className='text-3xl font-bold text-center'>Add Your Problem</h1>
                <form onSubmit={submitHandler} className='flex flex-col gap-y-4'>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor="title" className='text-lg font-semibold'>Title</label>
                        <input 
                            type="text" 
                            id='title'
                            placeholder='Enter problem Title'
                            className='px-4 py-2 rounded-sm border-2 border-[#797979] outline-none placeholder:text-[#c1c1c1]'
                            onChange={changeHandler}
                            value={problem.title}
                            name='title'
                        />
                    </div>

                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor="difficulty" className='text-lg font-semibold'>Difficulty</label>
                        <select 
                            name="difficulty" 
                            id="difficulty"
                            className='px-4 py-2 rounded-sm border-2 border-[#797979] outline-none'
                            onChange={changeHandler}
                            value={problem.difficulty}
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor="description" className='text-lg font-semibold'>Description</label>
                        <textarea 
                            name="description"
                            id="description"
                            className='px-4 py-2 rounded-sm border-2 border-[#797979] outline-none placeholder:text-[#c1c1c1]'
                            placeholder='Enter the problem description'
                            onChange={changeHandler}
                            value={problem.description}
                        ></textarea>
                    </div>

                    <div className='flex flex-col gap-y-1'>
                        <label className='text-lg font-semibold' htmlFor="input">Input</label>
                        <pre className='w-full rounded-sm border-2 border-[#797979]'>
                            <textarea 
                                name='input'
                                id='input'
                                className='outline-none p-2 border-none bg-transparent w-full'
                                placeholder='Enter the input'
                                onChange={changeHandler}
                                value={problem.input}
                            />
                        </pre>
                    </div>

                    <div className='flex flex-col gap-y-1'>
                        <label className='text-lg font-semibold' htmlFor="output">Output</label>
                        <pre className='w-full rounded-sm border-2 border-[#797979]'>
                            <textarea 
                                name='output'
                                id='output'
                                className='outline-none p-2 border-none bg-transparent w-full'
                                placeholder='Enter expected output'
                                onChange={changeHandler}
                                value={problem.output}
                            />
                        </pre>
                    </div>

                    <button className='bg-green-500 text-white px-5 py-2 rounded flex h-full w-fit items-center justify-center gap-x-3 outline-none mx-auto'>
                        Submit
                    </button>
                </form>
            </div>
        )
      }
    </div>  
  )
}

export default AddProblem
