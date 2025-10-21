"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { ButtonComp, ButtonProps, ButtonSections } from "./buttons-part";

import { useRef } from "react";

export default function FreePage() {
  const [buttons, setButtons] = useState<ButtonProps[]>([]);
  const [show, setShow] = useState<boolean>(false);
  
  const [dragging, setDragging] = useState<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addbtn = async (text: string, variant: "primary" | "secondary") => {
    const newbtn: ButtonProps = {
      id: Date.now().toString(),
      type: "button",
      position: {
        x: 500,
        y: 500,
      },
      props: {
        text,
        variant,
      },
    };
    setButtons((prev) => [...prev, newbtn]);
  };
  const handleMouse = (buttonId: string, event: React.MouseEvent) => {
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;
    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;
    const button = buttons.find((btn) => btn.id === buttonId); //  is button  presnent
    if (!button) return;
    const offsetX = mouseX - button.position.x;
    const offsetY = mouseY - button.position.y;
    setDragging({ id: buttonId, offsetX, offsetY });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!dragging) return;
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;
    const newX = mouseX - dragging.offsetX;
    const newY = mouseY - dragging.offsetY;

    setButtons(
      buttons.map((button) => {
        if (button.id === dragging.id) {
          return {
            ...button,
            position: { x: newX, y: newY },
          };
        } else {
          return button;
        }
      })
    );
  };
  const handleMouseUp = () => {
    setDragging(null); // set  null when use leave mouse 
  };
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={canvasRef}
      className=" p-2  relative  min-h-screen ">
      {buttons.map((btn) => (
        <ButtonComp key={btn.id} button={btn} onMouseDown={handleMouse} />
      ))}
      <button
        onClick={() => setShow((prev) => !prev)}
        className="rounded-md  absolute   bg-neutral-800/40   shadow border-neutral-900  cursor-pointer px-2 py-1">
        {show ? <ArrowLeft /> : <ArrowRight />}{" "}
      </button>
      {show && (
        <div className="h-full  w-56 rounded-md   bg-neutral-900 border-zinc-900/80 border  flex  items-end  flex-col gap-1 absolute top-0 left-0  z-20">
          <button
            onClick={() => setShow((prev) => !prev)}
            className="rounded-md   bg-neutral-800/40 16 items-end  shadow border-neutral-900  cursor-pointer px-2 py-1 m-1">
            {show ? <ArrowLeft /> : <ArrowRight />}{" "}
          </button>
          <div className=" rounded-md   bg-zinc-900  overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 h-full  flex  items-end  flex-col gap-1 ">
            <p className="text-md font-bold  px-1.5 py-1 flex  text-neutral-300  items-start w-full">
              Buttons
            </p>
            <ButtonSections addbtn={addbtn} />
            <div className="w-full  flex flex-col  gap-1 ">
              <p className="w-full font-bold text-neutral-300 px-1.5 py-1 flex text-md  items-start ">
                Navbars
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


