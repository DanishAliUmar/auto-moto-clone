import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetchGet } from "@/Hooks/useFetch";
import useLocalStorage from "@/Hooks/useLocalStorage";
import { Copy } from "lucide-react";
import React, { useEffect, useState } from "react";

interface GenerateFormProps {
  createFilterUrl?: string;
  updateFilterUrl?: string;
}

const GenerateForm: React.FC<GenerateFormProps> = ({
  createFilterUrl,
  updateFilterUrl,
}) => {

  const [value, setLocalItem, getLocalItem] = useLocalStorage();
   // Get webhook detail from localStorage based on the provided URL
   const webhookDetail = createFilterUrl
   ? getLocalItem("webhook_detail")
   : getLocalItem("webhook_update_detail");
  const webhookUrl = webhookDetail?.webhook_url
  const [isGenerated, setIsGenerated] = useState(webhookUrl ? true : false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const apiUrl = 'http://18.221.246.228:9000/webhook/api/v1/generate-url';



    const [shouldFetch, setShouldFetch] = useState(false);
    
   const { data, loading, error } = useFetchGet<any>(shouldFetch ? apiUrl : null);

  
   useEffect(() => {
    if (data) {
      const webhookData = data.response_data.data;
      
      // Only set generated URL if it has changed
      if (generatedUrl !== webhookData.webhook_url) {
        setGeneratedUrl(webhookData.webhook_url);
      }
      
      if (!isGenerated) {
        setIsGenerated(true);
      }
  
      const storageKey = createFilterUrl
        ? "webhook_detail"
        : "webhook_update_detail";
      
      // Only set local storage if it's different from existing
      const existingDetail = getLocalItem(storageKey);
      if (existingDetail?.webhook_url !== webhookData.webhook_url) {
        setLocalItem({
          key: storageKey,
          value: { webhook_url: webhookData.webhook_url, webhook_id: webhookData.id },
        });
      }
    }
  }, [data, createFilterUrl, getLocalItem, generatedUrl, isGenerated, setLocalItem]);
  

  const handleGenerate = () => {
    if (!isGenerated) {
      setShouldFetch(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
  };

  return (
    <div className="p-4 overflow-y-auto max-h-[85vh] space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-4">Generate URL</h2>
        {(!isGenerated) ? <Button onClick={handleGenerate}>{loading ? 'loading ...' : "Generate"}</Button> : ''}
      </div>
      <div className={`items-center justify-between gap-5 ${(isGenerated && !loading)  ? 'flex' : 'hidden'}`}>
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