import React from "react";

const TrustBanner = () => {
  return (
    <div className="w-full border-b border-white/10 bg-[#003358] px-4 py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-center text-[11px] font-medium tracking-wide text-white uppercase md:justify-between md:text-xs">
        {/* Left Side: The Relationship */}
        <div className="flex items-center gap-2">
          <span className="text-white/60">Onderdeel van</span>
          <span className="font-bold tracking-widest text-[#f37021]">
            BEVATIX BV
          </span>
        </div>

        {/* Right Side: Quick Contact Info (Hidden on mobile to keep it clean) */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-1.5">
            <span className="text-[#f37021]">BTW</span>
            <span>BE-0860.057.131</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#f37021]">TEL</span>
            <span>+32 473 26 00 30</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBanner;
