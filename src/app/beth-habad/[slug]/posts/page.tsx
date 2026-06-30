export default function BethHabadPostsPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Annonces</h1>
          <p className="text-gray-600 mt-1">Beth Habad: {params.slug}</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center py-12">
            <p className="text-gray-500">Annonces et événements du Beth Habad</p>
            <p className="text-sm text-gray-400 mt-2">Horaires, cours, événements communautaires</p>
          </div>
        </div>
      </div>
    </div>
  );
}
