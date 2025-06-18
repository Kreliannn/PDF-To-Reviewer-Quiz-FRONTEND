"use client"
import useReviewerStore from "@/app/store/reviewerStore"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash, X } from "lucide-react";
import {confirmAlert, errorAlert, TakeQuizAlert} from "../../utils/sweerAlert"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import {saveInterface} from "../../interface/save"
import { useRouter } from "next/navigation"
import useTitleStore from "@/app/store/reviewerNameStore"
import { backendUrl } from "@/app/utils/url"

export default function Edit()
{
    const reviewer = useReviewerStore((state) => state.reviewer)
    const setReviewer = useReviewerStore((state) => state.setReviewer)
    const setTitle = useTitleStore((state) => state.setTitle)

    const [QnA, setQnA] = useState(reviewer)

    const router = useRouter()

    
    console.log(reviewer)

    const [fileName, setFileName] = useState("")
    const [subject, setSubject] = useState("")

    
    const mutation = useMutation({
        mutationFn : (reviewer: saveInterface) => axios.post(backendUrl("createReviewer"), reviewer),
        onSuccess : (response) => {
            TakeQuizAlert(() =>{
                setTitle(fileName + ".txt")
                setReviewer(QnA)
                router.push("/pages/quizReview")
            }, () => router.push("/"))
        },
        onError : (err) => {
            console.log(err)
        }
    })

    const changeTitle = (e : React.ChangeEvent<HTMLInputElement>, index : number) => {
        let currentQnA = [...QnA]
        currentQnA[index] = { item : e.target.value, definition : currentQnA[index].definition, id : currentQnA[index].id }
        setQnA(currentQnA)
    }

    const changeDefinition = (e : React.ChangeEvent<HTMLTextAreaElement>, index : number) => {
        let currentQnA = [...QnA]
        currentQnA[index] = { definition : e.target.value, item : currentQnA[index].item, id : currentQnA[index].id }
        setQnA(currentQnA)
    }


    const save = () => {

        if(!fileName) return errorAlert("please fill up title field");
        if(!subject) return errorAlert("please fill up subject field");

        const text = JSON.stringify(QnA)
        const blob = new Blob([text], { type: "text/plain" });
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];

        const obj = {
            title : fileName,
            subject : subject,
            createdAt : formattedDate,
            items : QnA
        }

        mutation.mutate(obj)
        
    }

    return(
        <div className="w-full bg-stone-100 ">
            <div className="w-full h-14   mb-5 ">
                <div className="m-auto w-5/6  h-full place-items-center flex gap-3">
                    <Input 
                        type="text" 
                        value={fileName}
                        placeholder="Title"
                        onChange={(e) =>setFileName(e.target.value)}
                        className="font-bold bg-white"
                    /> 
                    <Input 
                        type="text" 
                        value={subject}
                        placeholder="Subject"
                        onChange={(e) =>setSubject(e.target.value)}
                        className="font-bold bg-white"
                    /> 
                    <Button variant={"default"} onClick={save} >  save </Button>
                </div> 
            </div>
            {
                QnA?.map((question, index) => {
                    return (
                        <div key={index} className="w-5/6 h-auto  m-auto sahdow-lg mb-10">
                            <div className="grid w-full items-center gap-1.5 ">

                                <div className="w-full flex justify-between items-center"> 
                                    <Label className="font-bold text-stone-600"> item #{index + 1}</Label>
                                    <X className="w-5 h-5 text-black hover:text-red-500 hover:text-white rounded " onClick={()=>confirmAlert(() => setQnA(QnA.filter((item) => item.id != question.id)))} />
                                </div>
                             
                                <Input 
                                    type="text" 
                                    value={question.item}
                                    onChange={(e) => changeTitle(e, index)}
                                    className="font-bold bg-white"
                                    placeholder="set item title"
                                /> 
                            </div>
                            
                           
                            <div className="grid w-full gap-1.5 mt-2">
                                <Textarea className="h-auto bg-white h-60 md:h-32" placeholder="set defenition" value={question.definition} onChange={(e) => changeDefinition(e, index)} />
                                <p className="text-xs text-muted-foreground ">
                                    you can modify item before saving
                                </p>
                            </div>
                        </div>
                    )
                 })
            }
            
            <button className="button w-5/6 m-auto block" onClick={() => setQnA([...QnA, { id : crypto.randomUUID(), item : "", definition : ""}])}> add items </button>

            <br />
        </div>
    )

}