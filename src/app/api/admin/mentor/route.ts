import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET mentor profile
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = await prisma.mentorProfile.findFirst();
    
    if (profile) {
      // Parse JSON strings back to arrays
      return NextResponse.json({
        ...profile,
        skills: JSON.parse(profile.skills || "[]"),
        experience: JSON.parse(profile.experience || "[]"),
        education: JSON.parse(profile.education || "[]"),
        certifications: JSON.parse(profile.certifications || "[]"),
        trainingPrograms: JSON.parse(profile.trainingPrograms || "[]"),
      });
    }
    
    return NextResponse.json(null);
  } catch (error) {
    console.error("Error fetching mentor profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

// POST create mentor profile
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { 
      name, designation, bio, skills, experience, education, 
      certifications, trainingPrograms, imageUrl, linkedinUrl, githubUrl 
    } = body;

    const profile = await prisma.mentorProfile.create({
      data: {
        name,
        designation,
        bio,
        skills: JSON.stringify(skills || []),
        experience: JSON.stringify(experience || []),
        education: JSON.stringify(education || []),
        certifications: JSON.stringify(certifications || []),
        trainingPrograms: JSON.stringify(trainingPrograms || []),
        imageUrl: imageUrl || null,
        linkedinUrl: linkedinUrl || null,
        githubUrl: githubUrl || null,
      },
    });

    return NextResponse.json({
      ...profile,
      skills: JSON.parse(profile.skills),
      experience: JSON.parse(profile.experience),
      education: JSON.parse(profile.education),
      certifications: JSON.parse(profile.certifications),
      trainingPrograms: JSON.parse(profile.trainingPrograms),
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating mentor profile:", error);
    return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
  }
}

// PUT update mentor profile
export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { 
      name, designation, bio, skills, experience, education, 
      certifications, trainingPrograms, imageUrl, linkedinUrl, githubUrl 
    } = body;

    // Get existing profile
    const existingProfile = await prisma.mentorProfile.findFirst();

    const data = {
      name,
      designation,
      bio,
      skills: JSON.stringify(skills || []),
      experience: JSON.stringify(experience || []),
      education: JSON.stringify(education || []),
      certifications: JSON.stringify(certifications || []),
      trainingPrograms: JSON.stringify(trainingPrograms || []),
      imageUrl: imageUrl || null,
      linkedinUrl: linkedinUrl || null,
      githubUrl: githubUrl || null,
    };

    let profile;
    if (!existingProfile) {
      // Create if doesn't exist
      profile = await prisma.mentorProfile.create({ data });
    } else {
      // Update existing
      profile = await prisma.mentorProfile.update({
        where: { id: existingProfile.id },
        data,
      });
    }

    return NextResponse.json({
      ...profile,
      skills: JSON.parse(profile.skills),
      experience: JSON.parse(profile.experience),
      education: JSON.parse(profile.education),
      certifications: JSON.parse(profile.certifications),
      trainingPrograms: JSON.parse(profile.trainingPrograms),
    }, existingProfile ? { status: 200 } : { status: 201 });
  } catch (error) {
    console.error("Error updating mentor profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
