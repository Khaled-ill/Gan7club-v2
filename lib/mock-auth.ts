// Mock authentication service for development/testing
// 
// Test Credentials:
// - Username: user (or email: user@example.com)
// - Password: ussr123

export interface MockUser {
  id: string;
  email: string;
  username: string;
  password: string;
}

export interface MockLoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    username: string;
    role?: string;
  };
}

export interface MockRegisterResponse {
  success?: boolean;
  message?: string;
  errors?: string[];
  user: {
    id: string;
    email: string;
    username: string;
  };
  profile: {
    id: string;
    fullName?: string;
    firstName?: string | null;
    lastName?: string | null;
    entityType?: string;
    subscriptionTier?: string;
    categories?: Array<{
      code: string;
      name: string;
    }>;
  };
  categories?: Array<{
    id: string;
    name: string;
  }>;
}

// Mock user database
const mockUsers: (MockUser & { role?: string })[] = [
  {
    id: '1',
    email: 'user@example.com',
    username: 'user',
    password: 'ussr123',
    role: 'USER',
  },
  {
    id: '2',
    email: 'admin@gan7club.com',
    username: 'admin',
    password: 'admin123',
    role: 'ADMIN',
  },
];

// Generate a mock JWT token (simplified)
const generateMockToken = (userId: string): string => {
  const payload = {
    userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600 * 24, // 24 hours
  };
  // In a real app, this would be a proper JWT. For mock purposes, we'll use a simple encoded string
  return `mock_token_${btoa(JSON.stringify(payload))}`;
};

// Mock login function
export const mockLogin = async (
  email: string,
  password: string
): Promise<MockLoginResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Find user by email or username
  const user = mockUsers.find(
    (u) => u.email === email || u.username === email
  );

  if (!user) {
    throw new Error('User not found');
  }

  if (user.password !== password) {
    throw new Error('Invalid password');
  }

  return {
    accessToken: generateMockToken(user.id),
    refreshToken: generateMockToken(user.id) + '_refresh',
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      role: (user as any).role || 'USER',
    },
  };
};

// Mock register function - updated to match new registration structure
export const mockRegister = async (
  email: string,
  username: string,
  password: string,
  fullName?: string
): Promise<MockRegisterResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check if user already exists
  const existingUser = mockUsers.find(
    (u) => u.email === email || u.username === username
  );

  if (existingUser) {
    throw new Error('User already exists');
  }

  // Create new user
  const newUser: MockUser = {
    id: String(mockUsers.length + 1),
    email,
    username: username || email.split('@')[0],
    password,
  };

  mockUsers.push(newUser);

  return {
    success: true,
    message: 'Registration successful',
    user: {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    },
    profile: {
      id: `profile_${newUser.id}`,
      fullName: fullName || null,
      firstName: fullName?.split(' ')[0] || null,
      lastName: fullName?.split(' ').slice(1).join(' ') || null,
      subscriptionTier: 'FREE',
      categories: [],
    },
  };
};

// Check if mock mode is enabled (you can set this via environment variable)
export const isMockMode = (): boolean => {
  return (
    process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true' ||
    process.env.NODE_ENV === 'development'
  );
};

