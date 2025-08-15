import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'

export default async function PDFListPage() {
  const payload = await getPayload({ config })

  const pdfs = await payload.find({
    collection: 'pdf',
    limit: 100,
    sort: '-createdAt',
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Documents PDF</h1>

      {pdfs.docs.length === 0 ? (
        <p className="text-gray-600">Aucun document PDF disponible.</p>
      ) : (
        <div className="grid gap-6">
          {pdfs.docs.map((pdf) => (
            <div
              key={pdf.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{pdf.title}</h2>

              {pdf.description && (
                <div className="text-gray-600 mb-4 prose prose-sm">
                  {/* You might want to render the rich text properly */}
                  <p>Description disponible</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span>Fichier: {pdf.filename}</span>
                  {pdf.filesize && (
                    <span className="ml-2">Taille: {Math.round(pdf.filesize / 1024)} KB</span>
                  )}
                </div>

                <Link
                  href={`/pdf/${pdf.slug}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ouvrir PDF
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
