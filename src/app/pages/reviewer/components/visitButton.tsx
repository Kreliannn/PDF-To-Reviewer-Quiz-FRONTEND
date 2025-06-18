"use client"
import { Button } from "@/components/ui/button";
import useTitleStore from "@/app/store/reviewerNameStore"
import useReviewerStore from "@/app/store/reviewerStore"
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { backendUrl } from "@/app/utils/url"

export default function VisitButton({ id, title } : { id : string, title : string})
{
    const setReviewer = useReviewerStore((state) => state.setReviewer)
    const setTitle = useTitleStore((state) => state.setTitle)

    const router = useRouter()

    const mutation = useMutation({
        mutationFn : (id: string) => axios.get(backendUrl(`getAllReviewers/${id}`)),
        onSuccess : (response) => {
            setReviewer(response.data)
            setTitle(title)
            router.push("/pages/quizReview")
        },
        onError : (err) => {
            console.log(err)
        }
    })


    const visit = () => {
        mutation.mutate(id) 
    }

    return(
        <Button variant="black" className="" onClick={visit} >
            Visit
        </Button>
    )
}