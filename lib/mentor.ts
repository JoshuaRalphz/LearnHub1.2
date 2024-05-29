export const isMentor = (userId?: string | null) => {
  // Define an array of mentor user IDs
  const mentorUserIds = [
    process.env.NEXT_PUBLIC_MENTOR_ID,
    process.env.NEXT_PUBLIC_MENTOR_ID_1,
    process.env.NEXT_PUBLIC_MENTOR_ID_2,
    process.env.NEXT_PUBLIC_MENTOR_ID_3,
    // Add more mentor IDs as needed
  ];

  // Check if the provided userId is in the mentorUserIds array
  return mentorUserIds.includes(userId as string);
};
