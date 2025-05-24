'use client'

import { SendHorizontal } from 'lucide-react'
import { type FormEvent, useRef } from 'react'

interface MessageFormProps {
  enabled: boolean
  onSend: (text: string) => void
}

export function MessageForm({ enabled, onSend }: MessageFormProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const input = inputRef.current

    if (!input) {
      return
    }

    onSend(input.value)

    input.value = ''
  }

  return (
    <form
      className="flex w-full gap-2 rounded-2xl border border-neutral-950 bg-neutral-800 px-6 py-4"
      onSubmit={handleSubmit}
    >
      <input
        disabled={!enabled}
        ref={inputRef}
        className="flex-1 outline-none"
        placeholder="Send message..."
        type="text"
      />

      <button type="button">
        <SendHorizontal className="size-4" />
      </button>
    </form>
  )
}
