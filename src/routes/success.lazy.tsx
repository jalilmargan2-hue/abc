import { createLazyFileRoute } from "@tanstack/react-router";
import Foot from "../components/foot";

function Success() {
  return (
    <>
      <div className="py-20 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="mx-auto max-w-2xl p-16 text-center border rounded-lg mb-20 gap-6 flex flex-col bg-[#0028571a]">
          <div className="flex flex-col items-center justify-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-12 w-12 text-[#002857]"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <h2 className="text-2xl font-bold text-[#002857]">Verification Successful</h2>
          </div>
          <p className="text-[#002857 ]">You’ve been successfully verified.</p>
        </div> 
        <Foot />
      </div>
    </>
  );
}

export const Route = createLazyFileRoute("/success")({
  component: Success,
});
