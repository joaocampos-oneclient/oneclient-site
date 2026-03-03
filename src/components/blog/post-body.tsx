interface PostBodyProps {
  children: React.ReactNode
}

export function PostBody({ children }: PostBodyProps) {
  return (
    <div className="text-post-body-mobile lg:text-post-body text-text-secondary space-y-6">
      {children}
    </div>
  )
}
