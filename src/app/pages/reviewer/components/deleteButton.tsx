"use client"
import { Button } from "@/components/ui/button";
import {Trash} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { reviewerInterface2 } from "@/app/interface/reviewer";
import { confirmAlert } from "@/app/utils/sweerAlert";
import { backendUrl } from "@/app/utils/url"

export default function DeleteButton({ id, setReviewers, reviewer } : { reviewer : reviewerInterface2[], id : string, setReviewers : (reviewers: reviewerInterface2[]) => void})
{


    const mutation = useMutation({
        mutationFn : (id: string) => axios.delete(backendUrl(`deleteReviewer/${id}`)),
        onSuccess : (response) => {
            setReviewers(reviewer.filter((reviewer) => reviewer.id !== id))
        },
        onError : (err) => {
            console.log(err)
        }
    })

    const deleteReviewer = () => {
        confirmAlert(() => {
            mutation.mutate(id)
        })
    }

    return(
        <Button size="icon" variant={"destructive"} className="" onClick={deleteReviewer} >
            <Trash />
           
        </Button>
    )
}