"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Dialog } from "@headlessui/react";
import Dropzone from "react-dropzone";
import Image from "next/image";
import { Input } from "../ui/input";
import { Calendar, FileText, FileUp, Trash2, Check } from "lucide-react";
import SelectDateAndTime from "../partials/SelectDateAndTime";
import { useSearchParams } from "next/navigation";
import { BookingAdapter, useBookingMutation } from "@/adapters/BookingAdapter";
import { useToast } from "@/hooks/use-toast";
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
import { Button } from "@/components/ui/button";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: provider, isLoading } = useUserQuery({
    queryCallback: () =>
      ServiceProviderAdapter.getServiceProviderDetails({
        id: providerId,
      }),
    queryKey: [queryKeys.PROVIDER_DETAILS],
  });

  // Define options array before using it in filteredOptions
  const options = [
    // General Symptoms
    "Fever",
    "Fatigue",
    "Headache",
    "Dizziness",
    "Nausea",
    "Vomiting",
    "Loss of appetite",
    "Weight loss",
    "Weight gain",
    "Sweating",
    "Chills",
    "Weakness",
    "Insomnia",
    "Anxiety",
    "Depression",
    "Stress",

    // Pain Related
    "Chest pain",
    "Abdominal pain",
    "Back pain",
    "Joint pain",
    "Muscle pain",
    "Neck pain",
    "Ear pain",
    "Eye pain",
    "Tooth pain",

    // Respiratory
    "Cough",
    "Shortness of breath",
    "Wheezing",
    "Chest tightness",
    "Runny nose",
    "Sore throat",
    "Sinus congestion",
    "Difficulty breathing",

    // Digestive
    "Diarrhea",
    "Constipation",
    "Bloating",
    "Indigestion",
    "Heartburn",
    "Stomach cramps",
    "Acid reflux",

    // Skin Related
    "Rash",
    "Itching",
    "Hives",
    "Skin discoloration",
    "Dry skin",
    "Acne",
    "Eczema",
    "Skin lesions",
    "Bruising",

    // Neurological
    "Vertigo",
    "Numbness",
    "Tingling",
    "Seizures",
    "Memory problems",
    "Confusion",
    "Difficulty concentrating",
    "Tremors",

    // Urinary
    "Frequent urination",
    "Painful urination",
    "Blood in urine",
    "Urinary urgency",
    "Difficulty urinating",
    "Incontinence",

    // Vision and Hearing
    "Blurred vision",
    "Eye redness",
    "Eye discharge",
    "Hearing loss",
    "Ringing in ears",
    "Ear discharge",
    "Sensitivity to light",

    // Mental Health
    "Mood swings",
    "Irritability",
    "Panic attacks",
    "Suicidal thoughts",
    "Hallucinations",

    // Other
    "Swelling",
    "Lymph node enlargement",
    "Night sweats",
    "Dehydration",
    "Allergic reactions",
    "Hair loss",
    "Nail changes",
  ];

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Memoized filtered options with precise matching
  const filteredOptions = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return options;

    const searchTerms = debouncedSearchQuery
      .toLowerCase()
      .split(" ")
      .filter((term) => term.length > 0);

    return options.filter((option) => {
      const optionLower = option.toLowerCase();

      // Check if ALL search terms are found in the option
      return searchTerms.every((term) => {
        // Only match if the term is at least 3 characters or is a complete word
        if (term.length < 3) {
          // For short terms, require exact word boundaries
          const words = optionLower.split(" ");
          return words.some((word) => word === term || word.startsWith(term));
        } else {
          // For longer terms, allow partial matches but require they start at word boundaries
          const words = optionLower.split(" ");
          return words.some(
            (word) => word.startsWith(term) || word.includes(term)
          );
        }
      });
    });
  }, [debouncedSearchQuery, options]);

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
  const handleContinue = (e?: React.FormEvent) => {
    e?.preventDefault();
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const handleBack = (e?: React.FormEvent) => {
    e?.preventDefault();
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
      setIsSubmitting(true);

      // Create FormData instance
      const formData = new FormData();

      // Combine date and time into ISO string
      let appointmentDateTime = "";
      try {
        appointmentDateTime = combineDateAndTime(
          selectedDate?.toLocaleDateString() || "",
          selectedTime
        );
      } catch (error) {
        console.error("Error combining date and time:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "There was an error processing the date and time. Please try again.",
        });
        return;
      }

      console.log(appointmentDateTime);

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

      // Move to payment step after successful booking
      setCurrentStep(5);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: getErrorMessage(error),
      });
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const createPaymentIntent = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const res = await createPaymentIntentMutation.mutateAsync({
        patientId: patientId,
        providerId: providerId,
        appointmentId: appointmentId,
        amount: 2000,
        currency: "NGN",
        description: "Payment",
        subAccountId: provider?.data?.sub_account_id,
      });
      toast({
        title: "Payment Initiated",
        description: res.data?.message,
      });
      window.location.href = res?.data?.data?.paystack_authorization_url;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during payment";
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full lg:w-[50%] pb-10">
      <div>
        <div>
          <form className="relative w-full p-3">
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
              <div className="mt-10">
                <div className="mb-5">
                  <label className="text-[#1D2939] text-[16px] font-[500]">
                    What symptoms have you been experiencing?
                  </label>
                  <div className="relative">
                    <div
                      className="px-4 py-2 my-3 min-h-[63px] w-full border rounded flex gap-3 bg-[#E8E8E8] flex-wrap relative cursor-pointer"
                      onClick={() => setIsOpen(true)}
                    >
                      {selectedOptions.length > 0 ? (
                        selectedOptions.map((symptom, index) => (
                          <div
                            key={index}
                            className="bg-white border rounded-3xl p-2 flex gap-3 items-center"
                          >
                            {symptom}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOptionChange(symptom);
                              }}
                              className="text-[12px] hover:text-red-500"
                            >
                              X
                            </button>
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-500">
                          Select symptoms...
                        </span>
                      )}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Image
                          src={"/dropdown-icon.svg"}
                          alt=""
                          width={16}
                          height={9}
                        />
                      </div>
                    </div>

                    <Dialog
                      open={isOpen}
                      onClose={() => setIsOpen(false)}
                      className="relative z-50"
                    >
                      <div className="fixed inset-0 bg-black/30" />
                      <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                          <div className="p-4 border-b">
                            <Input
                              placeholder="Search symptoms..."
                              className="w-full"
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>
                          <div className="p-4 overflow-y-auto flex-1">
                            {(() => {
                              if (
                                filteredOptions.length === 0 &&
                                debouncedSearchQuery.trim()
                              ) {
                                return (
                                  <div className="text-center py-8">
                                    <p className="text-gray-500 text-sm">
                                      No symptoms found matching &quot;
                                      {debouncedSearchQuery}&quot;
                                    </p>
                                    <p className="text-gray-400 text-xs mt-2">
                                      Try a different search term
                                    </p>
                                  </div>
                                );
                              }

                              return (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {filteredOptions.map((option) => (
                                    <button
                                      key={option}
                                      onClick={() => handleOptionChange(option)}
                                      className={`p-2 text-left rounded-lg transition-colors ${
                                        selectedOptions.includes(option)
                                          ? "bg-[#1D2939] text-white"
                                          : "hover:bg-gray-100"
                                      }`}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              );
                            })()}
                          </div>
                          <div className="p-4 border-t flex justify-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setIsOpen(false)}
                            >
                              Close
                            </Button>
                            <Button
                              onClick={() => setIsOpen(false)}
                              className="bg-[#1D2939] text-white"
                            >
                              Done
                            </Button>
                          </div>
                        </Dialog.Panel>
                      </div>
                    </Dialog>
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
              </div>
            )}
            {currentStep === 3 && (
              <div className="my-5 relative h-full">
                <p className="font-[500] text-[16px] text-[#353535]">Upload</p>
                <Dropzone
                  onDrop={(acceptedFiles) => setFiles(acceptedFiles)}
                  onError={(error) => {
                    console.error("Dropzone error:", error);
                    toast({
                      variant: "destructive",
                      title: "Upload Error",
                      description:
                        "There was an error with the file upload. Please try again.",
                    });
                  }}
                >
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
                  <div className="pb-4 border-b border-dashed">
                    <div className="flex items-center gap-2 my-4">
                      <Calendar />
                      <div>
                        <p className="font-[500] text-[#1D2939] text-[16px]">
                          30 Mins Session
                        </p>
                        <p className="font-[400] text-[#667085] text-[14px]">
                          {selectedDate && selectedTime
                            ? getFormattedDateAndTime(
                                combineDateAndTime(
                                  selectedDate.toLocaleDateString("en-US", {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                  }) || "",
                                  selectedTime
                                )
                              )
                            : "Date and time not selected"}
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

                <div className="flex justify-between mt-6">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="rounded-full"
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-[#1D2939] text-white rounded-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      "Proceed to Payment"
                    )}
                  </Button>
                </div>
              </div>
            )}
            {currentStep === 5 && (
              <div className="my-5 h-full relative">
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Booking Successful!
                    </h3>
                    <p className="text-gray-600">
                      Your appointment has been scheduled. Please proceed with
                      the payment to confirm your booking.
                    </p>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={createPaymentIntent}
                      className="bg-[#1D2939] text-white rounded-full px-8"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        "Proceed to Payment"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {currentStep < 4 && (
              <div className="flex justify-between mt-6">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="rounded-full"
                  disabled={isSubmitting}
                >
                  Back
                </Button>
                <Button
                  onClick={handleContinue}
                  className="bg-[#7f8a97] text-white rounded-full"
                  disabled={isSubmitting}
                >
                  Continue
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookASession;
