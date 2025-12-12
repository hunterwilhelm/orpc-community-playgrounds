import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { minifyContractRouter } from '@orpc/contract'
import { appRouter } from './router'

export function generateContract() {
  const router = appRouter()
  const contract = minifyContractRouter(router)
  
  // Write to frontend directory
  const outputPath = join(import.meta.dir, '../../front/src/api/contract.json')
  writeFileSync(outputPath, JSON.stringify(contract, null, 2))
  
  console.log('✅ Contract generated at:', outputPath)
  console.log('📋 Contract contains:')
  console.log('   - Routes:', Object.keys(contract).length)
}

// Run when executed directly
if (import.meta.main) {
  generateContract()
}

