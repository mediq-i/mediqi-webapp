"use client";

import { AuthAdapter, useAuthMutation } from "@/adapters/AuthAdapter";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetPasswordMutation = useAuthMutation({
    mutationCallback: AuthAdapter.resetPassword,
  });

  const resetPassword = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 6 characters long",
      });
      return;
    }

    localStorage.setItem("token", params.access_token!);
    try {
      await resetPasswordMutation.mutateAsync({
        password: formData.password,
        refreshToken: params.refresh_token!,
      });
      toast({
        title: "Password reset successfully",
      });
      router.push("/auth/login");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during password reset";
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    }
  };

  const [params, setParams] = useState<Record<string, string | null>>({});

  useEffect(() => {
    const getHashParams = () => {
      const hash = window.location.hash.substring(1); // Remove the '#' character
      const hashParams = new URLSearchParams(hash);
      const paramsObj: Record<string, string | null> = {};
      hashParams.forEach((value, key) => {
        paramsObj[key] = value;
      });
      setParams(paramsObj);
    };

    // Get the initial hash parameters
    getHashParams();

    // Optionally, you can listen for hash changes if needed
    window.addEventListener("hashchange", getHashParams);

    // Cleanup event listener
    return () => {
      window.removeEventListener("hashchange", getHashParams);
    };
  }, []);

  // Check if passwords match and meet requirements
  const passwordsMatch =
    formData.password === formData.confirmPassword &&
    formData.password.length >= 6;
  const isFormValid =
    formData.password && formData.confirmPassword && passwordsMatch;

  return (
    <div className="mt-[150px] h-full relative">
      <p className="text-[#1C2634] font-[700] text-[32px] mb-5">
        Create new password
      </p>
      <label
        htmlFor="password"
        className="block text-[16px] font-[500] text-[#6C7278] mb-2"
      >
        Enter your new password
      </label>

      <div className="space-y-4">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full h-[54px] border rounded-md bg-[#E4E7EC] pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full h-[54px] border rounded-md bg-[#E4E7EC] pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Password validation feedback */}
        {formData.password && (
          <div className="text-sm space-y-1">
            <div
              className={`flex items-center gap-2 ${
                formData.password.length >= 6
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  formData.password.length >= 6 ? "bg-green-600" : "bg-red-600"
                }`}
              />
              At least 6 characters
            </div>
            {formData.confirmPassword && (
              <div
                className={`flex items-center gap-2 ${
                  passwordsMatch ? "text-green-600" : "text-red-600"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    passwordsMatch ? "bg-green-600" : "bg-red-600"
                  }`}
                />
                Passwords match
              </div>
            )}
          </div>
        )}
      </div>

      <Button
        type="button"
        onClick={() => resetPassword()}
        className="w-full bg-[#1570EF] py-[22px] text-base rounded-[8px] mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={resetPasswordMutation.isPending || !isFormValid}
      >
        {resetPasswordMutation.isPending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          "Reset Password"
        )}
      </Button>
    </div>
  );
}
