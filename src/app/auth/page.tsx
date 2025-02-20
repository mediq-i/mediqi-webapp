import AuthBanner from "@/components/partials/ui/AuthBanner";
import { GoogleLogo, LogoWhite } from "@/icons";
import Link from "next/link";

function Auth() {
  return (
    <div className="h-screen lg:flex">
      <AuthBanner />
      <div className="lg:w-[650px] w-full">
        <div className="lg:w-[480px] w-full m-auto lg:pt-10 h-full">
          <div className="hidden lg:block">
            <LogoWhite />
          </div>

          <div className="lg:mt-[200px] p-3 text-center  w-full">
            <p className="lg:text-[#1C2634] font-[700] lg:text-[32px] text-[24px] mb-5 text-white">
              Welcome
            </p>
            <Link href={"auth/signup"}>
              <button
                type="button"
                className="lg:my-5 my-2 block bg-[#1570EF] lg:w-[416px] w-full text-white px-4 py-2 rounded m-auto"
              >
                Get Started
              </button>
            </Link>
            <Link href={"auth/login"}>
              <button
                type="button"
                className="lg:my-5 block border border-[#667085] lg:w-[416px] w-full px-4 py-2 rounded text-black m-auto"
              >
                Login
              </button>{" "}
            </Link>
            <div className=" flex justify-center lg:w-[416px]">
              <div className=" lg:py-5 pt-5 mx-3">
                <GoogleLogo />
              </div>
              <p className="my-5 text-[16px] font-[600] text-center">
                Sign up with Google
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
