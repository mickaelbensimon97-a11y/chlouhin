import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center">
      <div className="text-center">
        <p className="text-foreground font-medium mb-1">Beth Habad introuvable</p>
        <p className="text-sm text-muted-foreground mb-4">Ce centre n&apos;existe plus ou a été déplacé.</p>
        <Link href="/annuaire" className="text-primary text-sm hover:underline">
          Retour à l&apos;annuaire
        </Link>
      </div>
    </div>
  )
}
