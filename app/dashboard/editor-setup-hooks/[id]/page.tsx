"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import StepCard from "@/components/ui/Element/StepCard";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import useEditorSetupHooks from "@/Utility/Helpers/useEditorSetupHooks";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import StepForm from "@/components/Form/leadGenerateForm/StepForm";
import { useParams } from "next/navigation";
import { useFetchGet } from "@/Hooks/useFetch";

interface Step {
  icon: React.ReactElement;
  title: string;
  description: string;
  type: string;
}

interface FilterCondition {
  field: string;
  condition: string;
  text: string;
}

const Page = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const [webHookDetail, setWebHookDetail] = useState(null);
  const [conditions, setConditions] = useState<FilterCondition[]>([
    { field: "", condition: "", text: "" },
  ]);
  const [orConditions, setOrConditions] = useState<FilterCondition[]>([
    { field: "", condition: "", text: "" },
  ]);

  const params = useParams();
  const apiUrl = `http://18.221.246.228:9000/webhook/api/v1/get-webhook-details?webhook_id=${params.id}`;

  const { data } = useFetchGet<any>(apiUrl);
  
  useEffect(() => {
    if (data) {
      setWebHookDetail(data);
    }
  }, [data]);

  const { steps } = useEditorSetupHooks();
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);

  const handleStepClick = (step: Step) => {
    setSelectedStep(step);
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
                <div key={index} className="relative flex flex-col items-center">
                  <div onClick={() => handleStepClick(step)}>
                    <StepCard
                      number={index + 1}
                      icon={step.icon}
                      title={step.title}
                      description={step.description}
                      isLast={index === steps.length - 1}
                    />
                  </div>
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
              <div className="bg-primary p-2 rounded-lg border-primary stroke-white">
                {selectedStep?.icon ? (
                  React.cloneElement(selectedStep.icon, {
                    className: "size-4 stroke-white",
                  })
                ) : (
                  <Filter className="size-4 stroke-white" />
                )}
              </div>
              {selectedStep?.title || ""}
            </SheetTitle>
            <SheetDescription>
              {selectedStep && (
                <StepForm
                  type={selectedStep.type}
                  webHookDetail={webHookDetail}
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

export default Page;
