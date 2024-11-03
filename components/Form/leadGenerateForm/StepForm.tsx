import React, { useEffect, useState } from "react";
import GenerateForm from "./GenerateForm";
import FilterForm from "./FilterForm";
import LeadConnectorForm from "./LeadConnectorForm";

interface StepFormProps {
  type: "generate" | "filter" | "leadConnector";
}

const StepForm: React.FC<StepFormProps> = ({
  type,
  conditions,
  setConditions,
  orConditions,
  setOrConditions,
  leadGenerationData,
  setLeadGenerationData,
  updateFilterUrl,
  createFilterUrl,
  updateActionUrl,
  createActionUrl
}) => {
  switch (type) {
    case "generate":
      return <GenerateForm />;
    case "filter":
      return (
        <FilterForm
          conditions={conditions}
          setConditions={setConditions}
          orConditions={orConditions}
          setOrConditions={setOrConditions}
          createFilterUrl={createFilterUrl}
          updateFilterUrl={updateFilterUrl}
        />
      );
    case "leadConnector":
      return (
        <LeadConnectorForm
          updateActionUrl={updateActionUrl}
          createActionUrl={createActionUrl}
          leadGenerationData={leadGenerationData}
          setLeadGenerationData={setLeadGenerationData}
        />
      );
    default:
      return null;
  }
};

export default StepForm;
