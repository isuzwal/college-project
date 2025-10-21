"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export interface ButtonProps {
  id: string;
  type: string;
  position: { x: number; y: number };
  props: {
    text: string;
    variant: "primary" | "secondary";
  };
}
interface ButtonCompProps {
  button: ButtonProps;
  onMouseDown:(buttonID:string,event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void;
  className?: string;
    onClick?: () => void;
}
interface btnfn {
  addbtn: (text: string, variant: "primary" | "secondary") => void;
}
export const ButtonSections = ({ addbtn }: btnfn) => {
  return (
    <div className="flex   items-center gap-1  px-1.5">
      <button
        onClick={() => addbtn("Primary", "primary")}
        className={cn(
          "rounded-md text-[14px] px-5 py-1.5 font-semibold text-neutral-300  bg-black cursor-pointer"
        )}>
        Primary
      </button>
      <button
        onClick={() => addbtn("Secondary", "secondary")}
        className={cn(
          "rounded-md text-[14px]  px-5 py-1.5  font-semibold text-black  bg-primary cursor-pointer"
        )}>
        Secondary
      </button>
    </div>
  );
};
export const ButtonComp = ({ button, className = "" ,onMouseDown}: ButtonCompProps  ) => {
  const { variant, text } = button.props;
  const btnClass = variant === "primary" ? "text-neutral-300 bg-black" : "text-black bg-primary";
  return (
    <button onMouseDown={(event)=>onMouseDown(button.id,event)}  
      style={{ position: "absolute", left: button.position.x, top: button.position.y }}
      className={`
         rounded-md px-5 py-1.5 text-[14px] font-semibold cursor-pointer ${btnClass} ${className}
        `}>
      <span className="text-neutral-600 ">{text}</span>
    </button>
  );
};

// interface ModelProps{
//   text:string,
//   setText:(text:string)=>void,
//   handleText:()=>void
// }
// const ModelPop=({text,setText ,handleText}:ModelProps)=>{
//   return(
//     <div className="rounded-md bg-neutral-900 border-neutral-950 border p-2">
//       <div className="flex p-1 w-full felx-col gap-1 ">
//         <input className="text-neutral-500  rounded-md px-2 py-1"  placeholder="Login"
//          value={text} onChange={(e)=>setText(e.target.value)}
//         />
//        <button onClick={handleText} className="rounded-md text-neutral-500 px-5 py-1.5 bg-neutral-950 border-neutral-900 border text-12px]">Save</button>
//       </div>
//     </div>
//   )
// }