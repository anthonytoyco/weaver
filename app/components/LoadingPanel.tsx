import "./components.css";
import Image from "next/image";

export default function LoadingPanel() {
  return (
    <div className="loading-panel flex w-full h-full items-center justify-center bg-black">
      <Image
        src="/beaver-loading.gif"
        alt="loading gif"
        width={400}
        height={200}
        className="w-1/2 h-auto"
      />
    </div>
  );
}
