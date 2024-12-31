import Image from 'next/image';
import React from 'react';

function AuthBanner() {
    return (
        <div className='bg-[#1D2735] lg:h-full lg:w-[710px]'>
            <Image src={"/auth-medic.png"} alt='' width={710} height={500}/>
            <div className='p-5'>
                <p className='text-white font-[600] lg:text-[50px] text-[24px] lg:leading-[62px]'>Book your Doctor any Time, anywhere</p>
                <p className='text-[#ACB5BB] font-[500] texxt-[14px] mt-5'>Instant access to trusted care at your convenience</p>
            </div>
        </div>
    );
}

export default AuthBanner;