import {
  Tag,
  Users,
  Settings,
  Bookmark,
  User2Icon,
  LayoutGrid,
  LucideIcon,
  DollarSign,
  Store,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Master",
      menus: [
        {
          href: "/products",
          label: "Products",
          icon: Bookmark,
        },
        {
          href: "/member",
          label: "Member",
          icon: User2Icon,
        },
      ],
    },
    {
      groupLabel: "Transactions",
      menus: [
        {
          href: "/transactions",
          label: "Transactions",
          icon: Store,
        },
        {
          href: "/tags",
          label: "Pembayaran",
          icon: DollarSign,
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          icon: Users,
        },
        {
          href: "/account",
          label: "Account",
          icon: Settings,
        },
      ],
    },
  ];
}
