import { useEffect, useState } from 'react';
import { getMembers, createMember, updateMemberStatus, deleteMember } from '../services/memberApi.mock';

export function TestApiPage() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, message]);
    console.log(message);
  };

  useEffect(() => {
    const testAPIs = async () => {
      addLog('=== Testing Member APIs ===\n');

      try {
        // Test 1: Get all members
        addLog('1. Getting all members...');
        const members = await getMembers();
        addLog('✅ Success! Members: ' + JSON.stringify(members, null, 2));
        addLog('');

        // Test 2: Create new member
        addLog('2. Creating new member...');
        const newMember = await createMember({
          name: 'Test User',
          email: 'test@example.com',
          status: 'Pending',
          role: 'Member',
          dues: 'Unpaid'
        });
        addLog('✅ Success! New member: ' + JSON.stringify(newMember, null, 2));
        addLog('');

        // Test 3: Update member status
        addLog('3. Updating member status...');
        const updated = await updateMemberStatus(1, 'Active');
        addLog('✅ Success! Updated member: ' + JSON.stringify(updated, null, 2));
        addLog('');

        // Test 4: Get members again to see changes
        addLog('4. Getting all members again...');
        const updatedMembers = await getMembers();
        addLog('✅ Success! Updated members: ' + JSON.stringify(updatedMembers, null, 2));
        addLog('');

        // Test 5: Delete member
        addLog('5. Deleting member...');
        await deleteMember(2);
        addLog('✅ Success! Member deleted');
        addLog('');

        // Test 6: Final member list
        addLog('6. Final member list...');
        const finalMembers = await getMembers();
        addLog('✅ Success! Final members: ' + JSON.stringify(finalMembers, null, 2));

      } catch (error) {
        addLog('❌ Error: ' + error);
      }
    };

    testAPIs();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>API Test Results</h1>
      <div style={{ 
        background: '#1e1e1e', 
        color: '#d4d4d4', 
        padding: '20px', 
        borderRadius: '5px',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        {logs.map((log, index) => (
          <div key={index} style={{ 
            marginBottom: '5px',
            whiteSpace: 'pre-wrap',
            color: log.includes('✅') ? '#4ec9b0' : log.includes('❌') ? '#f48771' : '#d4d4d4'
          }}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
