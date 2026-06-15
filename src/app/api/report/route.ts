import { NextRequest, NextResponse } from "next/server";

import { calculateReport } from "../../../services/shippingService";

export async function POST(
  req: NextRequest
) {
  const body = await req.json();

  const result =
    await calculateReport(
      body.startDate,
      body.endDate
    );

  return NextResponse.json(result);
}