import { create } from "zustand";

type GlobalStore = {
  openModal: string;
  setOpenModal: (whichModal: string) => void;
  loading: string;
  setLoading: (whichLoading: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
};

export const globalStore = create<GlobalStore>()((set) => ({
  openModal: "",
  setOpenModal: (whichModal: string) => set({ openModal: whichModal }),
  loading: "",
  setLoading: (whichLoading: string) => set({ loading: whichLoading }),
  isSidebarOpen: true,
  setIsSidebarOpen: (isSidebarOpen: boolean) => set({ isSidebarOpen }),
}));
