import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Considerations() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="flex max-w-md flex-col items-center gap-6">
        <h1 className="font-medium text-3xl">Ethan Varela</h1>

        <div className="relative size-40 overflow-hidden rounded-md">
          <Image src="/example-individual.jpg" alt="" fill />
        </div>

        <p className="text-center font-medium text-2xl text-neutral-400">
          Suspeito sob vigilância, masculino, aproximadamente 32 anos de idade,
          visto ultimamente perto de casa às 10 PM.
        </p>

        <Button className="self-stretch">
          Images Recentes
        </Button>
        
        <Button className="self-stretch">
          Familiares e Pessoas Relacionadas
        </Button>
      </div>
    </div>
  )
}
