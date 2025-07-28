import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <div className="relative h-[34px] w-[15rem] flex items-center">
      {/* eslint-disable @next/next/no-img-element */}
      <img
        alt="Equipe Lambert Logo"
        width={224}
        height={150}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx(
          'absolute top-1/2 left-0 -translate-y-1/2 w-auto h-[150px] object-contain z-10',
          className,
        )}
        src="/logo_equipe_lambert.png"
      />
    </div>
  )
}
