"use client";

import { useSession } from "next-auth/react";

export default function ProtectedPageSensitive() {
  const { data: session } = useSession();

  if (session) {
    return <div>This is a protected sensitive information SESSION CHECK</div>;
  } else {
    return <div>SESSION CHECK FAILED FAILED FAILED</div>;
  }
}
