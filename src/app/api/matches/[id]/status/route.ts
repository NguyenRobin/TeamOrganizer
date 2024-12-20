import { NextResponse } from 'next/server';
import { Types } from 'mongoose';
import { updateMatchStatus } from '../../../../../features/matches/server/actions/match';
import connectToMongoDB from '../../../../../mongoose/connectToMongoDB';

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: Types.ObjectId }> }
) {
  const params = await props.params;
  const match_id = params.id;
  try {
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({
        status: 400,
        message: 'body must include "status"',
      });
    }
    await connectToMongoDB();

    const updatedMatchStatusResponse = await updateMatchStatus(
      match_id,
      status
    );

    return NextResponse.json(updatedMatchStatusResponse);
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: 'Error updating a match',
      errorMsg: error,
    });
  }
}
