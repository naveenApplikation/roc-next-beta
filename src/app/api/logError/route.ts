// app/api/logError/route.ts
import { NextRequest, NextResponse } from "next/server";
import logger from "@/app/utils/logger";

export async function POST(req: NextRequest) {
  try {
    // Ensure request is being parsed correctly
    const body = await req.json();
    const { message, stack } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Log the error to the file using Winston
    logger.error(`Error: ${message}`, { stack });

    return NextResponse.json(
      { success: true, message: "Error logged successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
