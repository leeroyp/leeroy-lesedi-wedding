# Lesedi & Leeroy Wedding Invitation Website

A beautiful, elegant wedding invitation website with guest authentication and RSVP functionality.

## Features

- 🔐 **Guest Authentication**: Only invited guests can access the wedding website
- 💑 **Multiple Pages**: Home, Our Story, Details, Gallery, and RSVP
- 📝 **RSVP System**: Guests can RSVP with plus-one functionality
- 🎨 **Elegant Design**: Sand + Navy + White color scheme with smooth animations
- 📱 **Fully Responsive**: Works beautifully on all devices
- 💾 **MongoDB Database**: Secure storage of guest list and RSVPs

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: MongoDB with Mongoose
- **Deployment**: Can be deployed to Vercel, Netlify, or any Node.js hosting

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally or a MongoDB Atlas account

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   
   Update the `.env.local` file with your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/wedding-invite
   # or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wedding-invite
   ```

3. **Start MongoDB** (if using local installation):
   ```bash
   # On macOS with Homebrew:
   brew services start mongodb-community
   
   # Or start manually:
   mongod
   ```

4. **Seed the database with guest list**:
   ```bash
   npm run seed
   ```
   
   This will add sample guests. Edit `scripts/seed.ts` to add your actual guest list.

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Adding Guests to the Whitelist

### Option 1: Using the Seed Script

Edit `scripts/seed.ts` and add your guests:

```typescript
const guests = [
  { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
  { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
  // Add more guests...
];
```

Then run:
```bash
npm run seed
```

### Option 2: Using the API

You can also add guests programmatically using the API:

```bash
curl -X POST http://localhost:3000/api/guests \
  -H "Content-Type: application/json" \
  -d '{
    "guests": [
      { "firstName": "John", "lastName": "Doe", "email": "john.doe@example.com" },
      { "firstName": "Jane", "lastName": "Smith", "email": "jane.smith@example.com" }
    ]
  }'
```

### Option 3: Manual Database Entry

Connect to MongoDB directly and add guests to the `guests` collection.

## Authentication

Guests can authenticate using either:
- **First Name + Last Name**: Case-insensitive matching
- **Email Address**: Must match exactly (case-insensitive)

Only guests in the whitelist can access the wedding website.

## Viewing RSVPs

To view all submitted RSVPs, make a GET request to the API:

```bash
curl http://localhost:3000/api/rsvp
```

Or create an admin page to view RSVPs in the browser.

## Customization

### Update Wedding Details

Edit the following files to customize your wedding details:

- **Names**: Search and replace "Lesedi" and "Leeroy" throughout the project
- **Date**: Update in `/app/wedding/page.tsx` and `/app/wedding/details/page.tsx`
- **Venue**: Update in `/app/wedding/details/page.tsx`
- **Colors**: Modify Tailwind config in `tailwind.config.ts`
- **Story**: Edit `/app/wedding/story/page.tsx` with your actual love story

### Styling

The color scheme is defined in `tailwind.config.ts`:
- Sand tones: `sand-50` through `sand-900`
- Navy tones: `navy-50` through `navy-900`
- White backgrounds

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean
- AWS

## Project Structure

```
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/login/      # Authentication endpoint
│   │   ├── guests/          # Guest management
│   │   └── rsvp/            # RSVP submission
│   ├── wedding/             # Main wedding pages (protected)
│   │   ├── details/         # Wedding details
│   │   ├── gallery/         # Photo gallery
│   │   ├── rsvp/            # RSVP form
│   │   └── story/           # Love story
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page (authentication)
├── components/
│   └── Navigation.tsx       # Navigation component
├── lib/
│   └── mongodb.ts           # Database connection
├── models/
│   ├── Guest.ts             # Guest model
│   └── RSVP.ts              # RSVP model
└── scripts/
    └── seed.ts              # Database seeding script
```

## Security Notes

- The current authentication is basic. For production, consider adding:
  - JWT tokens for session management
  - Rate limiting on API endpoints
  - CAPTCHA on the login form
  - Admin authentication for viewing RSVPs

## Support

For issues or questions, please contact the developers or open an issue in the repository.

## License

This project is private and intended for personal use.

---

Made with ❤️ for Lesedi & Leeroy's Special Day
