"use client";
import Image from "next/image";

export default function Trainers() {
  return (
    <div className="grid lg:grid-cols-2 gap-16">
      
      <div>
        <div className="relative aspect-[4/5]">
          <Image src="/images/trainers/old_web_1.jpg" alt="HAMÁČEK" fill className="object-cover grayscale hover:grayscale-0" />
        </div>
        <div className="-mt-16 bg-black p-6 border-t-4 border-[#FF0000]">
          <h3 className="text-4xl">HAMÁČEK</h3>
          <p className="text-xs text-zinc-500 mt-2">HLAVNÍ KOUČ</p>
        </div>
      </div>

      <div>
        <div className="relative aspect-[4/5]">
          <Image src="/images/trainers/old_web_2.jpg" alt="SOUSTRUŽNÍK" fill className="object-cover grayscale hover:grayscale-0" />
        </div>
        <div className="-mt-16 bg-black p-6 border-t-4 border-[#FF0000]">
          <h3 className="text-4xl">SOUSTRUŽNÍK</h3>
          <p className="text-xs text-zinc-500 mt-2">PRO UNIT</p>
        </div>
      </div>

    </div>
  );
}
