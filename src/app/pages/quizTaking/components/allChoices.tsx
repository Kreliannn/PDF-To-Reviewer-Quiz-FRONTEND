import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { reviewerInterface } from "@/app/interface/reviewer"
import { Send } from 'lucide-react';
import { Badge } from "@/components/ui/badge"


import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"



export default function AllChoices({ quiz, setInput, input, submit } : 
  { 
    quiz : reviewerInterface[],
     setInput : React.Dispatch<React.SetStateAction<string>>, 
     input : String,
     submit : () => void
  } 
)
{

  const [answer, setAnswer] = useState<string>("")  

  const submitAnswer =() => {

  }

    return(
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="black" size="lg"> Choices </Button>
      </DrawerTrigger>
      <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle> Choices</DrawerTitle>
            <DrawerDescription>you can click the answer.</DrawerDescription>
          </DrawerHeader>
          <div className="h-auto  max-h-72 md:max-h-62 p-4 pb-0 flex flex-wrap items-start gap-2 overflow-auto">
            {
                quiz?.map((item, index) => {
                    return (
                        <Badge 
                         variant={(input != item.item)? "outline" : "default"}
                         key={index}
                         onClick={() => setInput(item.item)}
                        > 
                            {item.item} 
                        </Badge >
                    )
                })
            }  

          </div>



          <DrawerFooter>
            <DrawerClose asChild>
            <Button variant="black" className="w-full m-auto" onClick={submit}> <Send /> Submit Answer </Button>
            </DrawerClose>
          </DrawerFooter>

        </div>     
      </DrawerContent>
    </Drawer>
    )

}