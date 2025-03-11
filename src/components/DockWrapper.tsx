"use client";

import { useRouter } from "next/navigation";
import Dock, { DockItemData } from "./Dock";
import { VscHome, VscAccount, VscBriefcase, VscMail, VscFile, VscGear } from "react-icons/vsc";

export default function DockWrapper() {
  const router = useRouter();

  const items: DockItemData[] = [
    {
      icon: <VscHome size={24} />,
      label: "Home",
      onClick: () => router.push("/"),
    },
    {
      icon: <VscAccount size={24} />,
      label: "About",
      onClick: () => router.push("/about"),
    },
    {
      icon: <VscBriefcase size={24} />,
      label: "Projects",
      onClick: () => router.push("/projects"),
    },
    {
      icon: <VscFile size={24} />,
      label: "Blog",
      onClick: () => router.push("/blog"),
    },
    {
      icon: <VscMail size={24} />,
      label: "Contact",
      onClick: () => router.push("/contact"),
    },
  ];

  return <Dock items={items} />;
}
