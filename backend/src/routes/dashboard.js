const express = require('express')
const router  = express.Router()
const prisma  = require('../lib/prisma')
const { protect } = require('../middleware/auth')
const { getUserStats } = require('../utils/gamification')

router.use(protect)

// GET /api/dashboard
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id

    // ── Auto-Expire logic ────────────────────────────────────────────────
    const now = new Date();
    const pendingToComplete = await prisma.appointment.findMany({
      where: {
        patientId: userId,
        status: { in: ['CONFIRMED', 'PENDING'] },
      }
    });
    
    const expiredIds = pendingToComplete
      .filter(a => new Date(a.scheduledAt.getTime() + (a.durationMins || 50) * 60000) < now)
      .map(a => a.id);

    if (expiredIds.length > 0) {
      await prisma.appointment.updateMany({
        where: { id: { in: expiredIds } },
        data: { status: 'COMPLETED' }
      });
    }

    // Use centralized stats (streak, totalPoints, etc)
    const [
      stats,
      recentMoods,
      upcomingAppointments,
      currentUser,
      userBadges,
      notifications,
      unreadCount
    ] = await Promise.all([
      getUserStats(userId).catch(err => {
        console.error('Stats fetch failed:', err)
        return { streak: 0, totalPoints: 0, moodLogs: 0 }
      }),
      prisma.moodLog.findMany({
        where:   { userId },
        orderBy: { loggedAt: 'desc' },
        take:    7,
        include: { moodTags: { include: { tag: true } } }
      }).catch(err => []),
      prisma.appointment.findMany({
        where: {
          patientId:   userId,
          status:      { in: ['PENDING', 'CONFIRMED'] },
          scheduledAt: { gte: new Date() }
        },
        orderBy: { scheduledAt: 'asc' },
        take:    3,
        include: {
          psychologist: {
            include: { user: { select: { firstName: true, lastName: true, avatarUrl: true } } }
          },
          slot: true
        }
      }).catch(err => []),
      prisma.user.findUnique({
        where: { id: userId },
        select: { firstName: true, avatarUrl: true }
      }).catch(err => null),
      prisma.userBadge.findMany({
        where:   { userId },
        include: { badge: true },
        orderBy: { earnedAt: 'desc' }
      }).catch(err => []),
      prisma.notification.findMany({
        where:   { userId },
        orderBy: { createdAt: 'desc' },
        take:    20
      }).catch(err => []),
      prisma.notification.count({
        where: { userId, isRead: false }
      }).catch(err => 0)
    ])

    res.json({
      streak: stats.streak || 0,
      totalPoints: stats.totalPoints || 0,
      firstName: currentUser?.firstName || '',
      avatarUrl: currentUser?.avatarUrl || null,
      recentMoods,
      upcomingAppointments,
      userBadges,
      notifications,
      unreadCount
    })

  } catch (err) {
    console.error('[GET /dashboard] Full Error:', err)
    res.status(500).json({ error: 'Could not load dashboard data.', details: err.message })
  }
})

// ... (remaining Mark Read / Clear All / notifications routes)

// PUT /api/dashboard/notifications/mark-read
router.put('/notifications/mark-read', async (req, res) => {
  try {
    const prisma = require('../lib/prisma')
    await prisma.notification.updateMany({
      where: { userId: req.user.id, isRead: false },
      data:  { isRead: true, readAt: new Date() }
    })
    res.json({ message: 'Notifications marked as read.' })
  } catch (err) {
    res.status(500).json({ error: 'Could not update notifications.' })
  }
})

// DELETE /api/dashboard/notifications/clear-all
router.delete('/notifications/clear-all', async (req, res) => {
  try {
    const prisma = require('../lib/prisma')
    await prisma.notification.deleteMany({
      where: { userId: req.user.id }
    })
    res.json({ message: 'Notifications cleared.' })
  } catch (err) {
    res.status(500).json({ error: 'Could not clear notifications.' })
  }
})

// GET /api/dashboard/notifications
router.get('/notifications', async (req, res) => {
  try {
    const prisma = require('../lib/prisma')
    const notifications = await prisma.notification.findMany({
      where:   { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take:    20
    })
    const unreadCount = await prisma.notification.count({
      where: { userId: req.user.id, isRead: false }
    })
    res.json({ notifications, unreadCount })
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch notifications.' })
  }
})

module.exports = router
