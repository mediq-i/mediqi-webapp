import { Bell, ChevronDown, CircleHelp } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="w-full h-16 bg-white flex items-center justify-between px-6 py-6">
      <div className='font-bold'>Home</div>
      <div className='flex items-center w-[300px] justify-around'>
        <div className='flex items-center gap-2'><CircleHelp/><p className='font-semibold'>Help</p></div>
        <Bell/>
        <div className='flex items-center gap-1'><Image src={"/profile-pic.png"} alt='' width={50} height={70} className='rounded-3xl' /> <ChevronDown> </ChevronDown></div>
      </div>
    </div>
  );
};

export default Navbar;
