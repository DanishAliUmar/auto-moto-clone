"use client"
import DashboardLayout from "@/components/DashboardLayout";
import WebHooksTable from "@/components/Tables/WebHooksTable";
import { Button } from "@/components/ui/button";
import BreadCrumb from "@/components/ui/Element/BreadCrumb";
import { Input } from "@/components/ui/input";
import useWebHookList from '@/Utility/Helpers/useWebHookList'
import { useRouter } from "next/navigation";



const Page = () => {
  const router = useRouter();
  const createWebHook = () => {
    router.push(`/dashboard/editor-setup-hooks/`);
  };
  const { data, loading } = useWebHookList();


  return (
    <DashboardLayout>
      <div className="space-y-5 px-4">
        <BreadCrumb
          items={[{ name: "Dashboard", link: "/dashboard" }, { name: "WebHook" }]}
        />
        <div className="flex xs:items-center justify-between gap-x-10 gap-y-3">
          <h2 className="text-primary font-semibold text-xl">WebHook</h2>
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Search WebHook"
              className={
                "bg-transparent focus-visible:ring-1 text-black_v2 w-full h-8 placeholder:text-grey-6 border-grey-5 !border"
              }
            />
            <Button className={"text-xs bg-black px-6 h-8"} onClick={() => createWebHook()}>Create WebHook</Button>
          </div>
        </div>
        <WebHooksTable data={data} loading={loading} />
      </div>
    </DashboardLayout>
  );
};

export default Page;
