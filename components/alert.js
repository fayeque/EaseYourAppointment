import { useContext } from "react";
import { StateContext } from "../pages/_app";

export default function Alert() {
    const stateContext = useContext(StateContext);

    if (stateContext.count && stateContext.count.errors && stateContext.count.errors.length > 0) {
        return (
            <div className="fixed left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 mt-24">
                {stateContext.count.errors.map((err, i) => (
                    <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl shadow-lg mb-4 animate-fade-in" role="alert">
                        <div className="flex-shrink-0 mt-1">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-base mb-1">Oops!</div>
                            <div className="text-sm">{err.message}</div>
                        </div>
                        <button className="ml-2 p-1 rounded hover:bg-red-100 transition" aria-label="Close">
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                ))}
            </div>
        );
    } else if (stateContext.count && stateContext.count.success && stateContext.count.success.length > 0) {
        return (
            <div className="fixed left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 mt-24">
                {stateContext.count.success.map((err, i) => (
                    <div key={i} className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-900 px-6 py-4 rounded-xl shadow-lg mb-4 animate-fade-in" role="alert">
                        <div className="flex-shrink-0 mt-1">
                            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-base mb-1">Success</div>
                            <div className="text-sm">{err.message}</div>
                        </div>
                        <svg className="w-5 h-5 text-green-400 mt-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                ))}
            </div>
        );
    } else {
        return "";
    }
}