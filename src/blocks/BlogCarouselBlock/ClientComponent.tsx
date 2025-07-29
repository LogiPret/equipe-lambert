'use client'
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Calendar, User, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Post, Media } from '@/payload-types'

interface BlogCarouselClientProps {
  title: string
  subtitle: string
  posts: Post[]
}

interface ProcessedPost {
  id: string
  title: string
  excerpt: string
  image: {
    src: string
    alt: string
  }
  author: string
  date: string
  category: string
  readTime: string
  slug: string
}

function processPost(post: Post): ProcessedPost {
  // Get featured image
  const heroImage = post.heroImage as Media | undefined
  const imageUrl =
    typeof heroImage === 'object' && heroImage?.url ? heroImage.url : '/placeholder.svg'
  const imageAlt = typeof heroImage === 'object' && heroImage?.alt ? heroImage.alt : post.title

  // Get author name
  const authorName =
    Array.isArray(post.populatedAuthors) && post.populatedAuthors.length > 0
      ? post.populatedAuthors[0]?.name || 'Anonymous'
      : 'Anonymous'

  // Format date
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Date non spécifiée'

  // Get category
  const category =
    Array.isArray(post.categories) && post.categories.length > 0
      ? typeof post.categories[0] === 'object'
        ? post.categories[0]?.title || 'Non classé'
        : 'Non classé'
      : 'Non classé'

  // Calculate read time (rough estimate)
  const wordCount = post.title.split(' ').length + (post.meta?.description?.split(' ').length || 0)
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  return {
    id: post.id.toString(),
    title: post.title,
    excerpt: post.meta?.description || 'Découvrez cet article passionnant...',
    image: {
      src: imageUrl,
      alt: imageAlt,
    },
    author: authorName,
    date: publishedDate,
    category,
    readTime: `${readTime} min de lecture`,
    slug: post.slug || '',
  }
}

export default function BlogCarouselClient({
  title,
  subtitle,
  posts: rawPosts,
}: BlogCarouselClientProps) {
  const posts = rawPosts.map(processPost)

  // React hooks must be called before any early returns
  const [currentIndex, setCurrentIndex] = useState(posts.length * 2)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Using 5 sets of posts creates a large buffer for seamless looping
  const infinitePosts = [...posts, ...posts, ...posts, ...posts, ...posts]
  const postsLength = posts.length

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || postsLength <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, postsLength])

  // This effect handles the "infinite" loop by invisibly resetting the index.
  useEffect(() => {
    if (postsLength <= 1) return

    const needsReset = currentIndex >= postsLength * 4 || currentIndex < postsLength

    if (needsReset) {
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = 'none'

          let newIndex = currentIndex
          if (currentIndex >= postsLength * 4) {
            newIndex = postsLength * 2
          } else if (currentIndex < postsLength) {
            newIndex = postsLength * 3 - 1
          }

          setCurrentIndex(newIndex)

          requestAnimationFrame(() => {
            if (containerRef.current) {
              containerRef.current.style.transition = 'transform 0.5s ease-in-out'
            }
          })
        }
      })
    }
  }, [currentIndex, postsLength])

  // Don't render if no posts
  if (!posts || posts.length === 0) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">Aucun article à afficher pour le moment.</p>
        </div>
      </section>
    )
  }

  const goToSlide = (targetIndex: number) => {
    setCurrentIndex(postsLength * 2 + targetIndex)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => prev - 1)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => prev + 1)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const getSlidePosition = (index: number) => {
    const diff = index - currentIndex
    if (diff === 0) return 'translate-x-0 scale-100 z-20'
    if (diff === 1) return 'translate-x-[85%] scale-90 z-10'
    if (diff === -1) return 'translate-x-[-85%] scale-90 z-10'
    if (diff === 2) return 'translate-x-[170%] scale-75 z-0'
    if (diff === -2) return 'translate-x-[-170%] scale-75 z-0'
    if (diff > 2) return 'translate-x-[300%] scale-75 z-0 opacity-0'
    if (diff < -2) return 'translate-x-[-300%] scale-75 z-0 opacity-0'
    return 'translate-x-[300%] scale-75 z-0 opacity-0'
  }

  const getBlurClass = (index: number) => {
    const diff = Math.abs(index - currentIndex)
    if (diff === 0) return ''
    if (diff === 1) return 'blur-[1px]'
    return 'blur-[2px]'
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0f3046] mb-6">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Main Carousel */}
          <div className="relative h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              {infinitePosts.map((post, index) => {
                const relativeIndex = index % postsLength
                const actualPost = posts[relativeIndex]

                return (
                  <div
                    key={`${actualPost.id}-${index}`}
                    className={`absolute w-80 h-96 transition-all duration-500 ease-in-out ${getSlidePosition(
                      index,
                    )} ${getBlurClass(index)}`}
                    style={{
                      transform: `translateX(calc(${
                        (index - currentIndex) * 85
                      }%)) scale(${index === currentIndex ? 1 : index === currentIndex - 1 || index === currentIndex + 1 ? 0.9 : 0.75})`,
                    }}
                  >
                    <Card className="h-full shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden border-0">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={actualPost.image.src}
                          alt={actualPost.image.alt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-[#0f3046] text-white hover:bg-[#0f3046]/90">
                            {actualPost.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6 h-48 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-[#0f3046] mb-3 line-clamp-2 group-hover:text-[#0f3046]/80 transition-colors">
                            {actualPost.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                            {actualPost.excerpt}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 mb-4 space-x-4">
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              <span>{actualPost.author}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{actualPost.date}</span>
                            </div>
                          </div>
                        </div>
                        {index === currentIndex && (
                          <div className="mt-auto">
                            <Link href={`/posts/${actualPost.slug}`} className="block">
                              <Button
                                variant="outline"
                                className="border-[#0f3046] text-[#0f3046] hover:bg-[#0f3046] hover:text-white transition-all duration-300 group bg-transparent"
                              >
                                Lire l&apos;article
                                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                              </Button>
                            </Link>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#0f3046] hover:text-white transition-all duration-300 group"
            aria-label="Article précédent"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#0f3046] hover:text-white transition-all duration-300 group"
            aria-label="Article suivant"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex % postsLength
                  ? 'bg-[#0f3046] scale-110'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller à l'article ${index + 1}`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link href="/posts">
            <Button
              size="lg"
              className="bg-[#0f3046] hover:bg-[#0f3046]/90 text-white px-8 py-3 transition-all duration-300 group"
            >
              Voir tous les articles
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
