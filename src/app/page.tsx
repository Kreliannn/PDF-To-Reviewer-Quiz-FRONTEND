"use client"
import { Button } from "@/components/ui/button"
import { FileText, BookOpen, ArrowRight , ClipboardCheck} from "lucide-react"
import { useRouter } from "next/navigation"
import HomeNavbar from "@/components/ui/homeNavbar"


export default function Home() {

  const router = useRouter()
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}

      <HomeNavbar />
     

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="container mx-auto py-16 px-4 md:py-24 ">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Transform PDFs into Interactive Study Materials
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              AI-powered tool that converts your PDF files into structured Q&A reviewers and personalized quizzes
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4" >
              <Button className="bg-black hover:bg-gray-800 text-white px-8 py-6 rounded-md text-lg" onClick={()=> router.push("/pages/generatorUpload")}>
                <FileText className="mr-2 h-5 w-5" />
                Generate Reviewer
              </Button>

              <Button className="bg-black hover:bg-gray-800 text-white px-8 py-6 rounded-md text-lg" onClick={()=> router.push("/pages/reviewer")}>
                <BookOpen className="mr-2 h-5 w-5" />
                All Reviewers
              </Button>

              <Button className="bg-black hover:bg-gray-800 text-white px-8 py-6 rounded-md text-lg" onClick={()=> router.push("/pages/quizUpload")}>
                <ClipboardCheck className="mr-2 h-5 w-5" />
                Take Quiz
              </Button>
  
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
        

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="bg-black/5 w-12 h-12 flex items-center justify-center rounded-full mb-6">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Generate Reviewers</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Auto-generate Q&A from PDFs using Gemini API</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Upload and process multiple PDFs at once</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Edit and customize generated content</span>
                  </li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="bg-black/5 w-12 h-12 flex items-center justify-center rounded-full mb-6">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Take Personalized Quizzes</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Filter questions to customize quiz scope</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Skip questions you're unsure about</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Choose between text input or multiple choice</span>
                  </li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="bg-black/5 w-12 h-12 flex items-center justify-center rounded-full mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 2v4"></path>
                    <path d="M20 12h-4"></path>
                    <path d="M12 18v4"></path>
                    <path d="M4 12H0"></path>
                    <path d="M3.5 3.5l3 3"></path>
                    <path d="M17.5 17.5l3 3"></path>
                    <path d="M17.5 3.5l3 -3"></path>
                    <path d="M3.5 17.5l3 3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Track Performance</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Visual performance breakdown charts</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>See correct, wrong, and skipped answers</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Track progress over time</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>


       
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">© {new Date().getFullYear()} PDF Reviewer. All rights reserved.</p>
          <p className="text-gray-500 mt-2">
  
          </p>
        </div>
      </footer>
    </div>
  )
}

