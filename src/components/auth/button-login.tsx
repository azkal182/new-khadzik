"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

const ButtonLogin = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type={"submit"} className={"w-full"}>
      {pending ? "authenticating" : "login"}
    </Button>
  );
};

export default ButtonLogin;
