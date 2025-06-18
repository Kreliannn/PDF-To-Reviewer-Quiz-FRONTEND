"use client"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/ui/quizNavbar"

export default function StartPage({ setIsStart, title, items }: { setIsStart: (isStart: boolean) => void, title : string, items : number }) {
  const start = () => {
    setIsStart(false)
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="w-full max-w-md text-center">
          {/* Quiz Name */}
          <h1 className="text-3xl font-bold mb-8">{title.split(".")[0]}  </h1>

          {/* Quiz Items */}
          <div className="mb-8 text-left">
            <p className="font-medium mb-2">Quiz Items:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{items} Items</li>
            </ul>
          </div>

          <div className="mb-8 text-left">
            <p className="font-medium mb-2">Note:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>you can pass if you dont know the answer</li>
              <li>you can filter questioner</li>
              <li>theres a answer box provided in "Choices" Button</li>
            </ul>
          </div>

          {/* Good Luck Message */}
          <p className="mb-8 text-xl font-bold ">Good luck! You've got this!</p>

 

          {/* Start Button */}
          <Button onClick={start} variant={"black"} className="w-full">
            Start Quiz
          </Button>
        </div>
      </div>
    </div>
  )
}

