import {
  LayoutDashboard,
  UtensilsCrossed,
  Phone,
  History,
  Info,
  Utensils,
  Building2,
  BadgeInfo,
  Store,
} from "lucide-react";

export const navLink = [
  {
    key: "/admin/dashboard/",
    icon: <LayoutDashboard size={18} />,
    label: "Dashboard",
  },

  {
    key: "/admin/restaurant/",
    icon: <Store size={18} />,
    label: "Restaurant",
  },

  {
    key: "/admin/branch/",
    icon: <Building2 size={18} />,
    label: "Branch",
  },

  {
    key: "/admin/menu/",
    icon: <UtensilsCrossed size={18} />,
    label: "Menu",
  },

  {
    key: "/admin/contact/",
    icon: <Phone size={18} />,
    label: "Contact",
  },

  {
    key: "/admin/cathering/",
    icon: <Utensils size={18} />,
    label: "Catering",
  },

  {
    label: "About",
    icon: <Info size={18} />,
    children: [
      {
        key: "/admin/history/",
        icon: <History size={18} />,
        label: "History",
      },
      {
        key: "/admin/who-we-are/",
        icon: <BadgeInfo size={18} />,
        label: "Who We Are",
      },
      {
        key: "/admin/franchise/",
        icon: <BadgeInfo size={18} />,
        label: "Franchise",
      },
    ],
  },
];
