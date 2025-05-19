"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { VitalsAdapter, useVitalsMutation } from "@/adapters/VitalsAdapter";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
interface VitalsFormData {
  blood_pressure?: string;
  heart_rate?: string;
  sugar_level?: string;
  temperature?: string;
}

interface VitalsFormProps {
  onSuccess?: () => void;
}

function VitalsForm({ onSuccess }: VitalsFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VitalsFormData>();

  const addVitalMutation = useVitalsMutation({
    mutationCallback: VitalsAdapter.addVital,
  });

  const onSubmit = async (data: VitalsFormData) => {
    try {
      await addVitalMutation.mutateAsync(data);
      toast({
        title: "Success",
        description: "Vital signs recorded successfully",
      });
      reset();
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: [queryKeys.VITALS_HISTORY],
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <div className="">
      <p className="font-bold text-lg">Vital Signs</p>
      <p className="text-sm">
        Record your vital signs to help healthcare providers monitor your health
        status.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Blood Pressure (mmHg)</label>
            <Input
              placeholder="e.g., 120/80"
              type="text"
              {...register("blood_pressure")}
            />
            {errors.blood_pressure && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Heart Rate (bpm)</label>
            <Input
              placeholder="e.g., 72"
              type="number"
              {...register("heart_rate")}
            />
            {errors.heart_rate && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Blood Sugar Level (mg/dL)
            </label>
            <Input
              placeholder="e.g., 100"
              type="number"
              {...register("sugar_level")}
            />
            {errors.sugar_level && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Temperature (°C)</label>
            <Input
              placeholder="e.g., 37.0"
              type="number"
              step="0.1"
              {...register("temperature")}
            />
            {errors.temperature && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className="bg-[#1570EF] rounded-full p-6 w-full sm:w-auto"
          disabled={addVitalMutation.isPending}
        >
          {addVitalMutation.isPending ? "Saving..." : "Save Vitals"}
        </Button>
      </form>
    </div>
  );
}

export default VitalsForm;
