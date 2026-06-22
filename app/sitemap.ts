import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'https://thehospitalityguild.com'

  const jobs = await prisma.jobPost.findMany({
    where: { status: 'active', expiresAt: { gt: new Date() } },
    select: { createdAt: true },
    orderBy: { createdAt: 'desc' },
  })

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/join`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/community`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/jobs`, lastModified: jobs[0]?.createdAt ?? new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/signin`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  return staticPages
}
