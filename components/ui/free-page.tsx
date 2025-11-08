"use client";

import { ArrowLeft, ArrowRight, Brain, Loader, LoaderCircle, X } from "lucide-react";
import React, { useState } from "react";
import { ButtonComp, ButtonProps, ButtonSections } from "../pre-build-comp/buttons-part";
import { useRef } from "react";
import { toast } from "sonner";
import { Modle } from "./modle.view";
import { Textarea } from "./textarea";


export default function FreePage() {
  const [showPreview, setShowPreview] = useState(false);
  const [userPrompt ,setUserPrompt] =useState<string>("");
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [buttons, setButtons] = useState<ButtonProps[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [hasDragged, setHasDragged] = useState(false);
  const [modalOpen, setmodelOpen] = useState<boolean>(false);
  const [newtext, setNewText] = useState<string>("");
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
    setHasDragged(false);
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
    setHasDragged(true);
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
  const CloseModle = () => {
    setmodelOpen((prev) => !prev);
  };
  const ClosePreivew=()=>{
    setShowPreview((prev)=>!prev)
  }
  const handleMouseUp = () => {
    if (dragging && !hasDragged) {
      const button = buttons.find((btn) => btn.id == dragging.id);
      if (button) {
        setNewText(button.props.text); // set current props text to input box
      }
      setSelectedButton(dragging.id); // pass the current dragging Id
      setmodelOpen(true);
    }
    setDragging(null); // set  null when uset leave mouse
  };

  // handle the text edit
  const handleTextEdit = (text: string) => {
    if (!selectedButton) return;
    setButtons((prev) =>
      prev.map((btn) =>
        btn.id === selectedButton ? { ...btn, props: { ...btn.props, text: text } } : btn
      )
    );
  };
  //handle delete part the button from canvas
  const handleDeleteButton = (button_id: string) => {
    // get the button as the paramemter
    if (!selectedButton) return;
    setButtons((prev) => prev.filter((btn) => btn.id !== button_id));
    setSelectedButton(null);
    setmodelOpen(false);
  };

  // generat the Page 
  const handleGenerateCode = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPrompt }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong on the server");
      }
      toast.success("Your Code Generated Successfully");
      console.log("Code----------->",generatedCode)
      setGeneratedCode(data.code);
      setShowPreview(true); 
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to generate");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={canvasRef}
      className=" p-2  relative  min-h-screen ">
        <div className="flex   items-end absolute  bottom-8 gap-2   right-0   w-full">
         <div className=" flex   items-center gap-1 max-w-2xl mx-auto w-full ">
          <Textarea 
           value={userPrompt}
           onChange={(e)=>setUserPrompt(e.target.value)}
          placeholder={`What do you want to build today `} className="rounded-xl flex flex-1" />
          <button
           onClick={handleGenerateCode}
        className="  right-0 rounded-2xl px-5 py-4  bg-neutral-800/80 border border-neutral-800/80 
        text-secondary-foreground font-semibold text-[12px]
        flex gap-2 items-center cursor-pointer 
        shadow-[0_4px_8px_rgba(0,0,0,0.4),_inset_0_1px_1px_rgba(255,255,255,0.1)] 
        hover:shadow-[0_6px_12px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.15)] 
        transition-all duration-200 ease-out">
        <>
          {isGenerating ? (
            <p className="flex gap-2 items-center ">
              <span className="">Generating</span>
              <Loader className="size-3  text-neutral-400 animate-spin" />
            </p>
          ) : (
            <p className="flex gap-1 items-center">
              <Brain className="size-4 text-neutral-400"/>
              <span>Generate code</span>{" "}
            </p>
          )}
        </>
      </button>
          
          </div>
          </div>
      {buttons.map((btn) => (
        <ButtonComp key={btn.id} button={btn} onMouseDown={handleMouse} />
      ))}
      <PreviewModal 
        setShowPreview={ClosePreivew} 
        showPreview={showPreview} 
        generatedCode={generatedCode} 
        />
      <Modle
        modalOpen={modalOpen}
        setModelOpen={CloseModle}
        onSave={handleTextEdit}
        text={newtext}
        setNewText={setNewText} // pass the text
        onDelete={handleDeleteButton}
        buttonId={selectedButton || " "} // pass the button_id for delete i
      />
      <button
        onClick={() => setShow((prev) => !prev)}
        className="rounded-md  absolute   bg-neutral-800/40   shadow border-neutral-900  cursor-pointer px-2 py-1">
        {show ? <ArrowLeft /> : <ArrowRight />}{" "}
      </button>
      {show && (
        <div className="min-h-screen  sm:w-60 lg:w-72 rounded-md   bg-neutral-900 border-zinc-900/80 border  flex  items-end  flex-col gap-1 absolute top-0 left-0  z-20">
          <button
            onClick={() => setShow((prev) => !prev)}
            className="rounded-md   bg-neutral-800/40 16 items-end  shadow border-neutral-900  cursor-pointer px-2 py-1 m-1">
            {show ? <ArrowLeft /> : <ArrowRight />}{" "}
          </button>
          <div className=" rounded-md  w-full    flex  items-end  flex-col gap-1 ">
            <p className="text-md font-bold  px-1.5 py-1 flex  text-neutral-300  items-start w-full">
              Buttons
            </p>
            <ButtonSections addbtn={addbtn} />
            <div className="w-full  flex flex-col  border gap-1 ">
              <p className="w-full font-bold text-neutral-300 px-1.5 py-1 flex text-md  items-start ">
                Navbars
              </p>
            </div>
          </div>
        </div>
      )}

      {generatedCode && (
        <div className="fixed bottom-4 right-4 bg-neutral-900 border border-neutral-700 p-4 rounded-lg max-w-2xl max-h-96 overflow-auto">
          <pre className="text-sm text-neutral-300">
            <code>{generatedCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
}



interface PropsModel{
  showPreview:boolean,
  setShowPreview:()=>void
  generatedCode:string
}
const PreviewModal = ({showPreview,setShowPreview,generatedCode}:PropsModel) => {
  if (!showPreview) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-neutral-700">
          <h2 className="text-xl font-bold text-neutral-200">Preview</h2>
          <button onClick={setShowPreview}>
            <X className="text-neutral-400" />
          </button>
        </div>
        <iframe
          srcDoc={generatedCode}
          sandbox="allow-scripts"
          className="flex-1 w-full bg-white"
        />
      </div>
    </div>
  );
};