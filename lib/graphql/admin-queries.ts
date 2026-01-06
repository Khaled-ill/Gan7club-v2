import { gql } from '@apollo/client';

// Admin Dashboard Queries
export const GET_ADMIN_DASHBOARD = gql`
  query GetAdminDashboard {
    # Profile statistics
    allProfiles(limit: 1) {
      id
    }
    freeProfiles: profilesBySubscriptionTier(subscriptionTier: "free", limit: 1) {
      id
    }
    silverProfiles: profilesBySubscriptionTier(subscriptionTier: "silver", limit: 1) {
      id
    }
    platinumProfiles: profilesBySubscriptionTier(subscriptionTier: "platinum", limit: 1) {
      id
    }
    featuredProfiles: searchProfiles(input: { isFeatured: true, pageSize: 1 }) {
      totalCount
    }
    verifiedProfiles: searchProfiles(input: { isVerified: true, pageSize: 1 }) {
      totalCount
    }
    
    # Recent profiles
    recentProfiles: allProfiles(limit: 10, offset: 0) {
      id
      fullName
      subscriptionTier
      createdAt
      isVerified
      isFeatured
    }
    
    # Projects
    projects(isActive: true) {
      id
      name
      shortlistItemsCount
      createdAt
      clientName
    }
    
    # Recent lookbooks
    myLookbooks {
      id
      viewCount
      project {
        name
        clientName
      }
      createdAt
    }
    
    # Unread notifications
    myNotifications(unreadOnly: true, limit: 10) {
      id
      title
      message
      priority
      createdAt
    }
  }
`;

// Talent Management Queries
export const GET_ALL_PROFILES = gql`
  query GetAllProfiles($isActive: Boolean, $limit: Int, $offset: Int) {
    allProfiles(isActive: $isActive, limit: $limit, offset: $offset) {
      id
      fullName
      entityType
      subscriptionTier
      city
      country
      isVerified
      isFeatured
      isActive
      createdAt
      categories {
        code
        name
      }
      primaryCategory {
        code
        name
      }
      attributes {
        heightCm
        weightKg
        hairColor
        eyeColor
        danceStyles
      }
      media {
        id
        mediaType
        fileUrl
        isPrimary
      }
    }
  }
`;

export const GET_PROFILES_BY_CATEGORY = gql`
  query GetProfilesByCategory($categoryCode: String!, $isActive: Boolean, $limit: Int, $offset: Int) {
    profilesByCategory(categoryCode: $categoryCode, isActive: $isActive, limit: $limit, offset: $offset) {
      id
      fullName
      subscriptionTier
      categories {
        code
        name
      }
      profileCategories {
        isPrimary
        experienceYears
        category {
          code
          name
        }
      }
    }
  }
`;

export const GET_PROFILES_BY_TIER = gql`
  query GetProfilesByTier($subscriptionTier: String!, $isActive: Boolean, $limit: Int, $offset: Int) {
    profilesBySubscriptionTier(subscriptionTier: $subscriptionTier, isActive: $isActive, limit: $limit, offset: $offset) {
      id
      fullName
      subscriptionTier
      isVerified
      isFeatured
      categories {
        code
        name
      }
    }
  }
`;

export const GET_PROFILE_DETAILS = gql`
  query GetProfileDetails($id: ID!) {
    profile(id: $id) {
      id
      fullName
      entityType
      subscriptionTier
      nationality
      languages
      location
      city
      country
      bio
      introVideoUrl
      introVideoThumbnailUrl
      introVideoDuration
      isVerified
      isFeatured
      isActive
      createdAt
      updatedAt
      categories {
        code
        name
        mainCategory
      }
      primaryCategory {
        code
        name
      }
      profileCategories {
        isPrimary
        experienceYears
        category {
          code
          name
        }
      }
      attributes {
        heightCm
        weightKg
        hairType
        hairColor
        eyeColor
        skinTone
        danceStyles
        martialArts
        accents
        vocalRange
        actingMethods
        experienceYears
      }
      media {
        id
        mediaType
        title
        description
        fileUrl
        fileOptimizedUrl
        thumbnailSmallUrl
        thumbnailMediumUrl
        thumbnailLargeUrl
        videoThumbnailUrl
        videoDuration
        isPrimary
        order
      }
      groups {
        id
        name
        description
      }
    }
  }
`;

// Category Management Queries
export const GET_MAIN_CATEGORIES = gql`
  query GetMainCategories {
    mainCategories(isActive: true) {
      id
      code
      name
      description
      order
      subCategoriesCount
      subCategories {
        id
        code
        name
        description
        order
      }
    }
  }
`;

export const GET_SUB_CATEGORIES = gql`
  query GetSubCategories($mainCategoryId: ID) {
    subCategories(mainCategoryId: $mainCategoryId, isActive: true) {
      id
      code
      name
      description
      order
      mainCategory {
        id
        code
        name
      }
    }
  }
`;

