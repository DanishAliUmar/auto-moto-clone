import {
  Brackets,
  Delete,
  DeleteIcon,
  Edit2Icon,
  LucideDelete,
  PaintBucket,
  RemoveFormatting,
  Trash,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";
import { Switch } from "@/components/ui/switch";
import NoRecordFound from "../ui/Element/NoRecordFound";

interface WebHookList {
  id: string;
  webhook_url: string;
  is_active: boolean;
  created_at: string;
}

interface WebHooksTableProps {
  data: WebHookList[];
  loading: boolean;
}

const WebHooksTable: React.FC<WebHooksTableProps> = ({ data, loading }) => {
  const router = useRouter();
  const WebHooksDetail = (id: string) => {
    router.push(`/dashboard/editor-setup-hooks/${id}`);
  };

  return (
    <div className="rounded-lg border border-[#E5E5F2] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[60rem] w-full">
          <thead className="bg-secondary-foreground text-white">
            <tr className="text-left">
              <th className="py-5 px-4">ID</th>
              <th className="py-5 px-4">URL</th>
              <th className="py-5 px-4">Status</th>
              <th className="py-5 px-4">Created At</th>
              <th className="py-5 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y text-xs">
            {data?.data?.length > 0 ? (
              data.data?.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-300 cursor-pointer"
                  onClick={() => WebHooksDetail(item.id)}
                >
                  <td className="py-5 px-4">{item.id.split(`T`)[0]}</td>
                  <td className="py-5 px-4 capitalize ">{item?.webhook_url}</td>
                  <td className="py-5 px-4">
                    <Switch checked={item.is_active} />
                  </td>
                  <td className="py-5 px-4">{item.created_at}</td>
                  <td className="py-5 px-4">
                    <div className="flex gap-6">
                      <div className="cursor-pointer">
                        <Trash2 />
                      </div>
                      <div className="cursor-pointer">
                        <Edit2Icon />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-10 text-center text-lg font-bold">
                  <NoRecordFound />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WebHooksTable;
