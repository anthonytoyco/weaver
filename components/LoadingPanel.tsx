import "./Components.css";
import beaverGif from "../public/beaver-loading.gif";

function LoadingPanel() {

    return (
        <div className="loading-panel flex flex-col gap-2 w-full items-center bg-black">
            <img src={beaverGif} alt="loading gif" className="w-1/2 h-auto" />
            <p className="text-2xl font-bold decoration-amber-500">PLAYLIST LOADING . . . </p>
        </div>
    );
}

export default LoadingPanel;
