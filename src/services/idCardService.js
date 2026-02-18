// src/services/idCardService.js

// Mock data to simulate Backend Database
let MOCK_ID_CARDS = [
    {
        id: '1',
        user_id: '101',
        employee_code: 'FIS001',
        name: 'Seelamaparnatulasi',
        designation: 'Super Admin',
        department: 'Administration',
        blood_group: 'O+',
        joining_date: '2023-01-01',
        photo: null, // Base64 or URL
        emergency_contact: '9876543210',
        role: 'superadmin'
    },
    {
        id: '2',
        user_id: '102',
        employee_code: 'FIS002',
        name: 'John Doe',
        designation: 'HR Manager',
        department: 'Human Resources',
        blood_group: 'A+',
        joining_date: '2023-03-15',
        photo: null,
        emergency_contact: '1234567890',
        role: 'hr'
    },
    {
        id: '3',
        user_id: '103',
        employee_code: 'FIS003',
        name: 'Jane Smith',
        designation: 'Software Engineer',
        department: 'Engineering',
        blood_group: 'B-',
        joining_date: '2023-06-01',
        photo: null,
        emergency_contact: '5556667777',
        role: 'employee'
    }
];

export const idCardService = {
    getAllIDCards: async () => {
        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...MOCK_ID_CARDS]);
            }, 500);
        });
    },

    getIDCardByUserId: async (userId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const card = MOCK_ID_CARDS.find(c => c.user_id === userId || c.id === userId); // Flexible match
                resolve(card || null);
            }, 300);
        });
    },

    createIDCard: async (cardData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newCard = {
                    ...cardData,
                    id: String(MOCK_ID_CARDS.length + 1),
                    created_at: new Date().toISOString()
                };
                MOCK_ID_CARDS.push(newCard);
                resolve(newCard);
            }, 500);
        });
    },

    updateIDCard: async (id, updates) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                MOCK_ID_CARDS = MOCK_ID_CARDS.map(card =>
                    card.id === id ? { ...card, ...updates, updated_at: new Date().toISOString() } : card
                );
                resolve(MOCK_ID_CARDS.find(c => c.id === id));
            }, 500);
        });
    },

    deleteIDCard: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                MOCK_ID_CARDS = MOCK_ID_CARDS.filter(c => c.id !== id);
                resolve(true);
            }, 500);
        });
    }
};
