import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-display-mobile lg:text-heading-1 text-text-primary">
        Page not found
      </h1>

      <p className="mt-4 text-body-lg text-text-muted">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>

      <Link
        href="/"
        className="mt-8 text-body-lg text-text-accent hover:underline underline-offset-4 transition-colors duration-150"
      >
        Go home &rarr;
      </Link>
    </main>
  )
}
