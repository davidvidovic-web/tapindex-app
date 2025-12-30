import { Droplets } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-2 shadow-md">
        <Droplets className="h-5 w-5 text-white" />
      </div>
      <span className="text-xl font-bold text-gray-900">TWR</span>
    </div>
  );
}
