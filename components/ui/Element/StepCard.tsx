
import { FC } from "react";
import { CircleDashed, Edit, Edit2, MoreVertical, PlusCircleIcon, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StepCardProps {
  className: string;

  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  // onAddStep: () => void;
  isLast: boolean; // Add isLast prop
}

const StepCard: FC<StepCardProps> = ({
  className,
  number,
  icon,
  title,
  description,
  // onAddStep,
  isLast,
}) => {

  return (
    <div className={"relative"}>
      <div className={`flex justify-between gap-3 items-start min-w-80 p-8 px-4 cursor-pointer border rounded-lg shadow-md bg-white ${className}`}>
        <div className="flex flex-col items-center w-full">
          <div className="absolute -top-4 -left-4 bg-primary rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold text-white">
            {number}
          </div>
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-bold">{title}</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        </div>
        {/* <DropdownMenu>
          <DropdownMenuTrigger className="w-fit rounded-xl overflow-hidden ring-offset-0 ">
            <MoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={"cursor-pointer hover:bg-secondary"}
            >
              <Trash2/> Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              className={"cursor-pointer hover:bg-secondary"}
            >
              <Edit/> Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <div className="relative flex flex-col items-center mt-6">
        {/* Top line */}
        <div className="w-px h-5 bg-gray-300 mb-1"></div>

        {/* Button */}
        <button
          // onClick={onAddStep}
          className="relative bg-primary rounded-full p-1 shadow-md"
        >
          <div className=" rounded-full bg-white size-2"/>
        </button>

        {/* Conditionally render Bottom line if not last */}
        {!isLast && <div className="w-px h-5 bg-gray-300 mt-1"></div>}
      </div>
    </div>
  );
};

export default StepCard;
