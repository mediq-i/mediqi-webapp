"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Dialog } from "@headlessui/react";
import Dropzone from "react-dropzone";
import Image from "next/image";
import { Input } from "../ui/input";
import { FileText, FileUp, Trash2 } from "lucide-react";
import SelectDateAndTime from "../partials/SelectDateAndTime";

function BookASession() {
  const [currentStep, setCurrentStep] = useState(1);
  // const [checked, setChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [otherOption, setOtherOption] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  console.log("files", files);

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
  const options = [
    "Others",
    "Anxiety",
    "Loss of appetite",
    "Sweating",
    "Weight loss",
    "Fever",
    "Depression",
    "Insomnia",
    "Weakness",
    "Suicidal thoughts",
    "Tummy ache",
  ];

  return (
    <div className="w-[50%]">
      <div>
        <div>
          <form onSubmit={handleSubmit} className={`relative w-full p-3 `}>
            <div className="">
              <p className="font-[500] text-[20px]">
                {currentStep === 1
                  ? "Select date and time"
                  : currentStep === 2
                  ? "How are you feeling?"
                  : currentStep === 3
                  ? "Upload any medical document (optional)"
                  : ""}
              </p>
              <Progress
                value={getProgress()}
                className="w-[60%] mt-2 bg-[#0000001A]"
              />
            </div>
            {currentStep === 1 && <SelectDateAndTime />}{" "}
            {currentStep === 2 && (
              <div className=" mt-10">
                <div className="mb-5 cursor-pointer">
                  <label className="text-[#1D2939] text-[16px] font-[500]">
                    What symptoms have you been experiencing?
                  </label>
                  <div className="px-4 py-2 my-3 min-h-[63px] w-full border rounded flex gap-3 bg-[#E8E8E8] flex-wrap relative">
                    {selectedOptions.length > 0 ? (
                      selectedOptions.map((symptom, index) => {
                        return (
                          <div
                            key={index}
                            className="bg-white border rounded-3xl p-2 flex gap-3 items-center"
                          >
                            {symptom}
                            <button
                              onClick={() => handleOptionChange(symptom)}
                              className="text-[12px]"
                            >
                              X
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <div
                        className="absolute right-4 bottom-7"
                        onClick={() => setIsOpen(true)}
                      >
                        <Image
                          src={"/dropdown-icon.svg"}
                          alt=""
                          width={16}
                          height={9}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {selectedOptions.includes("Others") && (
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
                {/* <div className="mb-5">
                  <label className="text-[#1D2939] text-[16px] font-[500]">
                    Please specify how you are feeling
                  </label>
                  <Textarea className="h-[89px]" />
                </div> */}

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
                              className={`px-4 py-2 rounded-3xl cursor-pointer transition duration-200 hover:bg-[#1D2939] hover:text-white ${
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
                            className="px-4 py-2 bg-blue-500 text-white rounded-3xl"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog>
                </div>
              </div>
            )}{" "}
            {currentStep === 3 && (
              <div className="my-5 relative h-full">
                <p className="font-[500] text-[16px] text-[#353535]">Upload</p>
                <Dropzone onDrop={(acceptedFiles) => setFiles(acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (
                    <section className="border-dashed border-[#CACACA] border h-[130px] text-center p-5 rounded-sm mt-3 cursor-pointer">
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="bg-[#F5F5F5] rounded-full w-[50px] m-auto h-[50px] flex items-center">
                          <FileUp className="m-auto text-[#1570EF]" />
                        </div>
                        <p className="font-[400] text-[14px]">
                          <span className="text-[#1570EF]">
                            Click to Upload
                          </span>{" "}
                          or drag and drop
                        </p>
                        <p className="font-[400] text-[12px] text-[#353535]">
                          {" "}
                          (Max. File size: 25 MB)
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
                {files?.map((file, index) => {
                  return (
                    <div
                      key={index}
                      className="border p-2 flex items-center flex-wrap justify-between rounded-sm mt-3"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="text-[#353535] h-[20px] w-[20px] " />
                        <div>
                          <p className="text-[#353535] font-[500] text-[14px]">
                            {file.name}
                          </p>
                          <p className="text-[#989692] font-[400] text-[12px]">
                            {file.size} bytes
                          </p>
                        </div>
                      </div>
                      <Trash2
                        className="text-[#353535] h-[20px] w-[20px] cursor-pointer"
                        onClick={() => {
                          setFiles((prev) =>
                            prev.includes(file)
                              ? prev.filter((o) => o !== file)
                              : [...prev, file]
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            {currentStep === 4 && <div className="my-5 h-full relative"></div>}
            {currentStep > 4 && <div className="my-5"></div>}
            <div className="p-3 flex justify-between border-t fixed bottom-0 m-auto w-[500px]  bg-white">
              <button
                className="p-3 w-[113px] bg-[#F2F4F7] rounded-3xl"
                onClick={handleBack}
                disabled={currentStep <= 1}
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
