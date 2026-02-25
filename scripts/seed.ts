import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wedding-invite';

// Sample guest list - Replace with your actual guests
const guests = [
  { firstName: 'Leeroy', lastName: 'Phili', email: 'leeroyphili@gmail.com' },
  { firstName: 'Phili', lastName: 'Leeroy', email: 'leeroyphili@phili-digital.com' },
  { firstName: 'Lesedi', lastName: 'Meswele', email: 'lesedimeswele@gmail.com' },

];

const GuestSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  isAuthenticated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');
    console.log(`📡 Connecting to MongoDB at: ${MONGODB_URI}`);

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get or create Guest model
    const Guest = mongoose.models.Guest || mongoose.model('Guest', GuestSchema);

    // Clear existing guests (optional - comment out if you want to keep existing data)
    await Guest.deleteMany({});
    console.log('🗑️  Cleared existing guests');

    // Insert new guests
    const result = await Guest.insertMany(guests);
    console.log(`✅ Successfully added ${result.length} guests to the database`);

    // Display the added guests
    console.log('\n📋 Guest List:');
    result.forEach((guest, index) => {
      console.log(`   ${index + 1}. ${guest.firstName} ${guest.lastName} (${guest.email})`);
    });

    console.log('\n✨ Database seeding completed successfully!');
    console.log('\n💡 You can now test the authentication with any of these guests.');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
