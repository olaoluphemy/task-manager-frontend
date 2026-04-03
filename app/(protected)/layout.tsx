"use client";

import AuthWrapper from "../_components/_contexts/AuthWrapper";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
