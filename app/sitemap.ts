import { MetadataRoute } from 'next'
import { client } from '../tina/__generated__/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://imperviousgeneration.my.id'

  // Fetch all events for dynamic routes
  let eventRoutes: MetadataRoute.Sitemap = []
  if (process.env.TINA_TOKEN) {
    try {
      const events = await client.queries.eventConnection()
      eventRoutes = events.data.eventConnection.edges?.map((edge) => ({
        url: `${baseUrl}/blog/${edge?.node?._sys.filename}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })) ?? []
    } catch (error) {
      console.error('Sitemap error:', error)
    }
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...eventRoutes,
  ]
}
