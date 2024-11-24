import React from "react";
import LoginForm from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <div
      className={
        "bg-gradient-to-b from-[#03045E] to-[#0B486D] before:fixed before:top-0 before:z-[-1] before:h-screen before:w-screen before:transition-[opacity,height] before:duration-300 before:ease-in-out before:content-['']"
      }
    >
      <div className='container relative'>
        <div className='flex min-h-screen w-full items-center justify-center p-5 md:p-20'>
          <div className='intro-y w-96'>
            <img
              className='mx-auto w-16'
              src='https://rocketman-html.vercel.app/dist/images/logo.svg'
              alt='Rocketman - Admin Dashboard Template'
            />
            <div className='mt-8 text-center text-2xl font-medium text-white dark:text-slate-300'>
              Login to Your Account!
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
