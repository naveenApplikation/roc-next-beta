import BlogMeta from '@/BlogComponents/BlogMeta'
import * as demo from '@/lib/demo.data'
import { urlForImage } from '@/lib/sanity.image'
import { Post, Settings } from '@/lib/sanity.queries'
import Head from 'next/head'

export interface PostPageHeadProps {
  settings?: Settings
  post: Post
}

export default function PostPageHead({ settings, post }: PostPageHeadProps) {
  const title = settings?.title ?? demo.title
  return (
    <Head>
      <title>ROC - Latest from ROC</title>
      <BlogMeta />
      <meta property="og:title" content="Latest from ROC" />
      <meta
        property="og:description"
        content="Your one-stop-shop for Latest from #ROC.Explore our blog for expert advice and in-depth discussions"
      />
      <meta
        property="og:image"
        content="https://uploads-ssl.webflow.com/663f3f9d972cd11c025ff9da/6645d3c7372c8c830122d3d5_meta%20image.png"
      />

      <meta property="og:url" content="https://www.roc.je/" />
    </Head>
  );
}
