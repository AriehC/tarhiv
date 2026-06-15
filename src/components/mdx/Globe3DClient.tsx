"use client";

import dynamic from "next/dynamic";

export const Globe3D = dynamic(
  () => import("./Globe3D").then((m) => m.Globe3D),
  { ssr: false },
);
