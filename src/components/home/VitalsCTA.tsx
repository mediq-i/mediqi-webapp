import { Button } from "@/components/ui/button";
import { Heart, Activity, Thermometer, Droplets } from "lucide-react";
import Link from "next/link";

export default function VitalsCTA() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 md:p-8 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Track Your Health Today
          </h2>
          <p className="text-blue-100 mb-6 max-w-xl">
            Keep track of your vital signs and maintain a healthy lifestyle.
            Regular monitoring helps you stay informed about your health status.
          </p>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-blue-100">
              <Heart className="h-5 w-5" />
              <span>Heart Rate</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <Activity className="h-5 w-5" />
              <span>Blood Pressure</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <Thermometer className="h-5 w-5" />
              <span>Temperature</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <Droplets className="h-5 w-5" />
              <span>Sugar Level</span>
            </div>
          </div>
          <Link href="/profile/vitals">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 transition-colors">
              Add Today&apos;s Vitals
            </Button>
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center">
            <Heart className="h-24 w-24 text-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
