// Test file to run API functions without backend
// Run this to test your API functions with mock data

// Import the MOCK version for testing
import { getMembers, createMember, updateMemberStatus, deleteMember } from './services/memberApi.mock';

// To use REAL API when backend is ready, change to:
// import { getMembers, createMember, updateMemberStatus, deleteMember } from './api/memberApi';

async function testAPIs() {
  console.log('=== Testing Member APIs ===\n');

  try {
    // Test 1: Get all members
    console.log('1. Getting all members...');
    const members = await getMembers();
    console.log('✅ Success! Members:', members);
    console.log('');

    // Test 2: Create new member
    console.log('2. Creating new member...');
    const newMember = await createMember({
      name: 'Test User',
      email: 'test@example.com',
      status: 'Pending',
      role: 'Member',
      dues: 'Unpaid'
    });
    console.log('✅ Success! New member:', newMember);
    console.log('');

    // Test 3: Update member status
    console.log('3. Updating member status...');
    const updated = await updateMemberStatus(1, 'Active');
    console.log('✅ Success! Updated member:', updated);
    console.log('');

    // Test 4: Get members again to see changes
    console.log('4. Getting all members again...');
    const updatedMembers = await getMembers();
    console.log('✅ Success! Updated members:', updatedMembers);
    console.log('');

    // Test 5: Delete member
    console.log('5. Deleting member...');
    await deleteMember(2);
    console.log('✅ Success! Member deleted');
    console.log('');

    // Test 6: Final member list
    console.log('6. Final member list...');
    const finalMembers = await getMembers();
    console.log('✅ Success! Final members:', finalMembers);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the tests
testAPIs();
