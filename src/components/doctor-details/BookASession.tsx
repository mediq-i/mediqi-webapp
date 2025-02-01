"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Dialog } from "@headlessui/react";

// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
import Image from "next/image";
import { Input } from "../ui/input";

function BookASession() {
  const [currentStep, setCurrentStep] = useState(1);
  // const [checked, setChecked] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [otherOption, setOtherOption] = useState("");

  const handleOptionChange = (option: string) => {
    if (option === "Other" && selectedOptions.includes("Other")) {
      setSelectedOptions(selectedOptions.filter((o) => o !== "Other"));
      setOtherOption("");
    } else if (option === "Other") {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    }
  };
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
  const [formData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  // const handleKeyPress = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     handleContinue();
  //   }
  // };
  const options = ["Option 1", "Option 2", "Option 3", "Other"];

  return (
    <div>
      <div className="">
        <div>
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
                          htmlFor="9"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          9:00 AM
                        </label>
                        <Checkbox
                          id="9"
                          className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white "
                        />
                      </div>
                      <div className="flex items-center space-x-2 w-[150px] border rounded-2xl p-3 justify-center">
                        <label
                          htmlFor="10"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          10:00 AM
                        </label>
                        <Checkbox
                          id="10"
                          className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white "
                        />
                      </div>
                      <div className="flex items-center space-x-2 w-[150px] border rounded-2xl p-3 justify-center">
                        <label
                          htmlFor="11"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          11:00 AM
                        </label>
                        <Checkbox
                          id="11"
                          className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white "
                        />
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
                        <Checkbox
                          id="terms"
                          className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white "
                        />
                      </div>
                      <div className="flex items-center space-x-2 w-[150px] border rounded-2xl p-3 justify-center">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          10:00 AM
                        </label>
                        <Checkbox
                          id="terms"
                          className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white "
                        />
                      </div>
                      <div className="flex items-center space-x-2 w-[150px] border rounded-2xl p-3 justify-center">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          11:00 AM
                        </label>
                        <Checkbox
                          id="terms"
                          className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white "
                        />
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
                        <Checkbox
                          id="terms"
                          className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white "
                        />
                      </div>
                      <div className="flex items-center space-x-2 w-[150px] border rounded-2xl p-3 justify-center">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          10:00 AM
                        </label>
                        <Checkbox
                          id="terms"
                          className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white "
                        />
                      </div>
                      <div className="flex items-center space-x-2 w-[150px] border rounded-2xl p-3 justify-center">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          11:00 AM
                        </label>
                        <Checkbox
                          id="terms"
                          className="border-none shadow-none data-[state=checked]:text-[#2E90FA] data-[state=checked]:bg-white "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}{" "}
            {currentStep === 2 && (
              <div className=" mt-10">
                <div className="mb-5">
                  <label className="text-[#1D2939] text-[16px] font-[500]">
                    What symptoms have you been experiencing?
                  </label>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="px-4 py-2 my-3 h-[63px] w-full border rounded"
                  >
                    {selectedOptions.length > 0
                      ? selectedOptions.join(", ")
                      : "Select Symptoms"}
                  </button>
                </div>
                {selectedOptions.includes("Other") && (
                  <div className="my-4">
                    <label className="text-[#1D2939] text-[16px] font-[500]">
                      Please specify how you are feeling
                      <Textarea
                        value={otherOption}
                        onChange={(e) => setOtherOption(e.target.value)}
                        className="h-[89px]"
                      />
                    </label>
                  </div>
                )}
                <div className="mb-5">
                  <label className="text-[#1D2939] text-[16px] font-[500]">
                    How long have you been experiencing these symptoms?
                  </label>
                  <Textarea className="h-[89px]" />
                </div>
                <div className="mb-5">
                  <label className="text-[#1D2939] text-[16px] font-[500]">
                    Please specify how you are feeling
                  </label>
                  <Textarea className="h-[89px]" />
                </div>

                <div className="p-6">
                  {/* <button
                    onClick={() => setIsOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    {selectedOptions.length > 0
                      ? selectedOptions.join(", ")
                      : "Select Options"}
                  </button> */}

                  <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="relative z-10"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-30" />

                    <div className="fixed inset-0 flex items-center justify-center">
                      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md z-20">
                        <Dialog.Title className="text-xl font-semibold mb-4">
                          <Input
                            placeholder="Search symptoms"
                            className="p-5"
                          />
                        </Dialog.Title>
                        <div className="flex flex-wrap gap-2">
                          {options.map((option) => (
                            <button
                              key={option}
                              className={`px-4 py-2 rounded-3xl cursor-pointer transition duration-200 ${
                                selectedOptions.includes(option)
                                  ? "bg-[#1D2939] text-white"
                                  : "bg-[#E4E7EC]"
                              }`}
                              onClick={() => handleOptionChange(option)}
                            >
                              {option}
                            </button>
                          ))}
                        </div>

                        <div className="mt-6 flex justify-end">
                          <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog>
                </div>
              </div>
            )}{" "}
            {currentStep === 3 && <div className="my-5 relative h-full"></div>}
            {currentStep === 4 && <div className="my-5 h-full relative"></div>}
            {currentStep > 4 && <div className="my-5"></div>}
            <div className="p-3 flex justify-between border-t fixed bottom-0 w-[480px] bg-white">
              <button
                className="p-3 w-[113px] bg-[#F2F4F7] rounded-3xl"
                onClick={handleBack}
              >
                Previous
              </button>
              <button
                className="p-3 w-[113px] bg-[#1570EF] rounded-3xl text-white"
                onClick={handleContinue}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookASession;
