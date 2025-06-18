"use client"

import { useState, useEffect } from "react"
import { BookOpen, ClipboardCheck, LogOut  } from "lucide-react"
import { useRouter, usePathname  } from "next/navigation"

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("review")
  const pathname = usePathname()
  const router = useRouter()

    useEffect(() => {
        setActiveTab(pathname)
    }, [])
  

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    switch(tab)
    {
        case "review":
            router.push("/pages/quizReview")
            break
        case "take":
            router.push("/pages/quizTaking")
            break
        case "exit":
            router.push("/")
            break
        default:
            break
    }
  }

  return (
    <nav className="w-full bg-black shadow-md border-b border-slate-800 mb-3 shadow-lg">
      <div className="w-5/6 mx-auto h-16 flex items-center justify-between">
        {/* Logo and Website Name */}
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl text-white">PDF To Quiz</span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1">
          <button
           onClick={() => handleTabChange("review")}
            className={`px-3 sm:px-4 py-2 rounded-md transition-colors ${
              activeTab === "/pages/quizReview"
                ?  "bg-stone-200 text-black"
                : "text-slate-200 hover:bg-stone-800 hover:text-white"
            }`}
          >
            <div className="flex items-center space-x-1">
              <BookOpen className="h-5 w-5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Review Quiz</span>
            </div>
          </button>

          <button
           onClick={() => handleTabChange("take")}
            className={`px-3 sm:px-4 py-2 rounded-md transition-colors ${
              activeTab === "/pages/quizTaking"
                ? "bg-stone-200 text-black"
                : "text-slate-200 hover:bg-stone-800 hover:text-white"
            }`}
          >
            <div className="flex items-center space-x-1">
              <ClipboardCheck className="h-5 w-5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Take Quiz</span>
            </div>
          </button>


          <button
            onClick={() => handleTabChange("exit")}
            className={`px-3 sm:px-4 py-2 rounded-md transition-colors ${
              activeTab === "exit"
                ?  "bg-stone-200 text-black"
                : "text-slate-200 hover:bg-stone-800 hover:text-white"
            }`}
          >
            <div className="flex items-center space-x-1">
              <LogOut className="h-5 w-5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Exit</span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}

