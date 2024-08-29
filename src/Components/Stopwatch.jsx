import React, { useState, useEffect } from 'react';
import './Stopwatch.css'

const Timer = () => {
    const [time, setTime] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [markArr, setMarkArr] = useState([]);

    const handleStart = () => {
        if (!isStarted && !isPaused) {
            setIsStarted(true);
            let start = Date.now() - time;

            const id = setInterval(() => {
                setTime(Date.now() - start);
            }, 1);
            setIntervalId(id);
        } else if (isStarted && !isPaused) {
            setIsPaused(true);
            clearInterval(intervalId);
            setIntervalId(null);
        } else if (isPaused && isStarted) {
            setIsPaused(false);
            let start = Date.now() - time;

            const id = setInterval(() => {
                setTime(Date.now() - start);
            }, 1);
            setIntervalId(id);
        }
    };

    const handleMark = () => {
        if (isStarted) {
            setMarkArr((prevMarkArr) => [...prevMarkArr, formatTime(time)]);
        }

    };

    const handleReset = () => {
        setIsStarted(false);
        setTime(0);
        clearInterval(intervalId);
        setIsPaused(false);
        setIntervalId(null);
        setMarkArr([])
    };

    useEffect(() => {
        return () => clearInterval(intervalId);
    }, [intervalId]); // Proper dependency on intervalId

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = time % 1000;
        return `${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}: ${milliseconds < 100 ? milliseconds < 10 ? '00' + milliseconds : '0' + milliseconds : milliseconds}`;
    };

    return (
        <div className='flex flex-col justify-center items-center w-[323px] p-4 min-[332px]:'>
            <div className='w-[200px] h-[200px] rounded-[50%] border border-[2px solid white] flex justify-center items-center text-white font-sans text-2xl'>
                {formatTime(time)}
            </div>
            <div className=' mt-8 flex content-center items-center gap-5'>
                <button className={`${isStarted ? "" : "hidden1"} border border-2px-white px-4 `} onClick={handleMark}>
                    Mark
                </button>
                <button className='border border-2px-white px-4 ' onClick={handleStart}>
                    {isStarted ? (isPaused ? "Resume" : "Pause") : "Start"}
                </button>
                <button className={`${isStarted ? "" : "hidden1"} border border-2px-white px-4 `} onClick={handleReset}>
                    Reset
                </button>
            </div>
            <div className='mt-4 h-1/2 w-full overflow-auto mb-3 '>
                {markArr.map(lap => <div className='border border-1px-white mt-2 text-center w-full'>{lap}</div>)}
            </div>
        </div>
    );
};

export default Timer;
