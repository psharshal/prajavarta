import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Super admin
  const passwordHash = await bcrypt.hash('Admin@123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@prajavarta.com' },
    update: {},
    create: {
      email: 'admin@prajavarta.com',
      passwordHash,
      name: 'सुपर अॅडमिन',
      nameEnglish: 'Super Admin',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  })
  console.log('Super admin:', admin.email)

  // Top-level categories
  const categoryData = [
    { name: 'महाराष्ट्र',  nameEnglish: 'maharashtra',  slug: 'maharashtra',  sortOrder: 1 },
    { name: 'देश',         nameEnglish: 'desh',          slug: 'desh',         sortOrder: 2 },
    { name: 'जग',          nameEnglish: 'jag',           slug: 'jag',          sortOrder: 3 },
    { name: 'राजकीय',      nameEnglish: 'politics',      slug: 'politics',     sortOrder: 4 },
    { name: 'क्रीडा',      nameEnglish: 'sports',        slug: 'sports',       sortOrder: 5 },
    { name: 'मनोरंजन',     nameEnglish: 'entertainment', slug: 'entertainment',sortOrder: 6 },
    { name: 'व्यापार',     nameEnglish: 'business',      slug: 'business',     sortOrder: 7 },
    { name: 'शिक्षण',      nameEnglish: 'education',     slug: 'education',    sortOrder: 8 },
    { name: 'आरोग्य',      nameEnglish: 'health',        slug: 'health',       sortOrder: 9 },
    { name: 'तंत्रज्ञान',  nameEnglish: 'technology',    slug: 'technology',   sortOrder: 10 },
    { name: 'गुन्हेगारी',  nameEnglish: 'crime',         slug: 'crime',        sortOrder: 11 },
    { name: 'हवामान',      nameEnglish: 'weather',       slug: 'weather',      sortOrder: 12 },
  ]

  for (const cat of categoryData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { ...cat, isActive: true },
    })
  }
  console.log('Categories seeded:', categoryData.length)

  // Maharashtra districts
  const districts = [
    { name: 'पुणे',        nameEnglish: 'Pune' },
    { name: 'मुंबई',       nameEnglish: 'Mumbai' },
    { name: 'नागपूर',      nameEnglish: 'Nagpur' },
    { name: 'नाशिक',       nameEnglish: 'Nashik' },
    { name: 'औरंगाबाद',   nameEnglish: 'Aurangabad' },
    { name: 'सोलापूर',    nameEnglish: 'Solapur' },
    { name: 'कोल्हापूर',  nameEnglish: 'Kolhapur' },
    { name: 'सांगली',     nameEnglish: 'Sangli' },
    { name: 'सातारा',     nameEnglish: 'Satara' },
    { name: 'रत्नागिरी',  nameEnglish: 'Ratnagiri' },
    { name: 'अमरावती',    nameEnglish: 'Amravati' },
    { name: 'अकोला',      nameEnglish: 'Akola' },
    { name: 'वर्धा',       nameEnglish: 'Wardha' },
    { name: 'यवतमाळ',     nameEnglish: 'Yavatmal' },
    { name: 'बुलडाणा',    nameEnglish: 'Buldhana' },
    { name: 'वाशीम',      nameEnglish: 'Washim' },
    { name: 'चंद्रपूर',   nameEnglish: 'Chandrapur' },
    { name: 'गडचिरोली',  nameEnglish: 'Gadchiroli' },
    { name: 'भंडारा',     nameEnglish: 'Bhandara' },
    { name: 'गोंदिया',    nameEnglish: 'Gondia' },
    { name: 'जळगाव',     nameEnglish: 'Jalgaon' },
    { name: 'धुळे',       nameEnglish: 'Dhule' },
    { name: 'नंदुरबार',   nameEnglish: 'Nandurbar' },
    { name: 'अहमदनगर',   nameEnglish: 'Ahmednagar' },
    { name: 'पालघर',     nameEnglish: 'Palghar' },
    { name: 'रायगड',     nameEnglish: 'Raigad' },
    { name: 'सिंधुदुर्ग', nameEnglish: 'Sindhudurg' },
    { name: 'ठाणे',      nameEnglish: 'Thane' },
    { name: 'लातूर',     nameEnglish: 'Latur' },
    { name: 'नांदेड',    nameEnglish: 'Nanded' },
    { name: 'उस्मानाबाद',nameEnglish: 'Osmanabad' },
    { name: 'परभणी',     nameEnglish: 'Parbhani' },
    { name: 'हिंगोली',   nameEnglish: 'Hingoli' },
    { name: 'बीड',       nameEnglish: 'Beed' },
    { name: 'जालना',     nameEnglish: 'Jalna' },
  ]

  for (const d of districts) {
    const existing = await prisma.district.findFirst({ where: { nameEnglish: d.nameEnglish } })
    if (!existing) {
      await prisma.district.create({ data: d })
    }
  }
  console.log('Districts seeded:', districts.length)

  // Default site settings
  await prisma.setting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      appName:    'प्रजावार्ता',
      email:      'contact@prajavarta.com',
      website:    'https://prajavarta.com',
      contact:    '+91 00000 00000',
      author:     'Prajavarta Team',
    },
  })
  console.log('Settings seeded')

  console.log('\nDone! Admin login:')
  console.log('  Email:    admin@prajavarta.com')
  console.log('  Password: Admin@123')
  console.log('\nChange the password immediately after first login.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
