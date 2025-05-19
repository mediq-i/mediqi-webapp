"use client";
import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

function MedicalHistoryForm() {
    
    return (
        <div className=''>
            <p className='font-bold text-lg'>History</p>
            <p className='text-sm'>Entering your medical history allows doctors to make informed decisions and deliver better treatments.</p>

            <form action="">
            <div>
          <div className="flex gap-3 my-5 flex-wrap">
            <div className="w-[40%]">
              <label>Blood Group</label>
              <Input 
              placeholder={"Select blood group"}
              />
            </div>
            <div className="w-[40%]">
              <label>Genotype</label>
              <Input 
              placeholder={"Select Genotype"}
              />
            </div>
            <div className="w-[40%]">
              <label>Allergies</label>
              <Input 
              placeholder={"Enter any allergies you have"}
              />
            </div>
            <div className="w-[40%]">
              <label>Current Medication</label>
              <Input 
              placeholder={"Enter any medication you currently take"}
              />
            </div>
            <div className="w-[40%]">
              <label>Height</label>
              <Input 
              placeholder={"Enter your height "}
              />
            </div>
            <div className="w-[40%]">
              <label>Weight (kg)</label>
              <Input 
              placeholder={"Enter your weight"}
              />
            </div>
          </div>
        </div>
        <Button className="bg-[#1570EF] rounded-full p-6 my-3">Save Changes</Button>
            </form>
        </div>
    );
}

export default MedicalHistoryForm;