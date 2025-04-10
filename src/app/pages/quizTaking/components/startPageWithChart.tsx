"use client"
import useReviewerStore from "@/app/store/reviewerStore"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash, X } from "lucide-react";
import { reviewerInterface } from "@/app/interface/reviewer"
import Navbar from "@/components/ui/quizNavbar"
import { Send } from 'lucide-react';
import PieChart from "./chart"
import { analyticsInterface } from "@/app/interface/analytics"

export default function startPageWithChart({ setIsStart, analytics, setAnalyttics }: {setAnalyttics : (analytics : analyticsInterface) => void,setIsStart: (isStart: boolean) => void, analytics : analyticsInterface })
{
   
    const start = () => {
        setAnalyttics({
            correct: 0,
            wrong: 0,
            pass: 0
        })
        setIsStart(false)
    }

    return(

        <div className="">
            <Navbar />
            <div className="w-full h-dvh   ">
                <div className="w-5/6 m-auto mb-4">
                     <PieChart analytics={analytics}/>
                </div>
                <div className="w-5/6 m-auto">
                    <Button 
                        className="w-full"
                        onClick={start}
                    >
                        Try Again
                    </Button>
                </div>
              
               
            </div>
          
        </div>
    )

}