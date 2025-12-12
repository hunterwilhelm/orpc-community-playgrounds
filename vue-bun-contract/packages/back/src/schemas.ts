import * as z from 'zod'

// User schemas
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
})

export const NewUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

// Planet schemas
export const PlanetSchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  creator: UserSchema,
})

export const NewPlanetSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  image: z.any().optional(),
})

export const UpdatePlanetSchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
  description: z.string().optional(),
  image: z.any().optional(),
})

// Types
export type User = z.infer<typeof UserSchema>
export type NewUser = z.infer<typeof NewUserSchema>
export type Planet = z.infer<typeof PlanetSchema>
export type NewPlanet = z.infer<typeof NewPlanetSchema>
export type UpdatePlanet = z.infer<typeof UpdatePlanetSchema>

