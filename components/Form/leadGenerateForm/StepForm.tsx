import React from "react";
import GenerateForm from "./GenerateForm";
import FilterForm from "./FilterForm";
import LeadConnectorForm from "./LeadConnectorForm";

interface StepFormProps {
  type: "generate" | "filter" | "leadConnector";
  status: "create" | "edit";
  conditions: any[];
  setConditions: React.Dispatch<React.SetStateAction<any[]>>;
  orConditions: any[];
  setOrConditions: React.Dispatch<React.SetStateAction<any[]>>;
  leadGenerationData: any;
  setLeadGenerationData: React.Dispatch<React.SetStateAction<any>>;
  createFilterUrl?: string;
  createActionUrl?: string;
  updateFilterUrl?: string;
  updateActionUrl?: string;
}

const StepForm: React.FC<StepFormProps> = ({
  type,
  conditions,
  setConditions,
  orConditions,
  setOrConditions,
  leadGenerationData,
  setLeadGenerationData,
  createFilterUrl,
  createActionUrl,
  updateFilterUrl,
  updateActionUrl,
}) => {

  switch (type) {
    case "generate":
      return (
        <GenerateForm
          createFilterUrl={createFilterUrl}
          updateFilterUrl={updateFilterUrl}
        />
      );
    case "filter":
      return (
          <FilterForm
            createFilterUrl={createFilterUrl}
            updateFilterUrl={updateFilterUrl}
            conditions={conditions}
            setConditions={setConditions}
            orConditions={orConditions}
            setOrConditions={setOrConditions}
          />
      );
    case "leadConnector":
      return (
          <LeadConnectorForm
            createActionUrl={createActionUrl}
            updateActionUrl={updateActionUrl}
            leadGenerationData={leadGenerationData}
            setLeadGenerationData={setLeadGenerationData}
          />
      );
    default:
      return null;
  }
};

export default StepForm;
