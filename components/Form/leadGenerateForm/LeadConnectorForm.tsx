import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"

import React from "react";

const LeadConnectorForm = () => {
  return (
    <div className="p-4 overflow-y-auto max-h-[85vh]">
      <h2 className="text-xl font-bold mb-4">Setup Info</h2>
      <div
        className={`flex flex-col gap-3 relative bg-white rounded-md border shadow p-5 `}
      >
        <Input type="text" placeholder="First Name" />
        <Input type="text" placeholder="Last Name" />
        <Input type="email" placeholder="Email" />
        <Input type="number" placeholder="Contact" />
        <Textarea  placeholder="Message" className="max-h-80 min-h-60"/>
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default LeadConnectorForm;
