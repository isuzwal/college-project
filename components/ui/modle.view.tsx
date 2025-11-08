import { Input } from "./input";
import { Card,CardTitle } from "./card";
import { X } from "lucide-react";

interface ModleProps {
  buttonId: string;
  text: string;
  modalOpen: boolean;
  setModelOpen: () => void;
  onSave: (text: string) => void;
  setNewText: React.Dispatch<React.SetStateAction<string>>;
  onDelete: (id: string) => void;
}
export const Modle = ({
  modalOpen,
  setModelOpen,
  text,
  setNewText,
  onSave,
  onDelete,
  buttonId,
}: ModleProps) => {
  if (!modalOpen) return null;
  return (
    <>
      {" "}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-40">
          <Card className="bg-neutral-900/80 border border-neutral-900 rounded-xl p-2 flex max-w-[22rem]  mx-auto w-full relative ">
            <CardTitle className="text-neutral-300  text-[14px] font-bold mt-2">
              Change Text
            </CardTitle>
            <Input
              value={text}
              onChange={(e) => setNewText(e.target.value)}
              className="text-neutral-400 text-[16px]"
            />
            <button
              onClick={setModelOpen}
              className=" absolute  top-1 right-1 bg-neutral-800/40 rounded-full p-1 flex items-center cursor-pointer hover:bg-neutral-700/60 transition-all duration-300 ease-in-out ">
              <X className="size-5 " />
            </button>
            <div className="flex  gap-1">
              <button
                onClick={() => {
                  onSave(text);
                  setModelOpen();
                }}
                className="text-primary-foreground  font-semibold justify-center cursor-pointer w-full rounded-lg  p-1 flex items-center bg-primary hover:bg-primary/70  transition-all ease-in-out duration-300">
                Save
              </button>
              <button
                onClick={() => onDelete(buttonId)}
                className="text-secondary-foreground  font-semibold justify-center cursor-pointer w-full rounded-lg  p-1 flex items-center bg-red-500/70  hover:bg-red-600/50 transition-all ease-in-out duration-300">
                Delete
              </button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

