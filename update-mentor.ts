import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const mentor = await prisma.mentorProfile.findFirst();
  if (mentor) {
    const experience = JSON.parse(mentor.experience);
    if (experience[0]) {
      experience[0].period = "Sept 2025 - April 2026";
      experience[0].isCurrent = false;
    }
    await prisma.mentorProfile.update({
      where: { id: mentor.id },
      data: { experience: JSON.stringify(experience) }
    });
    console.log("Updated!");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
