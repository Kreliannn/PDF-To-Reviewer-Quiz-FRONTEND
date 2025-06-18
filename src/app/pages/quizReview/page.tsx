"use client"
import useReviewerStore from "@/app/store/reviewerStore"
import { useState } from "react"
import Navbar from "@/components/ui/quizNavbar"
import useTitleStore from "@/app/store/reviewerNameStore"
import { backendUrl } from "@/app/utils/url"

export default function ReviewQuiz()
{
    const [search, setSearch] = useState("")
    
    const reviewer = useReviewerStore((state) => state.reviewer)
    const title = useTitleStore((state) => state.title)

    console.log(reviewer)

    return(
        <div className="w-full bg-stone-100 ">
            <Navbar />
            <div className="text-center m-5">
                <h1 className="text-2xl font-bold text-stone-600">{title.split(".")[0]} Reviewer</h1>
            </div>
            {
                reviewer?.map((item, index) => {
                    return (
                        <div key={index} className="w-5/6 h-auto  m-auto sahdow-lg mb-3">
                            <div className="grid w-full items-center gap-1.5 ">
                                <div className="h-auto bg-white h-60 md:h-32 rounded shadow-md p-2">
                                        <div  className="w-full flex flex-col gap-1 p-2">
                                            <h1 className="font-bold">{item.item}</h1>
                                            <p className="text-sm text-stone-500">{item.definition}</p>
                                        </div>
                                </div>
                             
                               
                            </div>
                        </div>
                    )
                 })
            }
            
            

            <br />
        </div>
    )

}