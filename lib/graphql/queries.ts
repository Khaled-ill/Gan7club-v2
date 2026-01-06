import { gql } from '@apollo/client';

export const GET_TALENT_CATEGORIES = gql`
  query GetTalentCategories {
    talentCategories {
      id
      name
      description
      icon
      image
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      user {
        id
        email
        username
        role
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation RegisterUser($input: RegisterInput!) {
    register(input: $input) {
      success
      message
      errors
      user {
        id
        email
        username
        role
      }
      profile {
        id
        fullName
        birthdate
        subscriptionTier
        city
        country
        categories {
          code
          name
        }
        primaryCategory {
          code
          name
        }
      }
    }
  }
`;

export const GET_DASHBOARD_DATA = gql`
  query GetTalentDashboard {
    me {
      id
      email
      username
      role
      isActive
    }
    myProfile {
      id
      fullName
      birthdate
      nationality
      languages
      city
      country
      bio
      subscriptionTier
      isVerified
      isFeatured
      isActive
      createdAt
      updatedAt
      
      # Categories
      categories {
        id
        code
        name
        mainCategory {
          id
          code
          name
        }
      }
      primaryCategory {
        id
        code
        name
      }
      profileCategories {
        id
        isPrimary
        experienceYears
        category {
          code
          name
        }
      }
      
      # Media Gallery
      media {
        id
        mediaType
        title
        description
        file
        thumbnail
        thumbnailMedium
        isPrimary
        order
      }
      
      # Attributes
      attributes {
        id
        # Physical Block
        heightCm
        weightKg
        hairColor
        eyeColor
        skinTone
        bodyMarks
        # Skills Block
        danceStyles
        martialArts
        accents
        licenses
        # Technical Block
        equipmentList
        softwareList
        studioAvailable
        # Performance Block
        vocalRange
        actingMethods
        experienceLevel
      }
      
      # Video Introduction
      introVideoUrl
      introVideoThumbnailUrl
      introVideoDuration
      
      # Group Participation
      isGroupLeader
      isGroupMember
      ownedGroupsCount
      memberGroupsCount
    }
  }
`;

export const GET_MY_GROUPS = gql`
  query MyGroups {
    myGroups {
      id
      name
      description
      category {
        code
        name
      }
      numberOfMembers
      members {
        id
        fullName
      }
      leader {
        id
        email
      }
    }
  }
`;

export const GET_MY_SELF_TAPES = gql`
  query MySelfTapes {
    mySelfTapes {
      id
      project {
        id
        name
      }
      status
      submittedAt
      videoUrl
      videoThumbnailUrl
      videoDuration
      notes
      adminNotes
    }
  }
`;

// Mock data for development
export const mockTalentCategories = [
  {
    id: '1',
    name: 'Performers',
    description: 'Actors, dancers, and stage performers',
    icon: 'theater',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Visual Artists',
    description: 'Photographers, videographers, and visual artists',
    icon: 'camera',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'Creative Crew',
    description: 'Directors, producers, and creative professionals',
    icon: 'film',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Specialty',
    description: 'Specialized talent and unique skills',
    icon: 'sparkles',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

