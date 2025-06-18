"use client"
import useReviewerStore from "@/app/store/reviewerStore"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { reviewerInterface } from "@/app/interface/reviewer"
import Navbar from "@/components/ui/quizNavbar"
import { Send } from 'lucide-react';
import AllChoices from "./components/allChoices"
import { SkeletonCard } from "./components/questionSkeleton"
import StartPage from "./components/startPage"
import FilterQuestion from "./components/filterQuestion"
import { analyticsInterface } from "@/app/interface/analytics"
import StartPageWithChart from "./components/startPageWithChart"
import useTitleStore from "@/app/store/reviewerNameStore"
import {Alert} from "../../utils/sweerAlert"
import { backendUrl } from "@/app/utils/url"



function shuffle(array: reviewerInterface[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


export default function TakeQuiz()
{
    const reviewer = useReviewerStore((state) => state.reviewer)
    const title = useTitleStore((state) => state.title)
    const [quizItem, setQuizItem] = useState<reviewerInterface[]>([])
    const [quiz, setQuiz] = useState<reviewerInterface[]>()
    const [question, setQuestion] = useState<string>("")
    const [input, setInput] = useState<string>("")
    const [isLoading, setIsLoading] = useState(true)
    const [isStart, setIisStart] = useState(true)
    const [analytics, setAnalytics] = useState<analyticsInterface>({
        correct: 0,
        wrong: 0,
        pass: 0
    })

    

    useEffect(() => {
        if(reviewer.length != 0)
        {
            setQuiz(reviewer)
            setIsLoading(false)
        }
    },[reviewer])

    useEffect(() => {
        if(quiz && quiz.length != 0)
        {
            const shuffledQuiz = shuffle([...quiz]);
            setQuizItem(shuffledQuiz)
            setQuestion(shuffledQuiz[0].definition)
        }

    }, [quiz])

 
    const checkIfExists = ( item: string) => {
        if(quizItem) return quizItem.some((obj) => obj.item.toUpperCase() === item.toUpperCase()); 
    }
    
    const submit = () => {
        if(!quizItem) return
        if(input.toUpperCase() == quizItem[0].item.toUpperCase())
        {
            const newQuiz = [...quizItem]
            newQuiz.shift();
            if(newQuiz.length == 0)
            {
                restartQuiz()
                return
            }
            nextQuestion()
            setQuizItem(newQuiz) 
            setQuestion(newQuiz[0].definition)      
            setInput("")
            setAnalytics(prev => ({...prev, correct: prev.correct + 1}))
            Alert("success");
        }
        else
        {
            setAnalytics({...analytics, wrong: analytics.wrong + 1})
            Alert("error");
        }
    }

    const pass = () => {
        if(!quiz) return
        const newQuiz = [...quizItem]
        const passItem = newQuiz.shift();
        newQuiz.push(passItem as reviewerInterface)
        setQuizItem(newQuiz)
        setQuestion(newQuiz[0].definition)
        nextQuestion()
        setAnalytics({...analytics, pass: analytics.pass + 1})
    }

    const endQuiz = () => {
        setAnalytics({
            correct: 0,
            wrong: 0,
            pass: 0
        })
        restartQuiz()
    }

    const restartQuiz = () => {
        if(!quiz) return
        setIisStart(true)
        setInput("")
        setQuizItem(quiz)
        setQuestion(quiz[0].definition)

    }

    const nextQuestion = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 800)
    }

    if(isStart) 
    {
        if(analytics.correct == 0 && analytics.wrong == 0 && analytics.pass == 0 && quiz)
        {
           return <StartPage title={title} setIsStart={setIisStart} items={quiz?.length} />
        }
        else
        {
            return <StartPageWithChart setAnalyttics={setAnalytics} analytics={analytics} setIsStart={setIisStart} />
        }
    } 

    return(
        <div className="w-full h-dvh bg-stone-100 ">
            <Navbar />         
            <div className="w-5/6  h-auto m-auto s mt-5 ">

                <div className="grid grid-cols-2 h-10   gap-1.5 p-2 mb-1 ">
                    <div className="">
                        <h1 className="text-left md:text-2xl text-lg font-bold text-stone-700"> {title.split(".")[0]} </h1>
                    </div>
                    <div className="w-100">
                        <h1 className="text-right md:text-2xl text-lg font-bold text-stone-700"> Item Left: {quizItem?.length} </h1>
                    </div>
                </div>

                <div className="w-full grid grid-cols-1 h-72   rounded    gap-1.5 p-2 ">
                    <div className=" h-full bg-white rounded shadow-md p-4 overflow-auto">
                        {
                            (isLoading) ? <SkeletonCard /> : <h1 className=" text-stone-700 font-bold text-lg "> {question} </h1>
                        }
                    </div>  
                </div>

                <div className="grid grid-cols-4 w-full items-center gap-1.5 p-2">
                    <Input 
                        type="text" 
                        className={`col-span-3 h-14 bg-white shadow-lg font-bold text-lg ${(checkIfExists(input)) ? "text-green-700" : ""}`}
                        placeholder="Answer........." 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button 
                     className="col-span-1 h-14 shadow-lg font-bold text-lg flex items-center gap-2" 
                     variant="black"
                     onClick={submit}
                    >
                        <Send className="" />  
                        <span className="hidden md:block">Submit</span>  
                              
                    </Button>
                </div>

                {
                    (quiz) ?
                    <div className="flex flex-wrap gap-2 p-2 mt-2">
                        <Button size="lg" variant="black" className="" onClick={pass}>  Pass </Button>
                        <AllChoices  quiz={quiz} setInput={setInput} input={input} submit={submit} />
                        <FilterQuestion quiz={reviewer} quizItem={quizItem} setQuiz={setQuiz} setIisStart={setIisStart}/>
                        <Button  size="lg" variant="black" className="" onClick={endQuiz}>  End Quiz </Button>
                    </div> : null
                }

            </div>
        </div>
    )

}