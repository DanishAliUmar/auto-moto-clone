import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFetchPost } from "@/Hooks/useFetch";
import React, { useState } from "react";
import useLocalStorage from "@/Hooks/useLocalStorage";

const LeadConnectorForm = () => {
  const [webhookUrl, , getLocalItem] = useLocalStorage('webhook_url');
  const localWebhook_url = getLocalItem('webhook_detail'); 
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
  
  const createFilterUrl = `http://18.221.246.228:9000/webhook/api/v1/create-action`;
  
  const { data, loading, error, postData } = useFetchPost<{
    success: boolean;
    message: string;
  }>(createFilterUrl);

  // Handle change for inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLeadGenerationData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    postData(leadGenerationData);
  };

  return (
    <div className="p-4 overflow-y-auto max-h-[85vh]">
      <h2 className="text-xl font-bold mb-4">Setup Info</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 relative bg-white rounded-md border shadow p-5"
      >
        <Input
          type="text"
          name="first_name"
          required
          onChange={handleChange}
          value={leadGenerationData.first_name}
          placeholder="First Name"
        />
        <Input
          required
          type="text"
          name="last_name"
          onChange={handleChange}
          value={leadGenerationData.last_name}
          placeholder="Last Name"
        />
        <Input
          required
          type="email"
          name="email"
          onChange={handleChange}
          value={leadGenerationData.email}
          placeholder="Email"
        />
        <Input
          required
          type="number"
          name="phone"
          onChange={handleChange}
          value={leadGenerationData.phone}
          placeholder="Contact"
        />
        <Input
          required
          type="date"
          name="creation_date"
          onChange={handleChange}
          value={leadGenerationData.creation_date}
          placeholder="Creation Date"
        />
        <Input
          type="number"
          required
          name="total_cost"
          onChange={handleChange}
          value={leadGenerationData.total_cost}
          placeholder="Total Cost"
        />
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_paid"
              onChange={handleChange}
              checked={leadGenerationData.is_paid}
            />
            Is Paid
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_invoice"
              onChange={handleChange}
              checked={leadGenerationData.is_invoice}
            />
            Is Invoice
          </label>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
      {error && <p className="text-red-500">{error.message}</p>}
      {data && <p className="text-green-500 pt-10">{data.message}</p>}
    </div>
  );
};

export default LeadConnectorForm;
