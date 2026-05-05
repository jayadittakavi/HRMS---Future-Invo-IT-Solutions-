// Using native fetch available in Node v24

const BASE_URL = 'http://192.168.1.19:5000';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJyb2xlIjoiQURNSU4iLCJjb21wYW55X2lkIjoxLCJleHAiOjE3NzMyMDk1Nzh9.3KPXmEizQSI1qxuRVivDYCy2daOC4GBTBzLM17bdHco';

async function testLeaves() {
    console.log('🚀 Starting Leave apply automated tests...\n');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
    };

    // 1. Test GET /api/leaves/types
    console.log('--- Testing /api/leaves/types ---');
    try {
        const typesRes = await fetch(`${BASE_URL}/leaves/types`, { headers });
        const typesData = await typesRes.json();
        if (typesRes.ok) {
            console.log('✅ PASS: Leave types fetched successfully.');
            console.log('Data:', JSON.stringify(typesData, null, 2));
        } else {
            console.error('❌ FAIL: Failed to fetch leave types.', typesRes.status, typesData);
        }
    } catch (err) {
        console.error('❌ ERROR: /api/leaves/types connection error:', err.message);
    }

    // 2. Test GET /api/leaves/balance
    console.log('\n--- Testing /api/leaves/balance ---');
    try {
        const balanceRes = await fetch(`${BASE_URL}/leaves/balance`, { headers });
        const balanceData = await balanceRes.json();
        if (balanceRes.ok) {
            console.log('✅ PASS: Leave balance fetched successfully.');
            console.log('Data:', JSON.stringify(balanceData, null, 2));
        } else {
            console.error('❌ FAIL: Failed to fetch leave balance.', balanceRes.status, balanceData);
        }
    } catch (err) {
        console.error('❌ ERROR: /api/leaves/balance connection error:', err.message);
    }

    // 3. Test POST /api/leaves/apply
    console.log('\n--- Testing /api/leaves/apply ---');
    const applyPayload = {
        leave_type_id: 17, // Sick Leave (SL)
        from_date: '2026-03-15',
        to_date: '2026-03-16',
        reason: 'Automated test application',
        is_half_day: false,
        company_id: 1
    };

    try {
        const applyRes = await fetch(`${BASE_URL}/leaves/apply`, {
            method: 'POST',
            headers,
            body: JSON.stringify(applyPayload)
        });
        const resText = await applyRes.text();
        if (applyRes.ok) {
            console.log('✅ PASS: Leave application created successfully.');
            console.log('Response:', JSON.stringify(JSON.parse(resText), null, 2));
        } else {
            console.error('❌ FAIL: Failed to apply for leave.', applyRes.status);
            console.error('Response Text:', resText.slice(0, 500));
        }
    } catch (err) {
        console.error('❌ ERROR: /api/leaves/apply connection error:', err.message);
    }

    console.log('\n🏁 Tests Finished.');
}

testLeaves();
