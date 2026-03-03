import Image from 'next/image'
import type { MDXComponents } from 'mdx/types'

// ---------- Custom Components ----------

interface CalloutProps {
  children: React.ReactNode
  type?: 'info' | 'warning'
}

function Callout({ children, type = 'info' }: CalloutProps) {
  const borderColor =
    type === 'warning' ? 'border-status-dev' : 'border-accent'

  return (
    <div
      className={`rounded-card border-l-4 ${borderColor} bg-background-elevated p-4 my-6`}
    >
      <div className="text-post-body-mobile lg:text-post-body text-text-secondary">
        {children}
      </div>
    </div>
  )
}

interface MDXImageProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

function MDXImage({
  src,
  alt,
  caption,
  width = 720,
  height = 400,
}: MDXImageProps) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-card"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-caption text-text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// ---------- MDX Components Map ----------

export const mdxComponents: MDXComponents = {
  // Custom components available in MDX
  Callout,
  Image: MDXImage,

  // Override default HTML elements
  h2: ({ children, ...props }) => (
    <h2
      className="text-post-h2-mobile lg:text-post-h2 text-text-primary mt-12 mb-4"
      {...props}
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3
      className="text-post-h3-mobile lg:text-post-h3 text-text-primary mt-8 mb-3"
      {...props}
    >
      {children}
    </h3>
  ),

  p: ({ children, ...props }) => (
    <p
      className="text-post-body-mobile lg:text-post-body text-text-secondary mb-6"
      {...props}
    >
      {children}
    </p>
  ),

  pre: ({ children, ...props }) => (
    <pre
      className="bg-background-elevated rounded-card p-4 font-mono text-caption overflow-x-auto my-6"
      {...props}
    >
      {children}
    </pre>
  ),

  code: ({ children, className, ...props }) => {
    // If className exists, this is a code block inside <pre> — don't add inline styles
    if (className) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
    // Inline code
    return (
      <code
        className="bg-background-elevated rounded px-1.5 py-0.5 font-mono text-caption text-text-accent"
        {...props}
      >
        {children}
      </code>
    )
  },

  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-2 border-border-DEFAULT pl-4 italic text-text-muted my-6"
      {...props}
    >
      {children}
    </blockquote>
  ),

  a: ({ children, href, ...props }) => {
    const isExternal = href?.startsWith('http')
    return (
      <a
        href={href}
        className="text-text-accent hover:underline"
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        {...props}
      >
        {children}
      </a>
    )
  },

  ul: ({ children, ...props }) => (
    <ul
      className="list-disc list-inside space-y-2 text-post-body-mobile lg:text-post-body text-text-secondary my-6 ml-4"
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol
      className="list-decimal list-inside space-y-2 text-post-body-mobile lg:text-post-body text-text-secondary my-6 ml-4"
      {...props}
    >
      {children}
    </ol>
  ),

  li: ({ children, ...props }) => (
    <li className="text-text-secondary" {...props}>
      {children}
    </li>
  ),

  hr: () => (
    <hr className="border-border-DEFAULT my-8" />
  ),
}
