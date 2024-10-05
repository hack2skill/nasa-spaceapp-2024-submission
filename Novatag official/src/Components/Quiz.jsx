import React, { useRef, useState } from 'react';
import { data } from '../assets/data';

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  let option_arr = [option1, option2, option3, option4];

  const checkans = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add('bg-green-400', 'bg-opacity-40', 'border-green-600');
        setScore((prev) => prev + 1);
        setLock(true);
      } else {
        e.target.classList.add('bg-red-400', 'bg-opacity-40', 'border-red-600');
        option_arr[question.ans - 1].current.classList.add('bg-green-400', 'bg-opacity-40', 'border-green-600');
        setLock(true);
      }
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex(index + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      option_arr.forEach((option) => {
        option.current.classList.remove('bg-green-400', 'bg-red-400', 'bg-opacity-40', 'border-red-600', 'border-green-600');
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    option_arr.forEach((option) => {
      option.current.classList.remove('bg-green-400', 'bg-red-400', 'bg-opacity-40', 'border-red-600', 'border-green-600');
    });
  };

  return (
    <>
      <div className='flex justify-center items-center flex-col gap-12 m-4'>
        <h1 className='text-white text-3xl tracking-wide'>Quiz For Exoplanets</h1>
        <div className='glass-effect text-white p-5 flex w-1/2 flex-col gap-5 rounded-xl'>
          {result ? (
            <>
              <div className='flex flex-col justify-center items-center gap-8'>
                <h2 className='text-center'>
                  Your Score is {score} out of {data.length}
                </h2>
                <button onClick={reset} className='bg-blue-600 w-fit py-2 px-8 rounded-2xl hover:bg-blue-800 duration-200'>
                  Reset
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className='text-xl'>
                {index + 1}. {question.question}
              </h2>
              <ul className='flex flex-col gap-5'>
                <li ref={option1} className='border p-4 rounded-lg cursor-pointer' onClick={(e) => checkans(e, 1)}>
                  {question.option1}
                </li>
                <li ref={option2} className='border p-4 rounded-lg cursor-pointer' onClick={(e) => checkans(e, 2)}>
                  {question.option2}
                </li>
                <li ref={option3} className='border p-4 rounded-lg cursor-pointer' onClick={(e) => checkans(e, 3)}>
                  {question.option3}
                </li>
                <li ref={option4} className='border p-4 rounded-lg cursor-pointer' onClick={(e) => checkans(e, 4)}>
                  {question.option4}
                </li>
              </ul>
              <div className='flex justify-center flex-col items-center gap-5'>
                <button
                  onClick={next}
                  className={`bg-blue-600 w-fit py-2 px-8 rounded-2xl hover:bg-blue-800 duration-200 ${!lock ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!lock}
                >
                  Next
                </button>
                <p>
                  {index + 1} of {data.length} Questions
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
