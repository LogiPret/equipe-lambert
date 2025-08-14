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
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1)
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // This effect handles the "infinite" loop by invisibly resetting the index.
  useEffect(() => {
    // Only reset when we're near the boundaries, but give more buffer for user interactions
    const needsReset = currentIndex >= postsLength * 4.5 || currentIndex < postsLength * 0.5

    if (needsReset) {
      // We use requestAnimationFrame to ensure the style changes happen
      // in the right order to make the transition invisible.
      requestAnimationFrame(() => {
        if (containerRef.current) {
          // 1. Disable CSS transitions
          containerRef.current.style.transition = 'none'

          // 2. Calculate the new index that corresponds to the same visual frame
          let newIndex = currentIndex
          if (currentIndex >= postsLength * 4.5) {
            newIndex = currentIndex - postsLength * 2
          } else if (currentIndex < postsLength * 0.5) {
            newIndex = currentIndex + postsLength * 2
          }
          console.log('Resetting index from', currentIndex, 'to', newIndex)
          setCurrentIndex(newIndex)

          // 3. Re-enable CSS transitions after the index has been reset
          requestAnimationFrame(() => {
            if (containerRef.current) {
              containerRef.current.style.transition = ''
            }
          })
        }
      })
    }
  }, [currentIndex, postsLength])

  // Don't render if no posts
  if (!posts || posts.length === 0) {
    return (
      <section className="py-24 bg-secondarystatic">
        <div className="container mx-auto px-4 text-center">
          <p className="text-branding50">Aucun article à afficher pour le moment.</p>
        </div>
      </section>
    )
  }

  const goToSlide = (targetIndex: number) => {
    console.log('goToSlide called with:', targetIndex, 'current:', currentIndex)
    setCurrentIndex(postsLength * 2 + targetIndex)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    console.log('goToPrevious called, current:', currentIndex)
    setCurrentIndex((prev) => prev - 1)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    console.log('goToNext called, current:', currentIndex)
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
    if (diff === 2) return 'blur-[2px]'
    return 'blur-[3px]'
  }

  const getOpacityClass = (index: number) => {
    const diff = Math.abs(index - currentIndex)
    if (diff === 0) return 'opacity-100'
    if (diff === 1) return 'opacity-80'
    if (diff === 2) return 'opacity-40'
    return 'opacity-0'
  }

  // A robust way to get the actual index (0 to posts.length - 1)
  const getActualIndex = () => {
    return ((currentIndex % postsLength) + postsLength) % postsLength
  }

  return (
    <section className="py-24 bg-secondarystatic">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-branding100 h-1 w-24 mb-6"></div>
          <h2 className="text-5xl font-serif font-bold text-branding100 mb-6">{title}</h2>
          <p className="text-xl text-branding75 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Main Carousel */}
          <div className="relative h-[550px] flex items-center justify-center">
            <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
              {infinitePosts.map((post, index) => {
                const relativeIndex = index % postsLength
                const actualPost = posts[relativeIndex]

                return (
                  <div
                    key={`${actualPost.id}-${index}`}
                    className={`absolute w-80 h-[480px] transition-all duration-500 ease-in-out ${getSlidePosition(
                      index,
                    )} ${getBlurClass(index)} ${getOpacityClass(index)} ${
                      index === currentIndex ? 'cursor-pointer' : ''
                    }`}
                    style={{
                      transform: `translateX(calc(${
                        (index - currentIndex) * 85
                      }%)) scale(${index === currentIndex ? 1 : index === currentIndex - 1 || index === currentIndex + 1 ? 0.9 : 0.75})`,
                    }}
                    onClick={() => {
                      if (index === currentIndex) {
                        // Navigate to the post when clicking the center card
                        window.location.href = `/posts/${actualPost.slug}`
                      }
                    }}
                  >
                    <Card
                      className={`h-full shadow-xl transition-all duration-500 group overflow-hidden bg-branding0 ${
                        index === currentIndex
                          ? 'border border-borderprimarystatic hover:shadow-2xl hover:border-bordersecondarystatic transform hover:scale-105'
                          : 'border-0'
                      }`}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={actualPost.image.src}
                          alt={actualPost.image.alt}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-branding100 text-branding0 px-3 py-1 font-medium">
                            {actualPost.category}
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <CardContent className="p-6 flex flex-col justify-between min-h-[260px]">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-branding100 mb-3 line-clamp-2 leading-tight">
                            {actualPost.title}
                          </h3>
                          <p className="text-branding75 text-sm line-clamp-2 mb-3 leading-relaxed">
                            {actualPost.excerpt}
                          </p>
                          <div className="flex items-center text-xs text-branding50 mb-3 flex-wrap">
                            <User className="h-3 w-3 mr-1 text-branding100" />
                            <span className="mr-2 truncate">{actualPost.author}</span>
                            <Calendar className="h-3 w-3 mr-1 text-branding100" />
                            <span className="mr-2">{actualPost.date}</span>
                            <span className="text-branding100 font-medium">
                              {actualPost.readTime}
                            </span>
                          </div>
                        </div>
                        <div className="mt-auto pt-3">
                          {index === currentIndex ? (
                            <Link href={`/posts/${actualPost.slug}`} className="block">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-branding100 text-branding100 hover:bg-branding100 hover:text-branding0 cursor-pointer transition-all duration-300 group bg-transparent"
                              >
                                Lire l&apos;article
                                <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover:translate-x-1" />
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled
                              className="w-full border-branding100 text-branding100 opacity-50 cursor-not-allowed pointer-events-none transition-all duration-300 bg-transparent"
                            >
                              Lire l&apos;article
                              <ArrowRight className="h-3 w-3 ml-2" />
                            </Button>
                          )}
                        </div>
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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 text-branding100 bg-branding0 border border-borderprimarystatic shadow-lg rounded-full flex items-center justify-center hover:bg-branding100 hover:text-branding0 hover:border-bordersecondarystatic transition-all duration-300 backdrop-blur-sm"
            aria-label="Article précédent"
          >
            <ChevronLeft className="h-5 w-5" /> {}
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 text-branding100 bg-branding0 border border-borderprimarystatic shadow-lg rounded-full flex items-center justify-center hover:bg-branding100 hover:text-branding0 hover:border-bordersecondarystatic transition-all duration-300 backdrop-blur-sm"
            aria-label="Article suivant"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                getActualIndex() === index
                  ? 'bg-branding100 scale-125'
                  : 'bg-branding25 hover:bg-branding50'
              }`}
              aria-label={`Aller à l'article ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="flex justify-center items-center space-x-4 mt-8 mb-8">
          <div className="flex items-center text-sm text-branding50">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-branding50'}`}
            ></div>
            <span>{isAutoPlaying ? 'Lecture automatique' : 'Pause'}</span>
          </div>
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-sm text-branding100 hover:text-branding100 font-medium transition-colors"
          >
            {isAutoPlaying ? 'Pause' : 'Reprendre'}
          </button>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/posts">
            <Button
              size="lg"
              className="bg-branding100 hover:bg-branding100 text-branding0 px-8 py-4 font-medium text-lg transition-all duration-300 group"
            >
              Voir tous les articles
              <ArrowRight className="h-5 w-5 ml-3 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
