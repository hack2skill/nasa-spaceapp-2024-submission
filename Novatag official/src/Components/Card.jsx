import React from 'react';
const Card = (props) => {
  return (
    <>
      <div
        class="h-[18em] w-[20em] border hover:shadow-white/50 hover:scale-105 hover:shadow-lg duration-200 rounded-[1.5em]  text-white p-[1em] flex justify-center items-left flex-col gap-[0.75em] backdrop-blur-[12px]"
      >
        <div className='overflow-hidden'>
          <img className='h-20 rounded-full' src={props.img} />
          <h1 class="text-[1.9em]">{props.title}</h1>
          <p class="text-[0.85em]">
            {props.desc}
          </p>
        </div>

        <a href={props.link} target='_blank' class="h-fit w-fit px-[1em] py-[0.25em] border-[1px] rounded-full flex justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em] duration-200 backdrop-blur-[12px] hover:cursor-pointer">
          <p>Learn more</p>
          <svg
            class="w-6 h-6 group-hover:translate-x-[10%] duration-300"
            stroke="currentColor"
            stroke-width="1"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
          </svg>
        </a>
      </div>


    </>
  );
};

export default Card;