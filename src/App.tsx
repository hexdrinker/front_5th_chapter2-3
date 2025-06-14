import { BrowserRouter as Router } from "react-router-dom"
import Header from "@/widgets/layout/ui/Header.tsx"
import Footer from "@/widgets/layout/ui/Footer.tsx"
import PostsManagerPage from "@/pages/post/ui/PostsManagerPage.tsx"
import { QueryClientProvider } from "@/app/providers/QueryClientProvider"

const App = () => {
  return (
    <Router>
      <QueryClientProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </QueryClientProvider>
    </Router>
  )
}

export default App
