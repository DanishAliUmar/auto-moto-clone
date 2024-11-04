import {useFetchGet} from "@/Hooks/useFetch";
const apiUrl = 'http://18.221.246.228:9000/webhook/api/v1/get-webhook-list';
const useWebHookList = () => {
  const { data, loading, error } = useFetchGet<any>(apiUrl);

  return {
    data,loading,error
  };
};

export default useWebHookList;