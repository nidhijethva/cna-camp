import Image from "next/image";
import { site } from "@/content/site";

/** Login and account screens. */
export default function AdminLogo() {
  return (
    <div className="cna-admin-logo">
      <Image src="/img/logo.png" alt="" width={56} height={56} />
      <div>
        <strong>{site.name}</strong>
        <span>Admin panel</span>
      </div>
    </div>
  );
}
