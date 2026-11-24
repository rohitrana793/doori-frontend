// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// const useAuthStore = create(
//   persist(
//     (set) => ({
//       user: null,
//       accessToken: null,

//       setCredentials: (user, accessToken) =>
//         set({
//           user,
//           accessToken,
//         }),

//       setAccessToken: (accessToken) =>
//         set({
//           accessToken,
//         }),

//       clearCredentials: () =>
//         set({
//           user: null,
//           accessToken: null,
//         }),
//     }),
//     {
//       name: "auth-storage",
//     },
//   ),
// );

// export default useAuthStore;

// Production Code
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,

  setCredentials: (user, accessToken) =>
    set({
      user,
      accessToken,
    }),

  setAccessToken: (accessToken) =>
    set({
      accessToken,
    }),

  clearCredentials: () =>
    set({
      user: null,
      accessToken: null,
    }),
}));

export default useAuthStore;
