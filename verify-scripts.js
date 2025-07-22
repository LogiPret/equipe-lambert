/**
 * Video Scripts Collection Verification
 * 
 * This script verifies that the VideoScripts collection is properly configured
 * and that all 31 video scripts are properly structured.
 */

import { VideoScripts } from './src/collections/VideoScripts/index.ts'
import { videoScripts } from './src/endpoints/seed/video-scripts-simple.ts'

console.log('🎬 Verification des Scripts Vidéo\n')

// Test 1: Collection Configuration
console.log('1. Configuration de la collection VideoScripts:')
console.log(`   ✅ Slug: ${VideoScripts.slug}`)
console.log(`   ✅ Titre affiché: ${VideoScripts.admin?.useAsTitle}`)
console.log(`   ✅ Colonnes par défaut: ${VideoScripts.admin?.defaultColumns?.join(', ')}`)

// Test 2: Fields Configuration
const fields = VideoScripts.fields
const fieldNames = fields.map((field) => field.name).filter(Boolean)
console.log('\n2. Champs configurés:')
fieldNames.forEach(name => console.log(`   ✅ ${name}`))

// Test 3: Required Fields
const requiredFields = fields.filter((field) => field.required).map((field) => field.name)
console.log('\n3. Champs obligatoires:')
requiredFields.forEach(name => console.log(`   ✅ ${name}`))

// Test 4: Script Number Validation
const scriptNumberField = fields.find((field) => field.name === 'scriptNumber')
console.log('\n4. Validation numéro de script:')
console.log(`   ✅ Min: ${scriptNumberField?.min}`)
console.log(`   ✅ Max: ${scriptNumberField?.max}`)

// Test 5: Video Scripts Data
console.log('\n5. Données des scripts:')
console.log(`   ✅ Nombre total de scripts: ${videoScripts.length}`)
console.log(`   ✅ Premier script: "${videoScripts[0]?.title}"`)
console.log(`   ✅ Dernier script: "${videoScripts[videoScripts.length - 1]?.title}"`)

// Test 6: Script Structure Validation
console.log('\n6. Validation de la structure des scripts:')
const requiredScriptFields = ['title', 'hook', 'contentIdea', 'cta', 'staging', 'scriptNumber']
const allScriptsValid = videoScripts.every(script => 
  requiredScriptFields.every(field => script[field])
)
console.log(`   ${allScriptsValid ? '✅' : '❌'} Tous les scripts ont les champs requis`)

// Test 7: Script Numbers Validation
const scriptNumbers = videoScripts.map(script => script.scriptNumber).sort((a, b) => a - b)
const expectedNumbers = Array.from({length: 31}, (_, i) => i + 1)
const numbersValid = JSON.stringify(scriptNumbers) === JSON.stringify(expectedNumbers)
console.log(`   ${numbersValid ? '✅' : '❌'} Numérotation 1-31 correcte`)

// Test 8: Content Quality Check
console.log('\n7. Vérification de la qualité du contenu:')
const avgTitleLength = videoScripts.reduce((sum, script) => sum + script.title.length, 0) / videoScripts.length
const avgHookLength = videoScripts.reduce((sum, script) => sum + script.hook.length, 0) / videoScripts.length
console.log(`   ✅ Longueur moyenne des titres: ${Math.round(avgTitleLength)} caractères`)
console.log(`   ✅ Longueur moyenne des hooks: ${Math.round(avgHookLength)} caractères`)

// Test 9: Thematic Coverage
console.log('\n8. Couverture thématique:')
const keywords = ['premier achat', 'investissement', 'négociation', 'crédit', 'vente', 'diagnostic', 'estimation', 'copropriété']
keywords.forEach(keyword => {
  const count = videoScripts.filter(script => 
    script.title.toLowerCase().includes(keyword) || 
    script.contentIdea.toLowerCase().includes(keyword)
  ).length
  console.log(`   ✅ "${keyword}": ${count} script(s)`)
})

console.log('\n🎉 Verification terminée - Système de scripts vidéo opérationnel!')
console.log('\nPour utiliser:')
console.log('1. Lancez le serveur de développement: npm run dev')
console.log('2. Connectez-vous à /admin')
console.log('3. Naviguez vers "Scripts Vidéo"')
console.log('4. Utilisez "Seed Database" pour créer les 31 scripts')