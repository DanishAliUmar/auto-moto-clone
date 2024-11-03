import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetchGet } from "@/Hooks/useFetch";
import useLocalStorage from "@/Hooks/useLocalStorage";
import { Copy } from "lucide-react";
import React, { useEffect, useState } from "react";
const GenerateForm = () => {
  const [value, setLocalItem, getLocalItem] = useLocalStorage();
  const webhookDetail = getLocalItem("webhook_detail");
  const webhookUrl = webhookDetail?.webhook_url
  const [isGenerated, setIsGenerated] = useState(webhookUrl ? true : false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const apiUrl = 'http://18.221.246.228:9000/webhook/api/v1/generate-url';


console.log(webhookUrl);


  const { data, loading, error } = useFetchGet<any>(apiUrl);

  const handleGenerate = () => {
    if (!isGenerated) {
      setIsGenerated(true);
      setGeneratedUrl(data.response_data.data.webhook_url)
      setLocalItem({
        key: "webhook_detail",
        value: {webhook_url:data.response_data.data.webhook_url, webhook_id: data.response_data.data.id}
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
  };

  return (
    <div className="p-4 overflow-y-auto max-h-[85vh] space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-4">Generate URL</h2>
        {(!isGenerated && !webhookUrl) ? <Button onClick={handleGenerate}>Generate</Button> : ''}
      </div>
      <div className={`items-center justify-between gap-5 ${isGenerated  ? 'flex' : 'hidden'}`}>
        <Input
          type="text"
          className="text-black border-primary"
          value={webhookUrl ? webhookUrl : generatedUrl}
          disabled
        />
        <button className="flex items-center justify-center border-primary border bg-primary p-1 rounded-md" onClick={handleCopy}>
          <Copy className="stroke-white" />
          {/* <span className="ml-2">Copy</span> */}
        </button>
      </div>
    </div>
  );
};

export default GenerateForm;