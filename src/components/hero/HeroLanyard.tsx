"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/components/hero/Lanyard"), {
  ssr: false,
});

export default function HeroLanyard() {
  return <Lanyard position={[0, 0, 27]} gravity={[0, -40, 0]} />;
}
