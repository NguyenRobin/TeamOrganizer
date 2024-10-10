import { NextResponse } from "next/server";
import { updateMatchTeamScore } from "../../../../../../lib/server/collections/match";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    console.log(body);
    const { homeTeam, awayTeam } = body;

    if (!homeTeam && !awayTeam) {
      return NextResponse.json({
        status: 400,
        message: 'body must include "homeTeam" OR "awayTeam"',
      });
    }

    const teamWhoScored = homeTeam ? "homeTeam" : "awayTeam";
    const score = homeTeam ? homeTeam : awayTeam;

    const updatedMatchResults = await updateMatchTeamScore(
      params.id,
      teamWhoScored,
      score
    );

    return NextResponse.json({
      status: 200,
      updatedMatchResults,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: "Error updating a match",
      errorMsg: error,
    });
  }
}
