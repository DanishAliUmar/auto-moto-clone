import React, { useEffect, useState } from "react";
import GenerateForm from "./GenerateForm";
import FilterForm from "./FilterForm";
import LeadConnectorForm from "./LeadConnectorForm";

interface StepFormProps {
  type: "generate" | "filter" | "leadConnector";
}

interface FilterCondition {
  field: string;
  condition: string;
  text: string;
}



const StepForm: React.FC<StepFormProps> = ({ type }) => {
 
  const [conditions, setConditions] = useState<FilterCondition[]>([
    { field: "", condition: "", text: "" },
  ]);
  const [orConditions, setOrConditions] = useState<FilterCondition[]>([
    { field: "", condition: "", text: "" },
  ]);
 
  switch (type) {
    case "generate":
      return <GenerateForm/>;
    case "filter":
      return <FilterForm conditions={conditions} setConditions={setConditions} orConditions={orConditions} setOrConditions={setOrConditions}/>;
    case "leadConnector":
      return <LeadConnectorForm/>;
    default:
      return null;
  }
};

export default StepForm;
