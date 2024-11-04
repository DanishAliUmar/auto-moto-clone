"use client";
import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchPost, useFetchPut } from "@/Hooks/useFetch";
import useLocalStorage from "@/Hooks/useLocalStorage";

// Toast for sucess and error
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



interface Condition {
  key: string;
  value: string;
  operator: string;
  is_and: boolean;
  is_or: boolean;
}

interface FilterFormProps {
  conditions: Condition[];
  setConditions: React.Dispatch<React.SetStateAction<Condition[]>>;
  orConditions: Condition[];
  setOrConditions: React.Dispatch<React.SetStateAction<Condition[]>>;
  createFilterUrl?: string;
  updateFilterUrl?: string;
}

const FilterForm: React.FC<FilterFormProps> = ({
  conditions,
  setConditions,
  orConditions,
  setOrConditions,

  createFilterUrl,
  updateFilterUrl,
}) => {


  const { data, loading, error, postData } = createFilterUrl
  ? useFetchPost<{ success: boolean; message: string }>(createFilterUrl)
  : useFetchPut<{ success: boolean; message: string }>(updateFilterUrl || "");
  

  const [webhookUrl, , getLocalItem] = useLocalStorage("webhook_url");
  const localWebhook_url = getLocalItem("webhook_detail");

  const handleSubmit = () => {
    postData({
      webhook_id: localWebhook_url?.webhook_id,
      webhook_filters: [...conditions, ...orConditions],
    });
  };

  const handleAddCondition = () => {
    setConditions([
      ...conditions,
      {
        key: "",
        value: "",
        operator: "",
        is_and: true,
        is_or: false,
      },
    ]);
  };

  const handleOrCondition = () => {
    setOrConditions([
      ...orConditions,
      { key: "", operator: "", value: "", is_and: false, is_or: true },
    ]);
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
    fieldName: "key" | "operator",
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


    // Display a toast notification based on the success or failure response
    useEffect(() => {
      if (data && data.success) {
        toast.success(data.message || "Request completed successfully!");
      } else if (error) {
        toast.error(`Error: ${error}`);
      }
    }, [data, error]);

  return (
    <div className="p-4 overflow-y-auto max-h-[85vh]">
      <ToastContainer />
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
            <Input
              type="text"
              name="key"
              onChange={(e) => handleChange(e, index, "conditions")}
              placeholder="Enter key ..."
              value={condition.key || ""}
              id={`text-${index}`}
            />
            <Select
              value={condition.operator || ""}
              onValueChange={(value) =>
                handleSelectChange(value, index, "operator", "conditions")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose condition..." />
              </SelectTrigger>
              <SelectContent className="min-w-full">
                <SelectItem value="does_not_contain" selected>
                  Does Not Contain
                </SelectItem>
                <SelectItem value="contains">Contains</SelectItem>
                <SelectItem value="start_with">Start With</SelectItem>
                <SelectItem value="not_start_with">Not Start With</SelectItem>
                <SelectItem value="ends_with">Ends With</SelectItem>
                <SelectItem value="greater">Greater</SelectItem>
                <SelectItem value="less">Less</SelectItem>
                <SelectItem value="after">After</SelectItem>
                <SelectItem value="before">Before</SelectItem>
                <SelectItem value="equals">Equals</SelectItem>
                <SelectItem value="is_true">Is True</SelectItem>
                <SelectItem value="is_false">Is False</SelectItem>
                <SelectItem value="does_not_exist">Does Not Exist</SelectItem>
                <SelectItem value="exists">Exists</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              name="value"
              onChange={(e) => handleChange(e, index, "conditions")}
              placeholder="Enter Text ..."
              value={condition.value || ""}
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
            <Input
              type="text"
              name="key"
              onChange={(e) => handleChange(e, index, "orConditions")}
              placeholder="Enter Key ..."
              value={condition.key || ""}
              id={`text-or-${index}`}
            />
            <Select
              value={condition.operator || ""}
              onValueChange={(value) =>
                handleSelectChange(value, index, "operator", "orConditions")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose condition..." />
              </SelectTrigger>
              <SelectContent className="min-w-full">
                <SelectItem value="does_not_contain">
                  Does Not Contain
                </SelectItem>
                <SelectItem value="contains">Contains</SelectItem>
                <SelectItem value="start_with">Start With</SelectItem>
                <SelectItem value="not_start_with">Not Start With</SelectItem>
                <SelectItem value="ends_with">Ends With</SelectItem>
                <SelectItem value="greater">Greater</SelectItem>
                <SelectItem value="less">Less</SelectItem>
                <SelectItem value="after">After</SelectItem>
                <SelectItem value="before">Before</SelectItem>
                <SelectItem value="equals">Equals</SelectItem>
                <SelectItem value="is_true">Is True</SelectItem>
                <SelectItem value="is_false">Is False</SelectItem>
                <SelectItem value="does_not_exist">Does Not Exist</SelectItem>
                <SelectItem value="exists">Exists</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              name="value"
              onChange={(e) => handleChange(e, index, "orConditions")}
              placeholder="Enter Text ..."
              value={condition.value || ""}
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

      <button
        onClick={handleSubmit}
        className="bg-primary flex items-center justify-center gap-2 text-white px-4 py-3 rounded mt-6 w-full text-center"
      >
        Submit
      </button>
    </div>
  );
};

export default FilterForm;
