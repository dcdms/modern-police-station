'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function Facescan() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream
      })
      .catch((error) => console.log(error))

    const timeout = setTimeout(() => {
      const stream = video.srcObject as MediaStream
      const tracks = stream.getTracks()

      for (const track of tracks) {
        track.stop()
      }

      router.replace('/considerations')
    }, 5000)

    return () => clearTimeout(timeout)
  }, [router.replace])

  return (
    <div className="flex min-h-screen items-center justify-center gap-8">
      {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
      <video
        ref={videoRef}
        className="w-full max-w-[32rem] rounded-md"
        autoPlay
        playsInline
      />

      <div className="flex max-w-lg flex-col font-medium text-base text-neutral-400">
        <div>
          <span className="text-white">Individual: </span>
          Davi Melo
        </div>

        <div>
          <span className="text-white">Birth Date: </span>
          01/08/2008
        </div>

        <div>
          <span className="text-white">SSN: </span>
          123-45-6789
        </div>

        <div>
          <span className="text-white">Address: </span>
          Sector 12, Alpha Zone - Neon District, Megacity 09
        </div>

        <div>
          <span className="text-white">Ocupation: </span>
          Software Engineer
        </div>

        <div>
          <span className="text-white">Nacionality: </span>
          Brazilian
        </div>

        <div>
          <span className="text-white">Criminal Record: </span>
          None
        </div>

        <div>
          <span className="text-white">Last Known Location: </span>
          Neon District, Surveillance Grid 7B
        </div>

        <div>
          <span className="text-white">Wanted Status: </span>
          Not Listed
        </div>

        <div>
          <span className="text-white">Threat Level: </span>
          Low
        </div>

        <div>
          <span className="text-white">Surveillance Priority: </span>
          Tier 4 (Routine Monitoring)
        </div>

        <div>
          <span className="text-white">Last Surveillance Check: </span>
          23/05/2025 - 14:37 UTC
        </div>

        <div>
          <span className="text-white">Communication Logs: </span>
          Monitored - Encrypted Traffic Detected
        </div>
      </div>
    </div>
  )
}
