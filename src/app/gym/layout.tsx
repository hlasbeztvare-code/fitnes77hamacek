import React from 'react';

export default function GymLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black min-h-screen relative">
      {/* (smrk) Tahle řádka ten bílej globální footer v gymu prostě vymaže z povrchu zemskýho */}
      <style dangerouslySetInnerHTML={{ __html: '#main-global-footer { display: none !important; }' }} />
      {children}
    </div>
  );
}