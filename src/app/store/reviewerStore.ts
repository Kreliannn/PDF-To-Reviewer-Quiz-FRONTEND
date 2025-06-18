import { create } from "zustand";
import { persist } from "zustand/middleware";
import { reviewerInterface } from "../interface/reviewer";

interface stateInterface {
  reviewer: reviewerInterface[];
  setReviewer: (data: reviewerInterface[]) => void;
}

const useReviewerStore = create<stateInterface>()(
  persist(
    (set) => ({
      reviewer: [],
      setReviewer: (data) => set({ reviewer: data }),
    }),
    {
      name: "reviewer-storage", 
    }
  )
);

export default useReviewerStore;
