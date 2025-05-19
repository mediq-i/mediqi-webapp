"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import VitalsForm from "./VitalsForm";
import { VitalsAdapter, useVitalsQuery } from "@/adapters/VitalsAdapter";
import { queryKeys } from "@/constants";
import { getFormattedDateAndTime } from "@/utils";

function VitalsHistory() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [userId, setUserId] = React.useState<string>("");

  React.useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  console.log(userId);

  const {
    data: vitalsHistory,
    isLoading,
    refetch,
  } = useVitalsQuery({
    queryCallback: () => VitalsAdapter.getPatientVitals(userId),
    queryKey: [queryKeys.VITALS_HISTORY, userId],
    // enabled: !!userId,
  });

  const handleSuccess = () => {
    setIsOpen(false);
    refetch();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Vital Signs History</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1570EF] rounded-full w-full sm:w-auto">
              Add New Vitals
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] w-[95vw]">
            <DialogHeader>
              <DialogTitle>Record New Vital Signs</DialogTitle>
            </DialogHeader>
            <VitalsForm onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Blood Pressure
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Heart Rate
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Blood Sugar
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Temperature
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-3 py-4 text-center text-sm text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : vitalsHistory?.data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-3 py-4 text-center text-sm text-gray-500"
                    >
                      No vital signs recorded yet
                    </td>
                  </tr>
                ) : (
                  vitalsHistory?.data.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getFormattedDateAndTime(record.created_at)}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.blood_pressure || "--"}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.heart_rate || "--"} bpm
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.sugar_level || "--"} mg/dL
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.temperature || "--"}°C
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VitalsHistory;
