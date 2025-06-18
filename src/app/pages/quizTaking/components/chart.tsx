"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { analyticsInterface } from "@/app/interface/analytics"



const chartConfig = {
  type: {
    label: "Type",
  },
  correct: {
    label: "Correct",
    color: "#22c55e",
  },
  wrong: {
    label: "Wrong",
    color: "#ef4444",
  },
  pass: {
    label: "Pass",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function Component({analytics} : {analytics : analyticsInterface}) {

  const chartData = [
    { answer: "correct", type: analytics.correct + 1, fill: "#A9A9A9" }, // lighter shade of black
    { answer: "wrong", type: analytics.wrong, fill: "#555555" },   // darker shade of black
    { answer: "pass", type: analytics.pass, fill: "#808080" },    // medium shade of black
  ]

  return (
    <Card className="flex flex-col shadow-lg">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg font-bold"> Quiz Performance Overview </CardTitle>
        <CardDescription> Here's how you performed on your recent quiz attempt. </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] [&_.recharts-text]:fill-black"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="answer" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="type"
              outerRadius={80}
              label={({ name, value, index }) => chartData[index].answer}
              labelLine={true}
              className="font-bold text-stone-600"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {(analytics.wrong == 0 &&  analytics.pass == 0) ? "You Got Perfect Score!!" : "Try Again To Get Better Result"}
        </div>
        <div className="leading-none text-muted-foreground">
          Taken On ({new Date().toLocaleDateString()}) 
        </div>
      </CardFooter>
    </Card>
  )
}