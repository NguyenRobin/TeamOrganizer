import { NextResponse } from 'next/server';
import connectToMongoDB from '../../../mongoose/connectToMongoDB';
import TournamentModel from '../../../features/tournaments/models/Tournament';
import { TBodyTournament } from '../../../types/types';

import { createNewTournament } from '../../../features/tournaments/server/actions/tournament';

export async function GET(request: Request) {
  try {
    await connectToMongoDB();

    const tournaments = await TournamentModel.find({
      // user: Types.ObjectId.createFromHexString(userId),
    });

    return NextResponse.json({
      status: 200,
      message: 'success',
      result: tournaments.length,
      tournaments,
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

export async function POST(request: Request) {
  try {
    const body: TBodyTournament = await request.json();

    const response = await createNewTournament(body);
    console.log('response', response);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({
      status: error.status || 500,
      error: error.message,
      message:
        'Error creating a tournament from route handler /api/tournaments',
    });
  }
}
