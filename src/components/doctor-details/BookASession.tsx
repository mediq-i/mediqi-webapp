"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Dialog } from "@headlessui/react";
import Dropzone from "react-dropzone";
import Image from "next/image";
import { Input } from "../ui/input";
import { Calendar, FileText, FileUp, Trash2 } from "lucide-react";
import SelectDateAndTime from "../partials/SelectDateAndTime";
import { useSearchParams } from "next/navigation";
import { BookingAdapter, useBookingMutation } from "@/adapters/BookingAdapter";
import { useToast } from "@/hooks/use-toast";
import PayForSessionModal from "./PayForSessionModal";
import { PaymentAdapter, usePaymentMutation } from "@/adapters/PaymentAdapter";
import { queryKeys } from "@/constants";
import {
  ServiceProviderAdapter,
  useUserQuery,
} from "@/adapters/ServiceProviders";
import FormData from "form-data";
import {
  combineDateAndTime,
  getErrorMessage,
  getFormattedDateAndTime,
} from "@/utils";

function BookASession() {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [otherOption, setOtherOption] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const searchParams = useSearchParams();
  const providerId = searchParams.get("id");
  const [sessionData, setSessionData] = useState({
    appointment_date: selectedDate,
    patient_symptoms: selectedOptions,
    patient_ailment_description: otherOption,
    patient_symptom_duration: "",
    status: "pending",
    service_provider_id: providerId,
  });
  const [patientId, setPatientId] = useState();
  const [appointmentId, setAppointmentId] = useState();

  const { data: provider, isLoading } = useUserQuery({
    queryCallback: () =>
      ServiceProviderAdapter.getServiceProviderDetails({
        id: providerId,
      }),
    queryKey: [queryKeys.PROVIDER_DETAILS],
  });

  console.log(selectedDate?.toLocaleDateString(), selectedTime);

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
    return (currentStep / 5) * 100;
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSessionData({ ...sessionData, [name]: value });
  };
  const bookAppointmentMutation = useBookingMutation({
    mutationCallback: BookingAdapter.bookAppointment,
  });
  const createPaymentIntentMutation = usePaymentMutation({
    mutationCallback: PaymentAdapter.createPaymentIntent,
  });
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      // Create FormData instance
      const formData = new FormData();

      // Clean up the time string (remove AM/PM for parsing)
      const cleanTime = selectedTime.replace(/\s/g, "");

      // Combine date and time into ISO string
      const appointmentDateTime = combineDateAndTime(selectedDate, cleanTime);

      // Add basic appointment data
      formData.append("appointment_date", appointmentDateTime);
      formData.append("patient_symptoms", JSON.stringify(selectedOptions));
      formData.append("patient_ailment_description", otherOption);
      formData.append(
        "patient_symptom_duration",
        sessionData.patient_symptom_duration
      );
      formData.append("status", "pending");
      formData.append("service_provider_id", providerId || "");

      // Add medical documents if they exist
      files.forEach((file) => {
        formData.append(`medical_document`, file);
      });

      //@ts-expect-error form-data is not typed
      const res = await bookAppointmentMutation.mutateAsync(formData);

      setPatientId(res.data.appointment.patient_id);
      setAppointmentId(res.data.appointment.id);

      toast({
        title: "Booking Successful",
        description: "Appointment request sent successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: getErrorMessage(error),
      });
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createPaymentIntent = async (e: any) => {
    try {
      e.preventDefault();
      const res = await createPaymentIntentMutation.mutateAsync({
        patientId: patientId,
        providerId: providerId,
        appointmentId: appointmentId,
        amount: 1500,
        currency: "NGN",
        description: "Payment",
        subAccountId: provider?.data?.sub_account_id,
      });
      toast({
        title: "Payment Initiated",
        description: res.data?.message,
      });
      window.location.href = res?.data?.data?.paystack_authorization_url;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

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
    <div className="w-full lg:w-[50%] pb-10">
      <div>
        <div>
          <form onSubmit={handleSubmit} className="relative w-full p-3">
            <div>
              <p className="font-[500] text-[18px] md:text-[20px]">
                {currentStep === 1
                  ? "Select date and time"
                  : currentStep === 2
                  ? "How are you feeling?"
                  : currentStep === 3
                  ? "Upload any medical document (optional)"
                  : currentStep === 4
                  ? "Summary"
                  : ""}
              </p>
              <Progress
                value={getProgress()}
                className="w-full md:w-[60%] mt-2 bg-[#0000001A]"
              />
            </div>
            {currentStep === 1 && (
              <SelectDateAndTime
                provider={provider}
                isLoading={isLoading}
                selectDate={setSelectedDate}
                //@ts-expect-error setSelectedTime is not typed
                selectTime={setSelectedTime}
              />
            )}{" "}
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
                  <Textarea
                    className="h-[89px]"
                    value={sessionData.patient_symptom_duration}
                    name="patient_symptom_duration"
                    onChange={(e) => handleChange(e)}
                  />
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
            {currentStep === 4 && (
              <div className="my-5 h-full relative">
                <div>
                  <div className=" pb-4 border-b border-dashed">
                    <div className="flex items-center gap-2 my-4">
                      <Calendar />
                      <div>
                        <p className="font-[500] text-[#1D2939] text-[16px]">
                          30 Mins Session
                        </p>
                        <p className="font-[400] text-[#667085] text-[14px]">
                          {getFormattedDateAndTime(selectedDate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="font-[500] text-[#667085] text-[18px]">{`Treatment overview`}</p>
                  <div className="my-4 pb-4 border-b border-dashed">
                    <p className="font-[500] text-[#1D2939] text-[14px]">{`Symptoms`}</p>

                    <div>
                      <div className="px-4 py-2 my-3 min-h-[63px] w-full rounded flex gap-3 flex-wrap relative">
                        {selectedOptions?.map((symptom, index) => {
                          return (
                            <div
                              key={index}
                              className="bg-white border rounded-3xl p-2 flex gap-3 items-center"
                            >
                              {symptom}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentStep > 4 && (
              <div className="my-5 h-full relative">
                <div>
                  <div className=" pb-4 border-b border-dashed">
                    <p className="font-[400] text-[#353535] text-[14  px]">{`Booking Fee`}</p>
                    <p className="font-[500] text-[18px]">{`40,000`}</p>
                  </div>

                  <p className="font-[500] text-[#667085] text-[18px]">{`Session overview`}</p>
                  <div className="my-4 pb-4 border-b border-dashed">
                    <div className="flex items-center gap-2 my-4">
                      <Calendar />
                      <div>
                        <p className="font-[500] text-[#1D2939] text-[16px]">
                          30 Mins Session
                        </p>
                        <p className="font-[400] text-[#667085] text-[14px]">
                          {getFormattedDateAndTime(selectedDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="my-4">
                    <p className="font-[500] text-[#667085] text-[18px]">{`Payment Details`}</p>
                    <div className="pb-1 my-3 border-b flex justify-between">
                      <p className="font-[400] text-[14px] text-[#4B5563]">
                        Fee
                      </p>
                      <p className="font-[500] text-[14px] text-[#111827]">
                        NGN 40,000.00
                      </p>
                    </div>
                    <div className="pb-1 my-3 border-b flex justify-between">
                      <p className="font-[400] text-[14px] text-[#4B5563]">
                        Tax
                      </p>
                      <p className="font-[500] text-[14px] text-[#111827]">
                        NGN 199.00
                      </p>
                    </div>
                    <div className="pb-1 my-3 flex justify-between">
                      <p className="font-[600] text-[14px]">Total Payment</p>
                      <p className="font-[500] text-[14px] text-[#111827]">
                        NGN 40,000.00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="p-3 flex justify-between border-t fixed bottom-0 left-0 right-0 md:relative md:w-[500px] md:mx-auto bg-white">
              <button
                className="p-3 w-[100px] md:w-[113px] bg-[#F2F4F7] rounded-3xl"
                onClick={handleBack}
                disabled={currentStep <= 1}
                type="button"
              >
                Previous
              </button>
              {currentStep === 5 ? (
                <PayForSessionModal createPaymentIntent={createPaymentIntent} />
              ) : (
                <button
                  className="p-3 w-[100px] md:w-[113px] bg-[#1570EF] rounded-3xl text-white"
                  onClick={handleContinue}
                  type={currentStep === 4 ? "submit" : "button"}
                >
                  {currentStep === 4 ? "Payment" : "Next"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookASession;
