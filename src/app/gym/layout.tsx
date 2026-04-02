import React from 'react';

export default function GymLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black min-h-screen relative">
      {children}
    </div>
  );
}
