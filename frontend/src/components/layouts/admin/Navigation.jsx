import { LayoutDashboard, ShoppingBag, UtensilsCrossed } from "lucide-react";

export const navLink = [
  {
    key: "/admin/dashboard/",
    icon: <LayoutDashboard size={18} />,
    label: "Dashboard",
  },

  {
    key: "/admin/dashboard/order/",
    icon: <ShoppingBag size={18} />,
    label: "Orders",
  },
  {
    key: "/admin/dashboard/menu/",
    icon: <UtensilsCrossed size={18} />,
    label: "Menu",
  },
];
