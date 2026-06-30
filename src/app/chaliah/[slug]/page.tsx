export default function ChaliahPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="brand-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold tracking-tight">Profil Chaliah</h1>
          <p className="text-white/80 mt-1">Slug: {params.slug}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl ring-1 ring-border p-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Profil du Chaliah (rabbin émissaire)</p>
            <p className="text-sm text-muted-foreground/70 mt-2">Informations personnelles, contact, Beth Habad associé</p>
          </div>
        </div>
      </div>
    </div>
  );
}
