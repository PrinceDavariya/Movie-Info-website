import React from 'react';

function Dropdown({ title, option,func }) {
    return (
    <div className="dropdown flex   max-md:hidden justify-end mr-3 py-2 px-1 ">
       <select onChange={func} defaultValue={0} name="format" id="format" className='w-[215px]  bg-[#5e5e5e] text-xl text-zinc-300 font-semibold  '>
          <option value="0"  disabled>
            {title}
          </option>
          {option.map((o, i) => (
            <option key={i}  value={o}>{o.toUpperCase()}</option>    
          ))}
         </select>
     </div>
  );
}

export default Dropdown;
