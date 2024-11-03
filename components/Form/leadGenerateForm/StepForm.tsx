import React, { useEffect, useState } from "react";
import GenerateForm from "./GenerateForm";
import FilterForm from "./FilterForm";
import LeadConnectorForm from "./LeadConnectorForm";

interface StepFormProps {
  type: "generate" | "filter" | "leadConnector";
}

const StepForm: React.FC<StepFormProps> = ({ type,  conditions,
  setConditions,
  orConditions,
  setOrConditions,  }) => {

  switch (type) {
    case "generate":
      return <GenerateForm/>;
    case "filter":
      return <FilterForm  conditions={conditions} setConditions={setConditions} orConditions={orConditions} setOrConditions={setOrConditions}/>;
    case "leadConnector":
      return <LeadConnectorForm/>;
    default:
      return null;
  }
};

export default StepForm;
