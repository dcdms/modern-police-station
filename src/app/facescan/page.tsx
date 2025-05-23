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
          <span className="text-white">Nome: </span>
          Davi Melo
        </div>

        <div>
          <span className="text-white">Data de Nascimento: </span>
          01/08/2008
        </div>

        <div>
          <span className="text-white">CPF: </span>
          000.000.000-XX
        </div>

        <div>
          <span className="text-white">Endereço: </span>
          Setor 12, Zona Alfa - Distrito Neon
        </div>

        <div>
          <span className="text-white">Profissão: </span>
          Professor
        </div>

        <div>
          <span className="text-white">Nacionalidade: </span>
          Brasileiro
        </div>

        <div>
          <span className="text-white">Ficha Criminal: </span>
          Sem dados
        </div>

        <div>
          <span className="text-white">Visto por último em: </span>
          Distrito Nenon, Rua Sol da Tarde
        </div>

        <div>
          <span className="text-white">Risco: </span>
          Baixo
        </div>
      </div>
    </div>
  )
}
