import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Guest } from '@/models/Guest';

// Add guests to whitelist
export async function POST(request: NextRequest) {
  try {
    const { guests } = await request.json();

    if (!guests || !Array.isArray(guests)) {
      return NextResponse.json(
        { error: 'Please provide an array of guests' },
        { status: 400 }
      );
    }

    await dbConnect();

    const createdGuests = await Guest.insertMany(guests);

    return NextResponse.json(
      { 
        success: true, 
        message: `${createdGuests.length} guests added to whitelist`,
        guests: createdGuests,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding guests:', error);
    return NextResponse.json(
      { error: 'An error occurred while adding guests' },
      { status: 500 }
    );
  }
}

// Get all guests
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const guests = await Guest.find({}).sort({ lastName: 1, firstName: 1 });

    return NextResponse.json(
      { 
        success: true,
        count: guests.length,
        guests,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching guests:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching guests' },
      { status: 500 }
    );
  }
}
