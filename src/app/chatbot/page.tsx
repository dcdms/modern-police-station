'use client'

import { useRef, useState } from 'react'
import { cnBase as cn } from 'tailwind-variants'
import { MessageForm } from './_components/message-form'

interface Message {
  id: number
  mine: boolean
  text: string
  actions: {
    id: number
    text: string
    onSelect?: () => void
  }[]
}

export default function Chatbot() {
  const task = useRef<
    'create_document' | 'create_bo' | 'finish_bo' | 'notify_individual' | null
  >(null)

  const [counter, setCounter] = useState(5)
  const [inputEnabled, setInputEnabled] = useState(true)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      mine: false,
      text: 'Oi, tudo bem? Hoje eu posso ser seu assistente digital. O que você precisa?',
      actions: [
        {
          id: 1,
          text: 'Criar um documento',
          onSelect: () => {
            task.current = 'create_document'

            setMessages((messages) => [
              ...messages,
              {
                id: counter,
                mine: false,
                text: 'Qual a finalidade do documento?',
                actions: [],
              },
            ])

            setCounter((counter) => counter + 1)
          },
        },
        {
          id: 2,
          text: 'Abrir um boletim de ocorrência',
          onSelect: () => {
            task.current = 'create_bo'

            setMessages((messages) => [
              ...messages,
              {
                id: counter,
                mine: false,
                text: 'Qual o tipo da ocorrência',
                actions: [],
              },
            ])

            setCounter((counter) => counter + 1)
          },
        },
        {
          id: 3,
          text: 'Notificar um indivíduo',
          onSelect: () => {
            task.current = 'notify_individual'

            setMessages((messages) => [
              ...messages,
              {
                id: counter,
                mine: false,
                text: 'Qual o motivo da notificação?',
                actions: [],
              },
            ])

            setCounter((counter) => counter + 1)
          },
        },
        {
          id: 4,
          text: ' Fazer reconhecimento facial',
          onSelect: () => {
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then((stream) => {
                setMessages((messages) => [
                  ...messages,
                  {
                    id: counter,
                    mine: false,
                    text: 'Posicione o rosto na câmera...',
                    actions: [],
                  },
                ])

                setTimeout(() => {
                  setMessages((messages) => [
                    ...messages,
                    {
                      id: counter + 1,
                      mine: false,
                      text: 'Dados importados e aplicados.',
                      actions: [],
                    },
                  ])

                  const tracks = stream.getTracks()

                  for (const track of tracks) {
                    track.stop()
                  }
                }, 5000)
              })
              .catch(() => {
                setMessages((messages) => [
                  ...messages,
                  {
                    id: counter + 1,
                    mine: false,
                    text: 'Erro ao acessar a câmera.',
                    actions: [],
                  },
                ])
              })
              .finally(() => {
                setCounter((counter) => counter + 2)
              })
          },
        },
      ],
    },
  ])

  function handleSendMessage(text: string) {
    setMessages((messages) => [
      ...messages,
      {
        id: counter,
        mine: true,
        text,
        actions: [],
      },
    ])

    if (task.current === 'create_document') {
      setMessages((messages) => [
        ...messages,
        {
          id: counter + 1,
          mine: false,
          text: 'Documento finalizado com sucesso.',
          actions: [
            { id: counter + 2, text: 'Imprimir' },
            { id: counter + 3, text: 'Compartilhar' },
          ],
        },
      ])

      setCounter((counter) => counter + 4)

      return
    }

    if (task.current === 'create_bo') {
      task.current = 'finish_bo'

      setMessages((messages) => [
        ...messages,
        {
          id: counter + 1,
          mine: false,
          text: 'Descreva brevemente o ocorrido.',
          actions: [],
        },
      ])

      setCounter((counter) => counter + 2)

      return
    }

    if (task.current === 'finish_bo') {
      setMessages((messages) => [
        ...messages,
        {
          id: counter + 1,
          mine: false,
          text: 'BO gerado com sucesso.',
          actions: [],
        },
      ])

      setCounter((counter) => counter + 2)

      return
    }

    if (task.current === 'notify_individual') {
      setMessages((messages) => [
        ...messages,
        {
          id: counter + 1,
          mine: false,
          text: 'Documento enviado por email.',
          actions: [],
        },
      ])

      setCounter((counter) => counter + 2)

      return
    }
  }

  return (
    <div className="relative flex min-h-screen justify-center px-4 py-8">
      <ul className="flex w-[min(48rem,_100%_-_0.5rem)] flex-col gap-4">
        {messages.map((message) => (
          <li
            key={message.id}
            className={cn(
              'flex w-full max-w-md flex-col gap-2',
              message.mine && 'self-end',
            )}
          >
            <div className="rounded-xl border border-neutral-950 bg-neutral-800 p-4">
              {message.text}
            </div>

            {message.actions.length > 0 && (
              <ul className="grid grid-cols-2 gap-1.5">
                {message.actions.map((action) => (
                  <button
                    key={action.id}
                    type="button"
                    className="rounded-lg bg-neutral-700 p-2 text-start"
                    onClick={action.onSelect}
                  >
                    {action.text}
                  </button>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="-translate-x-1/2 fixed bottom-4 left-1/2 w-[min(48rem,_100%_-_0.5rem)]">
        <MessageForm enabled={inputEnabled} onSend={handleSendMessage} />
      </div>
    </div>
  )
}
