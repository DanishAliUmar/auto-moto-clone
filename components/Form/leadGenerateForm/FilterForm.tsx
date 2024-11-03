"use client";
import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchPost } from "@/Hooks/useFetch";
import {getLocalItem} from "@/Hooks/useLocalStorage";
const localWebhook_url =getLocalItem('webhook_url')
const createFilterUrl = `http://127.0.0.1:8000/webhook/api/v1/create-filter`;

const FilterForm: React.FC = ({
  conditions,
  setConditions,
  orConditions,
  setOrConditions,
}) => {

  const { data, loading, error, postData } = useFetchPost<{
    success: boolean;
    message: string;
  }>(createFilterUrl);

  const handleSubmit = () => {
    postData({
      webhoook_id: localWebhook_url,
      webhook_filters: [...conditions, ...orConditions}]
      });
  };

  const handleAddCondition = () => {
    setConditions([...conditions, { field: "", condition: "", text: "", "is_and": true,"is_or": false }]);
  };

  const handleOrCondition = () => {
    setOrConditions([...orConditions, { field: "", condition: "", text: "", "is_and": false,"is_or": true }]);
  };

  const handleRemoveCondition = (index: number) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter((_, i) => i !== index));
    }
  };

  const handleRemoveOrCondition = (index: number) => {
    setOrConditions(orConditions.filter((_, i) => i !== index));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    setConditionType: "conditions" | "orConditions"
  ) => {
    const { name, value } = e.target;
    const updatedConditions =
      setConditionType === "conditions" ? [...conditions] : [...orConditions];
    updatedConditions[index] = {
      ...updatedConditions[index],
      [name]: value,
    };
    setConditionType === "conditions"
      ? setConditions(updatedConditions)
      : setOrConditions(updatedConditions);
  };

  const handleSelectChange = (
    newValue: string,
    index: number,
    fieldName: "field" | "condition",
    setConditionType: "conditions" | "orConditions"
  ) => {
    const updatedConditions =
      setConditionType === "conditions" ? [...conditions] : [...orConditions];
    updatedConditions[index] = {
      ...updatedConditions[index],
      [fieldName]: newValue,
    };
    setConditionType === "conditions"
      ? setConditions(updatedConditions)
      : setOrConditions(updatedConditions);
  };

  return (
    <div className="p-4 overflow-y-auto max-h-[85vh]">
      <h2 className="text-xl font-bold mb-4">Setup Filter</h2>
      <div className="space-y-5">
        {conditions.map((condition, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 relative bg-white rounded-md border shadow p-5"
          >
            <div className="flex items-center justify-between">
              {index === 0 ? "Only continue if" : "AND"}
              {index !== 0 && (
                <button
                  className="flex items-center gap-2 text-blue-500"
                  onClick={() => handleRemoveCondition(index)}
                >
                  <X className="fill-primary size-4 m-1 stroke-white" />
                  Remove
                </button>
              )}
            </div>
            <Select
              value={condition.field || ""}
              onValueChange={(value) =>
                handleSelectChange(value, index, "field", "conditions")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose field..." />
              </SelectTrigger>
              <SelectContent className="min-w-full">
                <SelectItem value="field1">Field 1</SelectItem>
                <SelectItem value="field2">Field 2</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={condition.condition || ""}
              onValueChange={(value) =>
                handleSelectChange(value, index, "condition", "conditions")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose condition..." />
              </SelectTrigger>
              <SelectContent className="min-w-full">
                <SelectItem value="equals">Equals</SelectItem>
                <SelectItem value="contains">Contains</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              name="text"
              onChange={(e) => handleChange(e, index, "conditions")}
              placeholder="Enter Text ..."
              value={condition.text || ""}
              id={`text-${index}`}
            />
          </div>
        ))}
        <button
          className="bg-primary flex items-center gap-2 text-white px-4 py-2 rounded mt-4"
          onClick={handleAddCondition}
        >
          <Plus /> AND
        </button>
        <div className="border-t border-dashed border-4"></div>

        {/* OR Conditions */}

        {orConditions.map((condition, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 relative bg-white rounded-md border shadow p-5"
          >
            <div className="flex items-center justify-between">
              {index === 0 ? "Only continue if" : "OR"}
              {/* {index !== 0 && ( */}
              <button
                className="flex items-center gap-2 text-blue-500"
                onClick={() => handleRemoveOrCondition(index)}
              >
                <X className="fill-primary size-4 m-1 stroke-white" />
                Remove
              </button>
              {/* )} */}
            </div>
            <Select
              value={condition.field || ""}
              onValueChange={(value) =>
                handleSelectChange(value, index, "field", "orConditions")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose field..." />
              </SelectTrigger>
              <SelectContent className="min-w-full">
                <SelectItem value="field1">Field 1</SelectItem>
                <SelectItem value="field2">Field 2</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={condition.condition || ""}
              onValueChange={(value) =>
                handleSelectChange(value, index, "condition", "orConditions")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose condition..." />
              </SelectTrigger>
              <SelectContent className="min-w-full">
                <SelectItem value="equals">Equals</SelectItem>
                <SelectItem value="contains">Contains</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              name="text"
              onChange={(e) => handleChange(e, index, "orConditions")}
              placeholder="Enter Text ..."
              value={condition.text || ""}
              id={`text-or-${index}`}
            />
          </div>
        ))}
        <button
          className="bg-primary flex items-center gap-2 text-white px-4 py-2 rounded mt-4"
          onClick={handleOrCondition}
        >
          <Plus /> OR
        </button>
      </div>

      <button onClick={handleSubmit} className="bg-primary flex items-center justify-center gap-2 text-white px-4 py-3 rounded mt-6 w-full text-center">
        Submit
      </button>
    </div>
  );
};

export default FilterForm;
