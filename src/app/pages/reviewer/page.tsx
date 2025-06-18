"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import HomeNavbar from "@/components/ui/homeNavbar"
  import VisitButton from "./components/visitButton"
  import DeleteButton from "./components/deleteButton"
  import axios from "axios"
  import { reviewerInterface2 } from "@/app/interface/reviewer"
  import { useEffect, useState } from "react"
  import { useQuery } from "@tanstack/react-query"
  import {Badge} from "@/components/ui/badge"
  import { backendUrl } from "@/app/utils/url"

  export default  function ReviewerPage() {

    const [ reviewers, setReviewers ] = useState<reviewerInterface2[]>([])
    
    const {data} = useQuery({
        queryKey : ["reviewer"],
        queryFn : () => axios.get(backendUrl("getAllReviewers")),
    })

    useEffect(() => {
        if(data)
        {
            let rawData: reviewerInterface2[] = data.data
            setReviewers(rawData.reverse())
        }
    }, [data])


    return (
    <div>
        <HomeNavbar />
        <h1 className="text-3xl mt-10 mb-5 font-bold text-center"> All Reviewer </h1>
        <div className="m-auto w-full md:w-5/6">
            <Table>
                <TableCaption>A list of Reviewers.</TableCaption>
                <TableHeader>
                <TableRow>
                    <TableHead className="">Reviewer Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>CreatedAt</TableHead>
                    <TableHead className="text-right"> Visit </TableHead>
                    <TableHead className="text-right"> Delete </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {reviewers?.map((reviewer,i) => (
                    <TableRow key={i}>
                    <TableCell className="font-medium">{reviewer.title}</TableCell>
                    <TableCell><Badge variant="outline" >{reviewer.subject}  </Badge > </TableCell>
                    <TableCell>{reviewer.createdat}</TableCell>
                    <TableCell className="text-right">
                        <VisitButton id={reviewer.id} title={reviewer.title}/>
                    </TableCell>
                    <TableCell className="text-right">
                        <DeleteButton id={reviewer.id} reviewer={reviewers} setReviewers={setReviewers}/>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
        
    </div>
    )
  }
  