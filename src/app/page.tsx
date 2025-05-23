'use client'

import { Button } from '@/components/ui/button'
import { Fingerprint } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const [scaning, setScaning] = useState(false)
  const router = useRouter()

  function handleStart() {
    setScaning(true)
    setTimeout(() => router.replace('/facescan'), 3000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-lg flex-col">
        <div className="mb-8 flex flex-col items-center gap-2.5">
          <h1 className="font-medium text-4xl">Polaris</h1>

          <h2 className="font-medium text-2xl text-muted-foreground">
            Find relevant data at lightning speed
          </h2>
        </div>

        {scaning && (
          <motion.div
            className="self-center overflow-hidden"
            initial={{ height: 0, marginBottom: 0 }}
            animate={{ height: 'auto', marginBottom: 32 }}
          >
            <Fingerprint className="size-24 animate-pulse text-muted-foreground" />
          </motion.div>
        )}

        <Button
          className="disabled:opacity-50"
          onClick={handleStart}
          disabled={scaning}
        >
          {scaning ? 'Loading Relevant Data' : 'Get Started'}
        </Button>
      </div>
    </div>
  )
}
