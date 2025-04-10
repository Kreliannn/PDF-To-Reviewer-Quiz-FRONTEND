import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import HomeNavbar from "@/components/ui/homeNavbar"
  
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]
  
  export default function ReviewerPage() {
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
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell>
                        
                    </TableCell>
                    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
        
    </div>
    )
  }
  