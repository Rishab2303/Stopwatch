import React, { useState } from 'react'

const Screen = () => {
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(55)
    const [millisecond, setmillisecond] = useState(0)
    const [ispause, setIsPause] = useState(false)
    const [intervalId, setIntervalId] = useState(null);
    // const [time, setTime] = useState({
    //     minute: "00",
    //     second: "00",
    //     millisecond: 0

    // })
    const handleStart = () => {
        if (!ispause && !intervalId) {
            setInterval(() => {
                setIsPause(true)
                setSecond((prevSecond) => {
                    if (prevSecond === 59) { setMinute(minute => minute + 1); return 0 }
                    else { return prevSecond + 1 }
                })


            }, 1000)
            setInterval(() => {
                setmillisecond((prevmilli) => (prevmilli === 999 ? 0 : prevmilli + 1))

            }, 1);
        }

        if (ispause) {
            setIsPause(false)
        }





    }
    return (
        <>
            <div className='flex gap-2'>
                <div>
                    {minute}
                </div>
                :
                <div>
                    {second}
                </div>
                :
                <div>
                    {millisecond}
                </div>
            </div>
            <div className='flex content-center items-center gap-3'>
                <button className='hidden border border-black' >Mark</button>
                <button className='border border-black' onClick={handleStart}>{ispause ? "pause" : "Start"}</button>
                <button className='hidden border border-black'>Reset</button>
            </div>
        </>
    )
}

export default Screen

