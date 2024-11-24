"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import ButtonLogin from "@/components/auth/button-login";
import { useFormState } from "react-dom";
import { loginActions } from "@/actions/login-actions";

const LoginForm = () => {
  const [state, formAction] = useFormState(loginActions, null);
  return (
    <form
      action={formAction}
      className='box box--stacked relative mt-14 max-w-[450px] rounded-xl bg-white px-5 py-8'
    >
      {state?.message ? (
        <div className={"mb-4 rounded bg-red-100 py-1 text-center text-sm"}>
          {state.message}
        </div>
      ) : null}
      <input
        type='text'
        placeholder='username'
        name={"username"}
        className="dark:disabled:bg-darkmode-800/50 [&amp;[readonly]]:bg-slate-100 [&amp;[readonly]]:cursor-not-allowed [&amp;[readonly]]:dark:bg-darkmode-800/50 [&amp;[readonly]]:dark:border-transparent dark:bg-darkmode-800 [&amp;[type='file']]:border hover:file:bg-200 group-[.input-group]:[&amp;:not(:first-child)]:border-l-transparent block w-full rounded-md border-slate-200 px-4 py-3 text-sm shadow-sm transition duration-200 ease-in-out file:mr-4 file:rounded-l-md file:border-0 file:border-r-[1px] file:border-slate-100/10 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-500/70 placeholder:text-slate-400/90 focus:border-primary focus:border-opacity-40 focus:ring-4 focus:ring-primary focus:ring-opacity-20 disabled:cursor-not-allowed disabled:bg-slate-100 group-[.input-group]:z-10 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r dark:border-transparent dark:placeholder:text-slate-500/80 dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:disabled:border-transparent"
      />
      <span
        aria-atomic={"false"}
        aria-live={"polite"}
        className={"text-xs text-red-500"}
      >
        {state?.error?.username}
      </span>
      <input
        type='password'
        placeholder='Password'
        name={"password"}
        className="dark:disabled:bg-darkmode-800/50 [&amp;[readonly]]:bg-slate-100 [&amp;[readonly]]:cursor-not-allowed [&amp;[readonly]]:dark:bg-darkmode-800/50 [&amp;[readonly]]:dark:border-transparent dark:bg-darkmode-800 [&amp;[type='file']]:border hover:file:bg-200 group-[.input-group]:[&amp;:not(:first-child)]:border-l-transparent mt-4 block w-full rounded-md border-slate-200 px-4 py-3 text-sm shadow-sm transition duration-200 ease-in-out file:mr-4 file:rounded-l-md file:border-0 file:border-r-[1px] file:border-slate-100/10 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-500/70 placeholder:text-slate-400/90 focus:border-primary focus:border-opacity-40 focus:ring-4 focus:ring-primary focus:ring-opacity-20 disabled:cursor-not-allowed disabled:bg-slate-100 group-[.input-group]:z-10 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r dark:border-transparent dark:placeholder:text-slate-500/80 dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:disabled:border-transparent"
      />
      <span
        aria-atomic={"false"}
        aria-live={"polite"}
        className={"text-xs text-red-500"}
      >
        {state?.error?.username}
      </span>
      <div className='mt-4 flex text-xs text-slate-500 sm:text-sm'>
        <div className='mr-auto flex items-center'>
          <input
            type='checkbox'
            className="dark:bg-darkmode-800 [&amp;[type='radio']]:checked:bg-primary [&amp;[type='radio']]:checked:border-primary [&amp;[type='radio']]:checked:border-opacity-10 [&amp;[type='checkbox']]:checked:bg-primary [&amp;[type='checkbox']]:checked:border-primary [&amp;[type='checkbox']]:checked:border-opacity-10 [&amp;:disabled:not(:checked)]:bg-slate-100 [&amp;:disabled:not(:checked)]:cursor-not-allowed [&amp;:disabled:not(:checked)]:dark:bg-darkmode-800/50 [&amp;:disabled:checked]:opacity-70 [&amp;:disabled:checked]:cursor-not-allowed [&amp;:disabled:checked]:dark:bg-darkmode-800/50 mr-2 cursor-pointer rounded border border-slate-200 shadow-sm transition-all duration-100 ease-in-out focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:ring-offset-0 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50"
            id='remember-me'
          />
          <label className='cursor-pointer select-none' htmlFor='remember-me'>
            Remember me
          </label>
        </div>
        <a href=''>Forgot Password?</a>
      </div>
      <div className='mt-5 text-center xl:mt-8 xl:text-left'>
        <ButtonLogin />
      </div>
    </form>
  );
};

export default LoginForm;
