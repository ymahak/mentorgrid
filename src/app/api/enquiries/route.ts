import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { enquirySchema } from "@/lib/validations";
import { sendEnquiryNotification, sendEnquiryConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validationResult = enquirySchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Validation failed", 
          details: validationResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Create the enquiry
    const enquiry = await prisma.enquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        courseInterested: data.courseInterested || null,
        education: data.education || null,
        learningGoals: data.learningGoals || null,
        message: data.message,
        type: "general",
      },
    });

    // Send email notifications (don't block the response)
    Promise.all([
      sendEnquiryNotification(data),
      sendEnquiryConfirmation(data),
    ]).catch((error) => {
      console.error("Error sending emails:", error);
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Enquiry submitted successfully",
        data: { id: enquiry.id }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const type = searchParams.get("type") || undefined;
    const isRead = searchParams.get("isRead");

    const where: Record<string, unknown> = {};
    if (type) where.type = type;
    if (isRead !== null && isRead !== undefined) {
      where.isRead = isRead === "true";
    }

    const [enquiries, total] = await Promise.all([
      prisma.enquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.enquiry.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: enquiries,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}
