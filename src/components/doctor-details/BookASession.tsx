"use client";
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea"


import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";

function BookASession() {
  const [currentStep, setCurrentStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const handleContinue = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const handleBack = () => {
    if (currentStep <= 1) {
      window.location.href = "/auth";
    } else {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };
  const getProgress = () => {
    return (currentStep / 5) * 100; // Assuming 3 steps plus submit button
  };
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleContinue();
    }
  };

  return (
    <div>
      <div className=" w-full">
        <div className="lg:w-[480px] w-full m-auto">
          <form
            onSubmit={handleSubmit}
            className={` lg:w-[480px] relative w-full lg:p-5 p-3 h-screen lg:h-auto ${
              currentStep === 2 ? " lg:h-auto bg-[#175CD3] lg:bg-white   " : ""
            }`}
          >
            <div className="">
              <p>Select date and time</p>
              <Progress
                value={getProgress()}
                className="w-[60%] mt-2 bg-[#0000001A]"
              />
            </div>
            {currentStep === 1 && (
              <div className="my-5">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border flex justify-center"
                />

                <div className="mt-10">
                  <div className="mb-5">
                    <div className="flex items-center gap-3">
                      <Image
                        src={"/morning.svg"}
                        alt=""
                        height={24}
                        width={24}
                      />
                      <p className="font-[500] text-[16px]">Morning</p>
                    </div>
                    <div className="mt-5 flex gap-3">
                      <div className="flex items-center space-x-2 w-[150px] border rounded-2xl p-3 justify-center">                        
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          9:00 AM
                        </label>
                        <Checkbox id="terms" className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white " />
                      </div>
                      <div className="flex items-center space-x-2 w-[150px] border rounded-2xl p-3 justify-center">                        
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          10:00 AM
                        </label>
                        <Checkbox id="terms" className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white " />
                      </div>
                      <div className="flex items-center space-x-2 w-[150px] border rounded-2xl p-3 justify-center">                        
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          11:00 AM
                        </label>
                        <Checkbox id="terms" className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white " />
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="flex items-center gap-3">
                      <Image
                        src={"/afternoon.svg"}
                        alt=""
                        height={24}
                        width={24}
                      />
                      <p className="font-[500] text-[16px]">Afternoon</p>
                    </div>
                    <div className="mt-5 flex gap-3">
                      <div className="flex items-center space-x-2 w-[150px] border rounded-2xl p-3 justify-center">                        
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          9:00 AM
                        </label>
                        <Checkbox id="terms" className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white " />
                      </div>
                      <div className="flex items-center space-x-2 w-[150px] border rounded-2xl p-3 justify-center">                        
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          10:00 AM
                        </label>
                        <Checkbox id="terms" className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white " />
                      </div>
                      <div className="flex items-center space-x-2 w-[150px] border rounded-2xl p-3 justify-center">                        
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          11:00 AM
                        </label>
                        <Checkbox id="terms" className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white " />
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="flex items-center gap-3">
                      <Image
                        src={"/morning.svg"}
                        alt=""
                        height={24}
                        width={24}
                      />
                      <p className="font-[500] text-[16px]">Night</p>
                    </div>
                    <div className="mt-5 flex gap-3">
                      <div className="flex items-center space-x-2 w-[150px] border rounded-2xl p-3 justify-center">                        
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          9:00 AM
                        </label>
                        <Checkbox id="terms" className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white " />
                      </div>
                      <div className="flex items-center space-x-2 w-[150px] border rounded-2xl p-3 justify-center">                        
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          10:00 AM
                        </label>
                        <Checkbox id="terms" className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white " />
                      </div>
                      <div className="flex items-center space-x-2 w-[150px] border rounded-2xl p-3 justify-center">                        
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          11:00 AM
                        </label>
                        <Checkbox id="terms" className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white " />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}{" "}
            {currentStep === 2 && (
              <div className=" mt-10">
                <div className="mb-5">
                <label className="text-[#1D2939] text-[16px] font-[500]">What symptoms have you been experiencing?</label>
                <Textarea className="h-[89px]"/>
                </div>
                <div className="mb-5">
                <label className="text-[#1D2939] text-[16px] font-[500]">How long have you been experiencing these symptoms?</label>
                <Textarea className="h-[89px]"/>
                </div>
                <div className="mb-5">
                <label className="text-[#1D2939] text-[16px] font-[500]">Please specify how you are feeling</label>
                <Textarea className="h-[89px]"/>
                </div>
              </div>
            )}{" "}
            {currentStep === 3 && (
              <div className="my-5 relative h-full">
               
              </div>
            )}
            {currentStep === 4 && (
              <div className="my-5 h-full relative">
               
              </div>
            )}
            {currentStep > 4 && (
              <div className="my-5">
                
              </div>
            )}
            <div className="p-3 flex justify-between border-t fixed bottom-0 w-[480px] bg-white">
              <button className="p-3 w-[113px] bg-[#F2F4F7] rounded-3xl" onClick={handleBack}>Previous</button>
              <button className="p-3 w-[113px] bg-[#1570EF] rounded-3xl text-white" onClick={handleContinue}>Next</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookASession;
