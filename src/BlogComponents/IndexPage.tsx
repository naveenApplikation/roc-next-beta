import Container from '@/BlogComponents/BlogContainer'
import BlogHeader from '@/BlogComponents/BlogHeader'
import Layout from '@/BlogComponents/BlogLayout'
import HeroPost from '@/BlogComponents/HeroPost'
import IndexPageHead from '@/BlogComponents/IndexPageHead'
import MoreStories from '@/BlogComponents/MoreStories'
import IntroTemplate from '@/intro-template'
import * as demo from '@/lib/demo.data'
import type { Post, Settings } from '@/lib/sanity.queries'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, settings } = props
  const [heroPost, ...morePosts] = posts || []
  const { title = demo.title, description = demo.description } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <BlogHeader title={title} level={1} />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}
