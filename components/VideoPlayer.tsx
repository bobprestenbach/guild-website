'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    YT: typeof YT
    onYouTubeIframeAPIReady: () => void
    _ytAPICallbacks: Array<() => void>
    _ytAPILoading: boolean
  }
}

interface Props {
  videoId: string
  onComplete?: () => void
}

export default function VideoPlayer({ videoId, onComplete }: Props) {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let player: YT.Player

    function initPlayer() {
      if (!divRef.current) return
      player = new window.YT.Player(divRef.current, {
        videoId,
        playerVars: { rel: 0, modestbranding: 1, color: 'white' },
        events: {
          onStateChange(e: YT.OnStateChangeEvent) {
            if (e.data === window.YT.PlayerState.ENDED) {
              onComplete?.()
            }
          },
        },
      })
    }

    if (window.YT?.Player) {
      initPlayer()
    } else {
      if (!window._ytAPICallbacks) window._ytAPICallbacks = []
      window._ytAPICallbacks.push(initPlayer)

      if (!window._ytAPILoading) {
        window._ytAPILoading = true
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
        window.onYouTubeIframeAPIReady = () => {
          window._ytAPICallbacks.forEach(cb => cb())
          window._ytAPICallbacks = []
        }
      }
    }

    return () => {
      try { player?.destroy() } catch {}
    }
  }, [videoId, onComplete])

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
      <div ref={divRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
