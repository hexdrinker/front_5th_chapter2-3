import PostListCardContent from "@/widgets/post/ui/PostListCardContent"
import PostListCardHeader from "@/features/post/ui/PostListCardHeader"
import { Card } from "@/shared/ui"

const PostListCard = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostListCardHeader />
      <PostListCardContent />
    </Card>
  )
}

export default PostListCard
