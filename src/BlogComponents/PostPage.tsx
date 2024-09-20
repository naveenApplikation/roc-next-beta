import Container from '@/BlogComponents/BlogContainer'
import BlogHeader from '@/BlogComponents/BlogHeader'
import Layout from '@/BlogComponents/BlogLayout'
import MoreStories from '@/BlogComponents/MoreStories'
import PostBody from '@/BlogComponents/PostBody'
import PostHeader from '@/BlogComponents/PostHeader'
import PostPageHead from '@/BlogComponents/PostPageHead'
import PostTitle from '@/BlogComponents/PostTitle'
import SectionSeparator from '@/BlogComponents/SectionSeparator'
import * as demo from '@/lib/demo.data'
import type { Post, Settings } from '@/lib/sanity.queries'
import Error from 'next/error'

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  post: Post
  morePosts: Post[]
  settings?: Settings
}

const NO_POSTS: Post[] = []

export default function PostPage(props: PostPageProps) {
  const { preview, loading, morePosts = NO_POSTS, post, settings } = props
  const { title = demo.title } = settings || {}

  const slug = post?.slug

  if (!slug && !preview) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <PostPageHead settings={settings} post={post} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <BlogHeader title={title} level={2} />
          {preview && !post ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                />
                <PostBody content={post.content} />
              </article>
              <SectionSeparator />
              {morePosts?.length > 0 && <MoreStories posts={morePosts} />}
            </>
          )}
        </Container>
      </Layout>
    </>
  )
}
