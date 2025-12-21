import { Member, StatusType } from '../pages/Admin2';


const mockMembers: Member[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Proposed', role: 'President', dues: 'Completed' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending', role: 'Secretary', dues: 'Pending' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Completed', role: 'Treasurer', dues: 'N/A' },
];


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getMembers = async () => {
  await delay(500); 
  console.log('Mock: Fetching members...');
  return mockMembers;
};

export const createMember = async (memberData: Omit<Member, 'id'>) => {
  await delay(500);
  const newMember = {
    id: mockMembers.length + 1,
    ...memberData
  };
  mockMembers.push(newMember);
  console.log('Mock: Created member:', newMember);
  return newMember;
};

export const updateMemberStatus = async (id: number, status: StatusType) => {
  await delay(500);
  const member = mockMembers.find(m => m.id === id);
  if (member) {
    member.status = status;
    console.log('Mock: Updated member:', member);
    return member;
  }
  throw new Error('Member not found');
};

export const deleteMember = async (id: number) => {
  await delay(500);
  const index = mockMembers.findIndex(m => m.id === id);
  if (index !== -1) {
    mockMembers.splice(index, 1);
    console.log('Mock: Deleted member with id:', id);
  }
};
