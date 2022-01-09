export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Index"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart"),
  },
];
