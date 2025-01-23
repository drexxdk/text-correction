"use client";
import TextCorrectionV1 from "./TextCorrectionV1/TextCorrectionV1";
import TextCorrectionV2 from "./TextCorrectionV2/TextCorrectionV2";

export default function Home() {
  return (
    <div className="grid gap-8">
      <TextCorrectionV1 />
      <TextCorrectionV2 />
    </div>
  );
}