// Project Management Queries
export const GET_ALL_PROJECTS = gql`
  query GetAllProjects($isActive: Boolean) {
    projects(isActive: $isActive) {
      id
      name
      description
      clientName
      isActive
      shortlistItemsCount
      createdByUsername
      createdAt
      updatedAt
    }
  }
`;

export const GET_PROJECT_DETAILS = gql`
  query GetProjectDetails($id: ID!) {
    project(id: $id) {
      id
      name
      description
      clientName
      isActive
      shortlistItemsCount
      createdByUsername
      createdAt
      updatedAt
    }
  }
`;

export const GET_PROJECT_SHORTLIST = gql`
  query GetProjectShortlist($projectId: ID!) {
    shortlistItems(projectId: $projectId) {
      id
      notes
      priority
      addedByUsername
      createdAt
      profile {
        id
        fullName
        subscriptionTier
        primaryCategory {
          name
        }
        attributes {
          heightCm
          hairColor
          eyeColor
        }
        media {
          id
          fileUrl
          isPrimary
        }
      }
      project {
        id
        name
      }
    }
  }
`;

// Lookbook Queries
export const GET_MY_LOOKBOOKS = gql`
  query GetMyLookbooks($projectId: ID) {
    myLookbooks(projectId: $projectId) {
      id
      uniqueToken
      isActive
      expiresAt
      viewCount
      lastViewedAt
      project {
        id
        name
        clientName
      }
      createdAt
    }
  }
`;

// Search Queries
export const SEARCH_PROFILES = gql`
  query SearchProfiles($input: ProfileSearchInput!) {
    searchProfiles(input: $input) {
      profiles {
        id
        fullName
        entityType
        subscriptionTier
        city
        country
        isVerified
        isFeatured
        categories {
          code
          name
        }
        attributes {
          heightCm
          danceStyles
        }
      }
      totalCount
      page
      pageSize
      totalPages
      hasNext
      hasPrevious
      searchTimeMs
    }
  }
`;

export const GET_MY_SEARCH_PRESETS = gql`
  query GetMySearchPresets {
    mySearchPresets {
      id
      name
      description
      filterCriteria
      logicOperator
      isShared
      useCount
      lastUsedAt
      createdAt
      updatedAt
    }
  }
`;

export const GET_SHARED_SEARCH_PRESETS = gql`
  query GetSharedSearchPresets {
    sharedSearchPresets {
      id
      name
      description
      filterCriteria
      logicOperator
      isShared
      useCount
      createdByUsername
      lastUsedAt
      createdAt
    }
  }
`;

export const GET_SEARCH_HISTORY = gql`
  query GetSearchHistory($limit: Int) {
    mySearchHistory(limit: $limit) {
      id
      searchCriteria
      resultsCount
      createdAt
    }
  }
`;

// Notifications
export const GET_MY_NOTIFICATIONS = gql`
  query GetMyNotifications($unreadOnly: Boolean, $limit: Int) {
    myNotifications(unreadOnly: $unreadOnly, limit: $limit) {
      id
      notificationType
      title
      message
      isRead
      readAt
      priority
      actionUrl
      relatedObjectType
      relatedObjectId
      data
      createdAt
    }
  }
`;

// Mutations
export const SET_FEATURED_STATUS = gql`
  mutation SetFeaturedStatus($input: SetFeaturedStatusInput!) {
    setFeaturedStatus(input: $input) {
      success
      message
      errors
      profile {
        id
        fullName
        isFeatured
        subscriptionTier
      }
    }
  }
`;

export const CREATE_MAIN_CATEGORY = gql`
  mutation CreateMainCategory($input: CreateMainCategoryInput!) {
    createMainCategory(input: $input) {
      success
      message
      errors
      mainCategory {
        id
        code
        name
        description
        order
        isActive
      }
    }
  }
`;

export const UPDATE_MAIN_CATEGORY = gql`
  mutation UpdateMainCategory($id: ID!, $input: UpdateMainCategoryInput!) {
    updateMainCategory(id: $id, input: $input) {
      success
      message
      errors
      mainCategory {
        id
        code
        name
        description
        order
        isActive
      }
    }
  }
`;

export const DELETE_MAIN_CATEGORY = gql`
  mutation DeleteMainCategory($id: ID!) {
    deleteMainCategory(id: $id) {
      success
      message
      errors
    }
  }
`;

export const CREATE_SUB_CATEGORY = gql`
  mutation CreateSubCategory($input: CreateSubCategoryInput!) {
    createSubCategory(input: $input) {
      success
      message
      errors
      subCategory {
        id
        code
        name
        description
        order
        isActive
        mainCategory {
          id
          code
          name
        }
      }
    }
  }
`;

export const UPDATE_SUB_CATEGORY = gql`
  mutation UpdateSubCategory($id: ID!, $input: UpdateSubCategoryInput!) {
    updateSubCategory(id: $id, input: $input) {
      success
      message
      errors
      subCategory {
        id
        code
        name
        description
        order
        isActive
        mainCategory {
          id
          code
          name
        }
      }
    }
  }
`;

