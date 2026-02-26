import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Guest } from '@/models/Guest';

export async function POST(request: NextRequest) {
  try {
    const { searchTerm } = await request.json();

    if (!searchTerm || !searchTerm.trim()) {
      return NextResponse.json(
        { error: 'Please provide your name or email' },
        { status: 400 }
      );
    }

    await dbConnect();

    const trimmedSearch = searchTerm.trim();
    let guest;
    
    // Check if it's an email (contains @)
    if (trimmedSearch.includes('@')) {
      // Search by email
      guest = await Guest.findOne({
        email: trimmedSearch.toLowerCase(),
      });
    } else {
      // Treat as name - split into parts
      const nameParts = trimmedSearch.split(/\s+/).filter((part: string) => part.length > 0);
      
      if (nameParts.length === 1) {
        // Single name - search in both first and last name
        const nameRegex = new RegExp(`^${nameParts[0]}$`, 'i');
        guest = await Guest.findOne({
          $or: [
            { firstName: nameRegex },
            { lastName: nameRegex }
          ]
        });
      } else if (nameParts.length >= 2) {
        // Multiple parts - treat first as firstName, last as lastName
        const firstName = nameParts[0];
        const lastName = nameParts[nameParts.length - 1];
        
        guest = await Guest.findOne({
          firstName: { $regex: new RegExp(`^${firstName}$`, 'i') },
          lastName: { $regex: new RegExp(`^${lastName}$`, 'i') },
        });
      }
    }

    if (guest) {
      // Update authentication status
      guest.isAuthenticated = true;
      await guest.save();

      return NextResponse.json(
        { 
          success: true, 
          message: 'Authentication successful',
          guest: {
            firstName: guest.firstName,
            lastName: guest.lastName,
            email: guest.email,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Sorry, we couldn\'t find you on the guest list. Please check your name or email.' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { error: 'An error occurred during authentication', detail: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
