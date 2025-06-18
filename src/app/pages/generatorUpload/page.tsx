"use client"
import {useState, useRef} from "react"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import useReviewerStore from "@/app/store/reviewerStore"
import { reviewerInterface } from "@/app/interface/reviewer"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Divide, Upload, X } from "lucide-react"
import { ButtonLoading } from "./components/loading"
import HomeNavbar from "@/components/ui/homeNavbar"
import { errorAlert } from "@/app/utils/sweerAlert"
import { backendUrl } from "@/app/utils/url"

export default function UploadPage()
{
    const [file, setFile] = useState<FileList | null>(null)
    const [isLoading, setIsLoading] = useState(false)
   

    const setReviewer = useReviewerStore((state) => state.setReviewer)

    const router = useRouter()

    const fileInput = useRef<HTMLInputElement>(null)

    const mutation = useMutation({
        mutationFn : (formData : FormData) => axios.post(backendUrl("uploads"), formData),
        onSuccess : (response) => {
            const  QnA : reviewerInterface[]  = response.data
            setReviewer(QnA)
            router.push("/pages/generatorEdit")
        },
        onError : (err) => {
            alert("error")
            console.log(err)
        }
    })

    const upload = () => {
        if(!file) return alert("select file")
        setIsLoading(true)
        const formData = new FormData()
        for(let i = 0; i < file.length; i++)
        {
            formData.append("files", file[i])
        }
        mutation.mutate(formData)
    }

    const removeFile = (index : number) => {
        if(!fileInput.current) return alert("error")
        const dataTransfer = new DataTransfer();
        Array.from(file as FileList).forEach((file, i) => {
            if(i !== index) 
            { 
                dataTransfer.items.add(file);
            }
        })
        
        setFile((dataTransfer.files.length > 0) ? dataTransfer.files : null)
    }

    return(
        <div className="w-full">
            <HomeNavbar />
            <h1 className="text-center w-5/6 md:w-3/6 m-auto text-3xl font-bold mt-10"> PDF Reviewer</h1>
            <p className="text-center w-5/6 md:w-3/6 m-auto text-md  text-stone-400 mt-2"> upload your pdf file to generate a personalized reviewer </p>

            <input 
              ref={fileInput}
              id="pdf" 
              type="file"
              accept="application/pdf" 
              className="hidden" 
              required 
              multiple={true}
              onChange={(e) => {
                if(e.target.files)
                {
                    const length = e.target.files?.length
                    for(let i = 0; i < length!; i++)
                    {
                        if(e.target.files[i].type != "application/pdf")
                        {
                            errorAlert("Invalid File Type")
                            return
                        }
                    }
                    setFile((e.target.files) ? e.target.files : null)
                }
            }}
             />

             <br />

            <Button onClick={() => fileInput.current?.click()} variant="outline" className="border-2 border-dashed  w-5/6 md:w-3/6 m-auto h-32 flex flex-col gap-2">
                <Upload className="h-24 w-24" />
                <span className="text-lg font-bold">Click to upload file</span>
                <span className="text-xs text-stone-500">pdf file only</span>
            </Button>

            {
                (file) ? 
                    Array.from(file as FileList).map((file, index) => (
                        <div key={index} className=" w-5/6 md:w-3/6 m-auto mt-2 flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="text-sm truncate mr-4">{file.name}</span>
                            <Button variant="ghost" size="icon" onClick={() => removeFile(index) } className="hover:text-red-500">
                            <X className="h-4 w-4 " />
                            <span className="sr-only">Remove file</span>
                            </Button>
                        </div >
                    ))
                : null
            }


            <br />

            {(isLoading) ? <ButtonLoading />:  <Button onClick={upload} className="block w-5/6 md:w-3/6 m-auto" disabled={!file}> Generate Reviewer </Button>}

            
            <div className="w-5/6 md:w-3/6 m-auto">
              <p className="w-5/6  m-auto text-center text-md  text-stone-400 mt-4 text-xs"> Your PDF file will be analyzed to create a reviewer with key concepts and question that you can personalized </p>
            </div>
            
            
        </div>
    )
} 
