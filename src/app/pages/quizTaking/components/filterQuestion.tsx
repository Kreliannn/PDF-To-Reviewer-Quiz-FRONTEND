"use client"
import { useState, } from "react"
import { Button } from "@/components/ui/button"
import { reviewerInterface } from "@/app/interface/reviewer"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"



export default function FilterQuestion(
    { quiz, setQuiz, setIisStart , quizItem} 
    : { 
        quiz : reviewerInterface[], 
        quizItem : reviewerInterface[],
        setQuiz : React.Dispatch<React.SetStateAction<reviewerInterface[] | undefined>>, 
        setIisStart : React.Dispatch<React.SetStateAction<boolean>> 
    }
) 
{
    const [newQuiz, setNewQuiz] = useState<reviewerInterface[]>([])

   

    const filterNewQuiz = (isChecked: boolean, item : reviewerInterface  ) => {
        if(!newQuiz) return
        if(isChecked)
        {
            const newQ = [...newQuiz, item]
            setNewQuiz(newQ)
        }
        else
        {
            const newQ = newQuiz.filter((i) => i.id != item.id)
            setNewQuiz(newQ)
        }
      
    }

    const applyChanges = () => {
        setQuiz(newQuiz)
        setIisStart(true)
    }

    

    return(
    <Drawer>
      <DrawerTrigger asChild>
        <Button  size="lg" variant="black"> Filter Question </Button>
      </DrawerTrigger>
      <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle> Filter Question</DrawerTitle>
            <DrawerDescription>check question of your choice </DrawerDescription>
          </DrawerHeader>

          <div className="h-auto  max-h-72 md:max-h-62 p-4 pb-0   items-start  overflow-auto">
            {
                quiz?.map((item, index) => {
                    return (
                        <div key={index} className="flex items-center space-x-2 mb-1">
                            <Checkbox id="terms"   onCheckedChange={(checked : boolean) => {
                               filterNewQuiz(checked, item)
                            }}/>
                            <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {item.item}
                            </label>
                        </div>
                    )
                })
            }
          </div>

          <div className="w-full m-auto  flex justify-center p-4 mt-2">
             <Button variant="black" className="w-full m-auto" onClick={applyChanges}> Apply Changes </Button>
          </div>
       
        </div>     
      </DrawerContent>
    </Drawer>
    )

}