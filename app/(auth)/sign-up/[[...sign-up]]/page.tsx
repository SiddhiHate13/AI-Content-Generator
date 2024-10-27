import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-slate-200 to-violet-500 flex items-center justify-center">
      <SignUp />
    </div>
  );
}
