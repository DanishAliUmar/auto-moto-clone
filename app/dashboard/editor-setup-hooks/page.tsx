"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import StepCard from "@/components/ui/Element/StepCard";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react"; // Import useState
import useEditorSetupHooks from "@/Utility/Helpers/useEditorSetupHooks";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import StepForm from "@/components/Form/leadGenerateForm/StepForm";
import { useFetchPost } from "@/Hooks/useFetch";

interface FilterCondition {
  key: string;
  operator: string;
  value: string;
  is_and:boolean;
  is_or:boolean;
}

const EditorSetupHooks: React.FC = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const [conditions, setConditions] = useState<FilterCondition[]>([
    { key: "", operator: "", value: "" , is_and: false,is_or: true },
  ]);
  const [orConditions, setOrConditions] = useState<FilterCondition[]>([
    { key: "", operator: "", value: "" , is_and: false,is_or: true },
  ]);
  
  const { steps, addStep } = useEditorSetupHooks();
  const [selectedStep, setSelectedStep] = useState<Step | null>(null); // State for the selected step object
  
  const createActionUrl = `http://18.221.246.228:9000/webhook/api/v1/create-action`;
  const createFilterUrl = `http://18.221.246.228:9000/webhook/api/v1/create-filter`;
  const handleStepClick = (step: Step) => {
    setSelectedStep(step); // Set the selected step object
    setOpenSheet(true);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between gap-2 border-b p-4 pt-0 pb-2">
          <Switch />
          <Button className="text-xs bg-black px-6 h-8">Publish</Button>
        </div>
        <div className="flex items-start flex-1 justify-center overflow-y-auto">
          <div className="flex flex-col items-center py-10">
            <div className="relative flex flex-col items-center space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                  onClick={() => handleStepClick(step)}
                >
                  {/* Update the onClick event */}
                  <StepCard
                    number={index + 1}
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                    // onAddStep={() => addStep(index)}
                    isLast={index === steps.length - 1} // Pass isLast prop
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent className="sm:min-w-[600px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <div className=" bg-primary p-2 rounded-lg border-primary stroke-white">
                {selectedStep?.icon ? (
                  React.cloneElement(selectedStep.icon, {
                    className: "size-4 stroke-white",
                  }) // Custom size and stroke color
                ) : (
                  <Filter className="size-4 stroke-white" />
                )}
              </div>
              {selectedStep?.title || ""}
            </SheetTitle>
            <SheetDescription>
              {selectedStep && (
                <StepForm
                  createActionUrl={createActionUrl}
                  createFilterUrl={createFilterUrl}
                  type={selectedStep.type}
                  conditions={conditions}
                  setConditions={setConditions}
                  orConditions={orConditions}
                  setOrConditions={setOrConditions}
                />
              )}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
};

export default EditorSetupHooks;
