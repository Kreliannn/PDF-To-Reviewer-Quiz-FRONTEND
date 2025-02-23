"use client"
import {useState} from "react"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"

export default function Upload()
{
    const [file, setFile] = useState<File | null>(null)

    const mutation = useMutation({
        mutationFn : (formData : FormData) => axios.post("http://localhost:1000/upload", formData),
        onSuccess : (response) => {
            console.log(response)
            alert("success")
        },
        onError : (err) => {
            alert("error")
            console.log(err)
        }
    })

    const upload = () => {
        if(!file) return alert("select file")
        const formData = new FormData()
        formData.append("file", file)
        mutation.mutate(formData)
    }

    

    return(
        <div>
            <input 
              id="pdf" 
              type="file"
              accept="application/pdf" 
              className="ms-2 m-auto mt-2" 
              required 
              onChange={(e) => setFile((e.target.files) ? e.target.files[0] : null)}
             />
            <br /><br />
             <button className="ms-2 button" onClick={upload}> upload </button>
        </div>
    )
}