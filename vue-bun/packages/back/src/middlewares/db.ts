import type { NewPlanet, Planet, UpdatePlanet } from '../schemas/planet'
import type { User } from '../schemas/user'
import { os } from '@orpc/server'

export interface DB {
  planets: {
    find: (id: number) => Promise<Planet | undefined>
    list: (limit: number, cursor: number) => Promise<Planet[]>
    create: (newPlanet: NewPlanet, creator: User) => Promise<Planet>
    update: (updatePlanet: UpdatePlanet) => Promise<Planet>
  }
}

export const dbProviderMiddleware = os
  .$context<{ db?: DB }>()
  .middleware(async ({ context, next }) => {
    const db: DB = context.db ?? createFakeDB()
    return next({ context: { db } })
  })

const planets: Planet[] = [
  { id: 1, name: 'Earth', description: 'The planet Earth', imageUrl: 'https://picsum.photos/200/300', creator: { id: '1', name: 'John Doe', email: 'john@doe.com' } },
  { id: 2, name: 'Mars', description: 'The planet Mars', imageUrl: 'https://picsum.photos/200/300', creator: { id: '1', name: 'John Doe', email: 'john@doe.com' } },
  { id: 3, name: 'Jupiter', description: 'The planet Jupiter', imageUrl: 'https://picsum.photos/200/300', creator: { id: '1', name: 'John Doe', email: 'john@doe.com' } },
]

export function createFakeDB(): DB {
  return {
    planets: {
      find: async id => planets.find(p => p.id === id),
      list: async (limit, cursor) => planets.slice(cursor, cursor + limit),
      create: async (newPlanet, creator) => {
        const id = planets.length + 1
        const imageUrl = newPlanet.image ? `https://example.com/cdn/${(newPlanet.image as File).name}` : undefined
        const planet: Planet = { id, name: newPlanet.name, description: newPlanet.description, imageUrl, creator }
        planets.push(planet)
        return planet
      },
      update: async (planet) => {
        const index = planets.findIndex(p => p.id === planet.id)
        if (index === -1)
          throw new Error('Planet not found')
        planets[index] = { ...planets[index]!, ...planet, imageUrl: planet.image ? `https://example.com/cdn/${(planet.image as File).name}` : planets[index]!.imageUrl }
        return planets[index]
      },
    },
  }
}
