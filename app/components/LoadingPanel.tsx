import "./components.css";
import Image from "next/image";

export default function LoadingPanel() {
  return (
    <div className="loading-panel flex flex-col gap-2 w-full items-center bg-black">
      <Image
        src="/beaver-loading.gif"
        alt="loading gif"
        width={400}
        height={200}
        className="w-1/2 h-auto"
      />
      <p className="text-2xl font-bold decoration-amber-500">
        PLAYLIST LOADING . . .{" "}
      </p>
    </div>
  );
}
