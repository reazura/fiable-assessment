"use client"
import { useState } from "react";
import MainGrid from "./components/grid";

export default function Home() {
  const [input, setInput] = useState<string>("")

  return (
    <div className="flex justify-center">
      <div className="max-w-[600px] p-10 text-black flex gap-4 flex-col w-[600px]">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} />
        <MainGrid input={input} />
      </div>
    </div>
  );
}
