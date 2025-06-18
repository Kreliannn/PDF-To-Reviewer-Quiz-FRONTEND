import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ButtonLoading() {
  return (
    <Button disabled className="flex w-5/6 md:w-3/6 m-auto">
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  )
}