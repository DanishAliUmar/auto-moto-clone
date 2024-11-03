"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import StepCard from "@/components/ui/Element/StepCard";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react"; // Import useState
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

const EditorSetupHooks: React.FC = () => {
  const { steps, addStep } = useEditorSetupHooks();
  const [selectedStep, setSelectedStep] = useState<Step | null>(null); // State for the selected step object

  const handleStepClick = (step: Step) => {
    setSelectedStep(step); // Set the selected step object
  };

  return (
    <DashboardLayout>
      <Sheet>
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
                  >
                    <SheetTrigger onClick={() => handleStepClick(step)}>
                      {" "}
                      {/* Update the onClick event */}
                      <StepCard
                        number={index + 1}
                        icon={step.icon}
                        title={step.title}
                        description={step.description}
                        // onAddStep={() => addStep(index)}
                        isLast={index === steps.length - 1} // Pass isLast prop
                      />
                    </SheetTrigger>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

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
              {selectedStep && <StepForm type={selectedStep.type} />}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
};

export default EditorSetupHooks;
