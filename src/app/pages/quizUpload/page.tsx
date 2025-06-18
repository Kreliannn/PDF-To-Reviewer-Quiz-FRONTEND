"use client"
import {useState, useRef, useEffect} from "react"
import useReviewerStore from "@/app/store/reviewerStore"
import { reviewerInterface } from "@/app/interface/reviewer"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {  Upload, X } from "lucide-react"
import { ButtonLoading } from "./components/loading"
import useTitleStore from "@/app/store/reviewerNameStore"
import HomenNavbar from "@/components/ui/homeNavbar"
import { errorAlert } from "@/app/utils/sweerAlert"
import { backendUrl } from "@/app/utils/url"

const filePreview = async (file: File) => {
    const text = await file.text();
    return text;
};


export default function QuizUploadPage()
{
    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState<FileList | null>(null)
    const [fileContent, setFileContent] = useState<reviewerInterface[] | null>(null)

    const setReviewer = useReviewerStore((state) => state.setReviewer)
    const setTitle = useTitleStore((state) => state.setTitle)

    const router = useRouter()

    const fileInput = useRef<HTMLInputElement>(null)


    useEffect(() => {
        if (file && file.length > 0) {
            filePreview(file[0]).then((text) => {
                try {
                    const arr: reviewerInterface[] = JSON.parse(text)
                    setFileContent(arr)
                } catch (err) {
                    errorAlert("Invalid File Format")
                    setFileContent(null)
                    setFile(null)
                }
            });
        }
    }, [file]);


    const start = () => {
        if(fileContent && file)
        {
            setIsLoading(true)
            setReviewer(fileContent)
            setTitle(file[0].name)
            router.push("/pages/quizReview")
        }
    }

    
    return(
        <div className="w-full">
            <HomenNavbar />
            <h1 className="text-center w-5/6 md:w-3/6 m-auto text-3xl font-bold mt-10"> Take Quiz </h1>
            <p className="text-center w-5/6 md:w-3/6 m-auto text-md  text-stone-400 mt-2"> upload your reviewer file here </p>
            
            <input 
              ref={fileInput}
              id="txt" 
              type="file"
              accept=".txt" 
              className="hidden" 
              required 
              multiple={true}
              onChange={(e) => {
                    if(e.target.files)
                    {
                    
                        if(e.target.files[0].type != "text/plain")
                        {
                            errorAlert("Invalid File Type")
                            return
                        }
                            
                        setFile(e.target.files)
                    }
              }}

             />

             <br />

             

            <Button onClick={() => fileInput.current?.click()} variant="outline" className={(file) ? "hidden" : "border-2 border-dashed  w-5/6 md:w-3/6 m-auto h-32 flex flex-col gap-2"}>
                <Upload className="h-24 w-24" />
                <span className="text-lg font-bold">Click to upload file</span>
                <span className="text-xs text-stone-500">Txt File Only</span>
            </Button>

            {
                (file) ? 
                <>
                    <div  className="shadow w-5/6 md:w-3/6 m-auto mt-2 flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm truncate mr-4"> {file[0].name.split(".")[0]}</span>
                        <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="hover:text-red-500">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove file</span>
                        </Button>
                    </div>

                    <div className="shadow w-5/6 md:w-3/6 m-auto mt-2   p-3 bg-muted rounded-lg h-72">
                        <h1 className="mb-1 font-bold "> Preview: </h1>
                        <div className="container m-auto overflow-auto rounded-lg h-60 ">
                            {
                                fileContent?.map((item, index) => {
                                    return(
                                        <div key={index} className="w-full flex flex-col gap-1 p-2">
                                            <h1 className="font-bold">{(index + 1) + ". " + item.item}</h1>
                                            <p className="text-sm text-stone-500">{item.definition}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
                   
                : null
            }


            <br />

            {(isLoading) ? <ButtonLoading />: <Button onClick={start} className="block w-5/6 md:w-3/6 m-auto" disabled={!file}> Start Review </Button> }

            <div className="w-5/6 md:w-3/6 m-auto">
              <p className="w-5/6  m-auto text-center text-md  text-stone-400 mt-4 text-xs"> take quiz and review your ai generated reviewer. please upload your reviewer file </p>
            </div>
            
            
        </div>
    )
} 


