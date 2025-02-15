"use client";

import { useRouter } from "next/navigation";

export default function Borders({ borders }: { borders?: string[] }) {
  const router = useRouter();

  if (!borders || borders.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-bold">Borders:</span>
      {borders.map((border) => (
        <p
          key={border}
          className="p-2 hover:cursor-pointer bg-secondary rounded-lg"
          onClick={() => router.push(`/countries/${border}`)}
        >
          {border}
        </p>
      ))}
    </div>
  );
}