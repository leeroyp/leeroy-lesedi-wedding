# Quick Start Guide

## 🚀 Get Your Wedding Website Running in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up MongoDB

**Option A: Use MongoDB Atlas (Cloud - Recommended)**
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wedding-invite
   ```

**Option B: Use Local MongoDB**
1. Install MongoDB locally ([instructions](https://docs.mongodb.com/manual/installation/))
2. Start MongoDB:
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Or manually
   mongod
   ```
3. The default `.env.local` is already configured for local MongoDB

### Step 3: Add Your Guest List

Edit `scripts/seed.ts` and replace the sample guests with your actual guest list:

```typescript
const guests = [
  { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
  { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
  // Add all your guests here...
];
```

Then run:
```bash
, 
```

### Step 4: Start the Development Server
```bash
npm run dev
```

### Step 5: Test the Website

1. Open [http://localhost:3000](http://localhost:3000)
2. Try logging in with one of your seeded guests
3. Explore the wedding website
4. Test the RSVP form

### Step 6: View RSVPs (Admin)

Visit [http://localhost:3000/admin/rsvps](http://localhost:3000/admin/rsvps) to see all RSVP responses.

---

## 🎨 Customization Checklist

- [ ] Update bride and groom names throughout the site
- [ ] Change wedding date in:
  - `app/wedding/page.tsx`
  - `app/wedding/details/page.tsx`
- [ ] Update venue information in `app/wedding/details/page.tsx`
- [ ] Add your love story in `app/wedding/story/page.tsx`
- [ ] Replace placeholder emojis with real photos in `app/wedding/gallery/page.tsx`
- [ ] Update contact email addresses
- [ ] Add your guest list in `scripts/seed.ts`
- [ ] Customize colors in `tailwind.config.ts` (if desired)

---

## 📝 Testing Authentication

Use these sample credentials (after running seed script):
- **Name**: John Doe
- **Email**: john.doe@example.com

---

## 🚀 Ready to Deploy?

### Deploy to Vercel (Free & Easy)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variable:
   - `MONGODB_URI`: Your MongoDB connection string
5. Deploy!

Your wedding website will be live at `your-project.vercel.app`

---

## 🆘 Need Help?

### Common Issues

**Can't connect to MongoDB?**
- Check if MongoDB is running: `brew services list` (macOS)
- Verify your `MONGODB_URI` in `.env.local`

**Authentication not working?**
- Make sure you ran `npm run seed`
- Check that the guest names/emails match exactly

**Styles not loading?**
- Run `npm run build` to ensure Tailwind is compiled
- Clear browser cache and restart dev server

---

## 📧 Contact

For issues or questions, check the full README.md or contact the developers.

**Happy Wedding Planning! 💑**
