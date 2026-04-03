"use client";

import AccountWrapper from "../_components/_contexts/AccountWraper";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AccountWrapper>{children}</AccountWrapper>;
}
