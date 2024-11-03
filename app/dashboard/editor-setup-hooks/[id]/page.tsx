"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import StepCard from "@/components/ui/Element/StepCard";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import useEditorSetupHooks from "@/Utility/Helpers/useEditorSetupHooks";
import useLocalStorage from "@/Hooks/useLocalStorage";
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
  key: string;
  operator: string;
  value: string;
  is_and: boolean;
  is_or: boolean;
}

const Page = () => {
  const updateActionUrl = `http://18.221.246.228:9000/webhook/api/v1/update-action`;
  const updateFilterUrl = `http://18.221.246.228:9000/webhook/api/v1/update-filter`;
  const [openSheet, setOpenSheet] = useState(false);
  const [webHookDetail, setWebHookDetail] = useState(null);
  
  //FilterFormData
  const [conditions, setConditions] = useState<FilterCondition[]>([
    { key: "", operator: "", value: "", is_and: false, is_or: true },
  ]);
  const [orConditions, setOrConditions] = useState<FilterCondition[]>([
    { key: "", operator: "", value: "", is_and: false, is_or: true },
  ]);


  const [webhookUrl, , getLocalItem] = useLocalStorage("webhook_url");
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

  const params = useParams();
  const apiUrl = `http://18.221.246.228:9000/webhook/api/v1/get-webhook-details?webhook_id=${params.id}`;

  const { data } = useFetchGet<any>(apiUrl);

  useEffect(() => {
    if (data) {
      setWebHookDetail(data);
    }
  }, [data]);

  useEffect(() => {
    if (webHookDetail) {      
      const filterData = webHookDetail.Response_data.data.filters;
      setConditions(filterData.filter((item) => item.is_and === true));
      setOrConditions(filterData.filter((item) => item.is_and === false));

      const leadFromData = webHookDetail.Response_data.data.actions;
      setLeadGenerationData(leadFromData[0])
    }
  }, [webHookDetail]);

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
        <div className="flex items-center justify-center text-xl text-primary pt-10">Edit Detail</div>
        <div className="flex items-start flex-1 justify-center overflow-y-auto">
          <div className="flex flex-col items-center py-10">
            <div className="relative flex flex-col items-center space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                >
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
                  updateActionUrl={updateActionUrl}
                  updateFilterUrl={updateFilterUrl}
                  leadGenerationData={leadGenerationData}
                  setLeadGenerationData={setLeadGenerationData}
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
