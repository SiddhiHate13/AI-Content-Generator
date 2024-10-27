import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-tl from-slate-200 to-violet-500">
         <SignIn />
    </div>
 
);
}