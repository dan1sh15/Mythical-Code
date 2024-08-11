import { Editor } from '@monaco-editor/react';
import React, { useContext, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaPlay } from "react-icons/fa6";
import Loader from './Loader';
import toast from 'react-hot-toast';
import { AppContext } from '../context/AppContext';

const Home = () => {

    const { loading, setLoading } = useContext(AppContext);

    const [language, setLanguage] = useState('cpp');
    const [theme, setTheme] = useState('vs-dark');
    const [code, setCode] = useState("// Enter your code here");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const changeLanguage = (e) => {
        setLanguage(e.target.value);
    }

    const changeTheme = (e) => {
        setTheme(e.target.value);
    }

    const changeHandler = (e) => {
        setCode(e);
    };

    const [color, setColor] = useState('black');

    const runCodeHandler = async () => {
        setLoading(true);
        setOutput("");
        const url = process.env.REACT_APP_BASE_URL + '/run';

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              lang: language,
              code: code,
              input: input
            })
        });


        const responseData = await response.json();
        if(responseData.success) {
            toast.success(responseData.message);
            setOutput(responseData.output)
        } else {
            setColor("red-500");
            const responseCode = responseData.error?.error?.code;
            if(responseCode === "ERR_CHILD_PROCESS_STDIO_MAXBUFFER") {
                setOutput("Time Limit Exceeded");
            }
            else if(responseCode === 3221225477) {
                setOutput("Segmentation Fault");
            } 
            else if(responseCode === 5) {
                setOutput("Access Denied");
            }
            else if(responseCode === 8) {
                setOutput("Memory limit exceeded");
            }
            else if(responseCode === 87) {
                setOutput("Invalid Parameters")
            }
            else if(responseCode === 2147942405) {
                setOutput("E_ACCESSDENIED (HRESULT)")
            }
            else if(responseCode === 2147500037) {
                setOutput("Unspecified error E_FAIL (HRESULT)");
            }
            else if(responseCode === 2147942487) {
                setOutput("E_INVALIDARG (HRESULT)")
            }
            else if(responseCode === 3221225786) {
                setOutput("The application terminated ");
            }
            else {
                setOutput(responseData.error?.stderr);
            }
        }
        setLoading(false);
    };

  return (
    <section className='pt-[13vh] w-10/12 mx-auto flex flex-col gap-y-7 min-h-screen'>
        <div className='text-greenPrimary font-semibold text-2xl uppercase'>
            <TypeAnimation
                sequence={[
                    "Your Code Editor", 1000,
                ]}
                speed={50}
                repeat={Infinity}
                wrapper='span'
                className=' mx-1'
                cursor={false}
            />
        </div>

        <div className='grid grid-cols-2 gap-5 h-full'>
            <div className='flex flex-col gap-y-5 min-h-[75vh] border-2 shadow-xl rounded py-5'>
                <div className='flex justify-between items-center px-5'>
                    <select name="language"
                        value={language}
                        className='bg-white p-2 rounded outline-none'
                        onChange={changeLanguage}
                    >
                        <option value="c++">C++</option>
                        <option value="python">Ptyhon</option>
                    </select>

                    <div className='w-full flex items-center justify-center px-5'>
                        <button onClick={runCodeHandler} className='bg-green-500 text-white px-5 py-2 rounded flex h-full w-fit items-center justify-center gap-x-3 outline-none'><FaPlay /> Run Code</button>
                    </div>

                    <select name="theme" id="theme"
                        value={theme}
                        className='bg-white p-2 rounded outline-none'
                        onChange={changeTheme}
                    >
                        <option value="vs-light">vs-light</option>
                        <option value="vs-dark">vs-dark</option>
                    </select>
                </div>

                <div className='h-full'>
                    <Editor 
                        onChange={changeHandler}
                        value={code}
                        height={'100%'}
                        theme={theme}
                        language={language}
                        options={{
                            fontSize: "16px",
                            wordWrap: "on"
                        }}
                    />
                </div>
            </div>

            <div className='flex flex-col justify-between h-full gap-y-5'>
                <div className='flex flex-col gap-y-2 h-full p-3 bg-[#EEEEEE] rounded'>
                    <label htmlFor="input" className='font-semibold text-lg'>Input</label>
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} name="input" id="input" className='bg-transparent resize-none h-full outline-none border border-black rounded-lg p-3'></textarea>
                </div>

                <div className='flex flex-col gap-y-3  h-full p-3 bg-[#EEEEEE] rounded'>
                    {
                        loading ? (<Loader />) : (
                            <>
                                <label htmlFor="output" className='font-semibold text-lg'>Output</label>
                                <pre className='p-3 w-[100%] h-full'>
                                    <textarea value={output} onChange={(e) => setOutput(e.target.value)} name="output" id="output" className={`bg-transparent resize-none h-full outline-none w-full border border-black rounded-lg p-3 text-${color}`} ></textarea>
                                </pre>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    </section>
  )
}

export default Home