export const DELETE_SUB_CATEGORY = gql`
  mutation DeleteSubCategory($id: ID!) {
    deleteSubCategory(id: $id) {
      success
      message
      errors
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      success
      message
      errors
      project {
        id
        name
        description
        clientName
        isActive
        createdAt
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      success
      message
      errors
      project {
        id
        name
        description
        clientName
        isActive
      }
    }
  }
`;

export const ADD_TO_SHORTLIST = gql`
  mutation AddToShortlist($input: AddToShortlistInput!) {
    addToShortlist(input: $input) {
      success
      message
      errors
      shortlistItem {
        id
        notes
        priority
        profile {
          id
          fullName
        }
        project {
          id
          name
        }
      }
    }
  }
`;

export const REMOVE_FROM_SHORTLIST = gql`
  mutation RemoveFromShortlist($input: RemoveFromShortlistInput!) {
    removeFromShortlist(input: $input) {
      success
      message
      errors
    }
  }
`;

export const UPDATE_SHORTLIST_ITEM = gql`
  mutation UpdateShortlistItem($input: UpdateShortlistItemInput!) {
    updateShortlistItem(input: $input) {
      success
      message
      errors
      shortlistItem {
        id
        notes
        priority
      }
    }
  }
`;

export const GENERATE_LOOKBOOK = gql`
  mutation GenerateLookbook($input: GenerateLookbookInput!) {
    generateLookbook(input: $input) {
      success
      message
      errors
      lookbook {
        id
        uniqueToken
        isActive
        expiresAt
        viewCount
        project {
          id
          name
          clientName
        }
      }
      lookbookUrl
    }
  }
`;

export const REVOKE_LOOKBOOK = gql`
  mutation RevokeLookbook($lookbookId: ID!) {
    revokeLookbook(lookbookId: $lookbookId)
  }
`;

export const REGENERATE_LOOKBOOK_TOKEN = gql`
  mutation RegenerateLookbookToken($lookbookId: ID!) {
    regenerateLookbookToken(lookbookId: $lookbookId) {
      success
      message
      errors
      lookbook {
        id
        uniqueToken
      }
      lookbookUrl
    }
  }
`;

export const EXPORT_LOOKBOOK_AS_PDF = gql`
  mutation ExportLookbookAsPDF($input: ExportLookbookAsPDFInput!) {
    exportLookbookAsPDF(input: $input) {
      success
      message
      errors
      pdfUrl
      pdfBase64
    }
  }
`;

export const SAVE_SEARCH_PRESET = gql`
  mutation SaveSearchPreset($input: SaveSearchPresetInput!) {
    saveSearchPreset(input: $input) {
      success
      message
      errors
      preset {
        id
        name
        description
        filterCriteria
        logicOperator
        isShared
      }
    }
  }
`;

export const UPDATE_SEARCH_PRESET = gql`
  mutation UpdateSearchPreset($id: ID!, $input: UpdateSearchPresetInput!) {
    updateSearchPreset(id: $id, input: $input) {
      success
      message
      errors
      preset {
        id
        name
        description
        filterCriteria
        logicOperator
        isShared
      }
    }
  }
`;

export const DELETE_SEARCH_PRESET = gql`
  mutation DeleteSearchPreset($id: ID!) {
    deleteSearchPreset(id: $id) {
      success
      message
      errors
    }
  }
`;

export const BULK_CATEGORY_ASSIGNMENT = gql`
  mutation BulkCategoryAssignment($input: BulkCategoryAssignmentInput!) {
    bulkCategoryAssignment(input: $input) {
      success
      message
      errors
      assignedCount
      failedCount
    }
  }
`;

export const BULK_STATUS_UPDATE = gql`
  mutation BulkStatusUpdate($input: BulkStatusUpdateInput!) {
    bulkStatusUpdate(input: $input) {
      success
      message
      errors
      updatedCount
      failedCount
    }
  }
`;

export const BULK_EXPORT = gql`
  mutation BulkExport($input: BulkExportInput!) {
    bulkExport(input: $input) {
      success
      message
      errors
      fileUrl
      fileBase64
      fileName
    }
  }
`;

export const MARK_NOTIFICATION_AS_READ = gql`
  mutation MarkNotificationAsRead($id: ID!) {
    markNotificationAsRead(id: $id) {
      success
      message
      errors
      notification {
        id
        isRead
        readAt
      }
    }
  }
`;

export const MARK_ALL_NOTIFICATIONS_AS_READ = gql`
  mutation MarkAllNotificationsAsRead {
    markAllNotificationsAsRead {
      success
      message
      errors
    }
  }
`;

export const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($id: ID!) {
    deleteNotification(id: $id) {
      success
      message
      errors
    }
  }
`;

