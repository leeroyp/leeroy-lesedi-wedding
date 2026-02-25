import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { RSVP } from '@/models/RSVP';

export async function POST(request: NextRequest) {
  try {
    const { guestName, hasPlusOne, plusOneName, email, message, attending } = await request.json();

    if (!guestName) {
      return NextResponse.json(
        { error: 'Guest name is required' },
        { status: 400 }
      );
    }

    if (attending === undefined) {
      return NextResponse.json(
        { error: 'Please indicate if you will be attending' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Create new RSVP
    const rsvp = await RSVP.create({
      guestName,
      hasPlusOne: hasPlusOne || false,
      plusOneName: hasPlusOne ? plusOneName : undefined,
      email,
      message,
      attending,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'RSVP submitted successfully',
        rsvp: {
          id: rsvp._id,
          guestName: rsvp.guestName,
          attending: rsvp.attending,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json(
      { error: 'An error occurred while submitting your RSVP' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Get all RSVPs (for admin purposes)
    const rsvps = await RSVP.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      { 
        success: true,
        count: rsvps.length,
        rsvps,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching RSVPs' },
      { status: 500 }
    );
  }
}
