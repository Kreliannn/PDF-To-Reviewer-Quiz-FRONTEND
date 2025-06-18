import { create } from "zustand";
import { persist } from "zustand/middleware";


interface stateInterface {
  title: string;
  setTitle: (data: string) => void;
}

const useTitleStore = create<stateInterface>()(
  persist(
    (set) => ({
      title: "",
      setTitle: (data) => set({ title: data }),
    }),
    {
      name: "title-storage", 
    }
  )
);

export default useTitleStore;