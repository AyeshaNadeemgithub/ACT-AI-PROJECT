const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting complete database reset and seeding with realistic Pakistani names...')

  // ─── 1. DELETE EXISTING DATA (Reverse dependency order) ─────────────────────────
  console.log('🧹 Wiping existing tables...')
  await prisma.moodTag.deleteMany({})
  await prisma.moodLog.deleteMany({})
  await prisma.journalEntry.deleteMany({})
  await prisma.chatMessage.deleteMany({})
  await prisma.chatSession.deleteMany({})
  await prisma.message.deleteMany({})
  await prisma.conversation.deleteMany({})
  await prisma.appointmentNote.deleteMany({})
  await prisma.appointment.deleteMany({})
  await prisma.availabilitySlot.deleteMany({})
  await prisma.psychologist.deleteMany({})
  await prisma.patientIntake.deleteMany({})
  await prisma.reward.deleteMany({})
  await prisma.userBadge.deleteMany({})
  await prisma.notification.deleteMany({})
  await prisma.user.deleteMany({})
  console.log('✅ All existing data wiped.')

  // ─── 2. HASH COMMON PASSWORD ───────────────────────────────────────────────────
  const commonPassword = 'Password123'
  console.log(`🔑 Hashing default password "${commonPassword}" for all users...`)
  const passwordHash = await bcrypt.hash(commonPassword, 12)

  // ─── 3. SEED 5 PATIENTS (Pakistani Names) ──────────────────────────────────────
  console.log('👤 Seeding 5 patients (Pakistani Names)...')
  const patientsData = [
    { firstName: 'Zainab', lastName: 'Khan', email: 'zainab.khan@calmmind.com' },
    { firstName: 'Muhammad', lastName: 'Ali', email: 'muhammad.ali@calmmind.com' },
    { firstName: 'Fatima', lastName: 'Hassan', email: 'fatima.hassan@calmmind.com' },
    { firstName: 'Bilal', lastName: 'Siddiqui', email: 'bilal.siddiqui@calmmind.com' },
    { firstName: 'Kainat', lastName: 'Javed', email: 'kainat.javed@calmmind.com' }, // From project team
  ]

  for (const p of patientsData) {
    const user = await prisma.user.create({
      data: {
        firstName:    p.firstName,
        lastName:     p.lastName,
        email:        p.email,
        passwordHash,
        role:         'PATIENT',
        isVerified:   true,
        isActive:     true,
        timezone:     'asia-karachi',
      }
    })

    // Add Welcome Rewards & Notifications for patients
    await prisma.reward.create({
      data: {
        userId:       user.id,
        actionType:   'SIGNUP',
        pointsEarned: 50,
        description:  'Welcome to CalmMind! 🎉'
      }
    })
    await prisma.notification.create({
      data: {
        userId:  user.id,
        type:    'WELCOME',
        title:   'Welcome to CalmMind! 🌿',
        message: `Assalam-o-Alaikum ${p.firstName}! Your wellness journey starts now. Try logging your first mood today.`,
      }
    })
  }
  console.log('✅ 5 Patients seeded successfully.')

  // ─── 4. SEED 10 PSYCHOLOGISTS / THERAPISTS (Pakistani Names) ────────────────────
  console.log('🩺 Seeding 10 therapists (Pakistani Names)...')
  const therapistsData = [
    { firstName: 'Dr. Asma', lastName: 'Riaz', email: 'asma.riaz@calmmind.com', specialization: 'Anxiety & Depression' },
    { firstName: 'Dr. Tariq', lastName: 'Mahmood', email: 'tariq.mahmood@calmmind.com', specialization: 'CBT, Trauma & PTSD' },
    { firstName: 'Dr. Sadia', lastName: 'Bashir', email: 'sadia.bashir@calmmind.com', specialization: 'Family & Relationship Therapy' },
    { firstName: 'Dr. Kamran', lastName: 'Malik', email: 'kamran.malik@calmmind.com', specialization: 'Mindfulness & Stress Management' },
    { firstName: 'Dr. Nida', lastName: 'Rehman', email: 'nida.rehman@calmmind.com', specialization: 'Grief Support & Emotional Wellness' },
    { firstName: 'Dr. Faisal', lastName: 'Qureshi', email: 'faisal.qureshi@calmmind.com', specialization: 'Addiction & Substance Abuse' },
    { firstName: 'Dr. Hina', lastName: 'Yousaf', email: 'hina.yousaf@calmmind.com', specialization: 'Child & Adolescent Psychology' },
    { firstName: 'Dr. Sajid', lastName: 'Shah', email: 'sajid.shah@calmmind.com', specialization: 'Anger Management & Behavioral Therapy' },
    { firstName: 'Dr. Uzma', lastName: 'Butt', email: 'uzma.butt@calmmind.com', specialization: 'Eating Disorders & Self-Esteem' },
    { firstName: 'Dr. Haroon', lastName: 'Rasheed', email: 'haroon.rasheed@calmmind.com', specialization: 'Sleep Disorders & Health Psychology' },
  ]

  for (const t of therapistsData) {
    await prisma.user.create({
      data: {
        firstName:    t.firstName,
        lastName:     t.lastName,
        email:        t.email,
        passwordHash,
        role:         'PSYCHOLOGIST',
        isVerified:   true,
        isActive:     true,
        timezone:     'asia-karachi',
        psychologist: {
          create: {
            verificationType:   'DEGREE',
            verificationDetail: 'PMC Certified License',
            specialization:     t.specialization,
            languages:          ['English', 'Urdu'],
            avgRating:          4.8,
            totalReviews:       15,
            isApproved:         true, // Pre-approved so they can log in
            hourlyRate:         3000.00, // PKR
            sessionDurationMins:50,
          }
        }
      }
    })
  }
  console.log('✅ 10 Therapists seeded successfully.')

  // ─── 5. SEED 2 ADMINS (Pakistani Names & Actual Team Members) ──────────────────
  console.log('🔑 Seeding 2 admins (Team Members)...')
  const adminsData = [
    { firstName: 'Ayesha', lastName: 'Nadeem', email: 'ayesha.nadeem@calmmind.com' }, // From project team
    { firstName: 'Yousuf Hussain', lastName: 'Khan', email: 'yousuf.khan@calmmind.com' }, // From project team
  ]

  for (const a of adminsData) {
    await prisma.user.create({
      data: {
        firstName:    a.firstName,
        lastName:     a.lastName,
        email:        a.email,
        passwordHash,
        role:         'ADMIN',
        isVerified:   true,
        isActive:     true,
        timezone:     'asia-karachi',
      }
    })
  }
  console.log('✅ 2 Admins seeded successfully.')

  console.log('🎉 Seeding and database reset completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
