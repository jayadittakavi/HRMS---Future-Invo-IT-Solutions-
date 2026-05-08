// This file mocks window.fetch to provide a UI flow without a backend.
const originalFetch = window.fetch;

window.fetch = async (...args) => {
  const [resource, config] = args;
  const url = typeof resource === 'string' ? resource : resource.url;

  console.log('Mocking fetch for:', url, config);

  // Parse body if it exists
  let body = {};
  if (config && config.body) {
    try {
      body = JSON.parse(config.body);
    } catch (e) {
      // Ignore
    }
  }

  // --- Auth & Login ---
  if (url.includes('/auth/login')) {
    return new Response(JSON.stringify({
      success: true,
      message: 'Login successful',
      token: 'demo-token-12345',
      user: {
        id: 1,
        username: body.email ? body.email.split('@')[0] : 'demo_user',
        email: body.email || 'demo@example.com',
        role: 'superadmin',
        firstName: 'Demo',
        lastName: 'User'
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // --- Generic Catch-All for other APIs ---
  // Return a generic success response to keep the UI from crashing
  return new Response(JSON.stringify({
    success: true,
    data: [],
    message: 'Mock response'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
