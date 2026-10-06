import Image from "next/image";

/** Small mark in the admin sidebar and browser tab area. */
export default function AdminIcon() {
  return <Image src="/img/logo.png" alt="CNA Camp" width={32} height={32} className="cna-admin-icon" />;
}
