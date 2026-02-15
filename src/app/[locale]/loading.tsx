import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="grid place-content-center min-h-dvh bg-white/50">
      <Loader2 className="size-10 animate-spin text-indigo-600" />
    </div>
  );
};

export default Loading;
