"use client";
import React, { useState } from "react";
import { Menu, Sun, Moon } from "lucide-react";

import { useTheme } from "next-themes";
import Link from "next/link";

interface NavbarProps {
  user: {
    name: string | null;
    email: string;
    image?: string | null;
  } | null;
}

interface ButtonProps {
  open: boolean;
  setOpen: () => void;
}
export default function Navbar({ user }: NavbarProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handlebutton = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative rounded-xl flex items-center justify-between  px-1.5 py-2 ">
      <div>
        <h1 className="dark:text-neutral-300 font-bold  text-neutral-800">Logo</h1>
      </div>
      <div className="flex gap-2 items-center  px-1">
        <AuthLink open={open} setOpen={handlebutton} user={user} />
        <button
          onClick={handleTheme}
          className="rounded-md md:block hidden font-semibold  dark:text-neutral-400 text-neutral-600 text-shadow-2xs cursor-pointer  text-[12px] ">
          {theme === "dark" ? <Sun className="size-6" /> : <Moon className="size-6" />}
        </button>
      </div>
    </div>
  );
}

const AuthLink = ({ open, setOpen, user }: ButtonProps & { user?: NavbarProps["user"] }) => {
  if (user) {
    return (
      <div className="flex  items-center gap-2 ">
        <div className="relative  size-6 rounded-full overflow-hidden">
          <img src={user?.image || "/images/isuzwal.jpg"} className="rounded-full w-full h-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 ">
      <div className="hidden md:flex gap-2  rounded-lg px-2 py-1">
        <button className="rounded-[8px] bg-secondary border-secondary text-[13px] font-semibold px-6 py-1.5 cursor-pointer">
          Try one
        </button>
        <Link
          href={"/login"}
          className="rounded-[8px] text-center cursor-pointer   bg-primary border-primary text-[13px] font-semibold px-4 text-background py-1.5">
          Start
        </Link>
      </div>

      <button onClick={setOpen} className="cursor-pointer md:hidden p-2  rounded-lg">
        <Menu className="size-6  dark:text-neutral-300 " />
      </button>

      {open && (
        <div className="absolute top-12 right-0 flex flex-col gap-2  px-2  py-3 w-full md:hidden ">
          <button className="rounded-[8px] bg-secondary border-secondary text-[13px] font-semibold px-4 py-1.5 cursor-pointer">
            Try one
          </button>
          <Link
            href={"/login"}
            className="rounded-[8px] text-center cursor-pointer   bg-primary border-primary text-[13px] font-semibold px-4 text-background py-1.5">
            Start
          </Link>
        </div>
      )}
    </div>
  );
};
