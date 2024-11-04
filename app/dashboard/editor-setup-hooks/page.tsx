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
import useLocalStorage from "@/Hooks/useLocalStorage";

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

  const handleStepClick = (step: Step) => {
    setSelectedStep(step); // Set the selected step object
    setOpenSheet(true);
  };

  const [webhookUrl, setLocalItem, getLocalItem] = useLocalStorage("webhook_url");
  const localWebhook_url = getLocalItem("webhook_detail");

  //LeadFormData
    const [leadGenerationData, setLeadGenerationData] = useState({
      webhook_id:  localWebhook_url?.webhook_id?  localWebhook_url?.webhook_id : '',
      email: "",
      phone: "",
      first_name: "",
      last_name: "",
      creation_date: "",
      total_cost: "",
      is_paid: false,
      is_invoice: false,
    });


  // ================ CREATE FILTER & ACTION FUNCTIONALITY =================
  const createActionUrl = `http://18.221.246.228:9000/webhook/api/v1/create-action`;
  const createFilterUrl = `http://18.221.246.228:9000/webhook/api/v1/create-filter`;



  // DISABLE OTHER STEPS WHEN 1st STEP URL IS NOT GENERATED
  
  const [stepsDisable, setStepsDisable] = useState(false);
    const [webHookDetail, setWebHookDetail] = useState(null);
  useEffect(() => {
    const state = localStorage.getItem("webhook_detail") || null;
    
    if (!state) {
      setStepsDisable(true);
    } else {
      setStepsDisable(false);
      setWebHookDetail(JSON.parse(state));
    }
  }, []);

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
            {steps.map((step, index) => {
    const isDisabled = stepsDisable && index !== 0; // Check if the step is disabled

    return (
      <div
        key={index}
        className={`relative flex flex-col items-center ${isDisabled ? "transition-all opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => {
          if (!isDisabled) {
            handleStepClick(step); // Only call if not disabled
          }
        }}
      >
        <StepCard
          className={isDisabled ? "!cursor-not-allowed" : ""} // Apply cursor class based on disable state
          number={index + 1}
          icon={step.icon}
          title={step.title}
          description={step.description}
          isLast={index === steps.length - 1} // Pass isLast prop
        />
      </div>
    );
  })}
            </div>
          </div>
        </div>
      </div>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent className={`sm:min-w-[600px]`}>
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
                  // ======= Create URLs
                  createActionUrl={createActionUrl}
                  createFilterUrl={createFilterUrl}
                  // ======= 
                  updateFilterUrl={null}
                  updateActionUrl={null}

                  leadGenerationData={leadGenerationData}
                  setLeadGenerationData={setLeadGenerationData}

                  type={selectedStep.type}
              
                  conditions={conditions}
                  setConditions={setConditions}
                  orConditions={orConditions}
                  setOrConditions={setOrConditions}

                  setStepsDisable={setStepsDisable}
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
