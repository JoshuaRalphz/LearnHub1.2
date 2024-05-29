export const isMentor = (userId?: string | null) => {
  // Define an array of mentor user IDs
  const mentorUserIds = [
    process.env.NEXT_PUBLIC_MENTOR_ID,
    process.env.NEXT_PUBLIC_MENTOR_ID_1,
    process.env.NEXT_PUBLIC_MENTOR_ID_2,
    process.env.NEXT_PUBLIC_MENTOR_ID_3,
    process.env.NEXT_PUBLIC_MENTOR_ID_4,
    process.env.NEXT_PUBLIC_MENTOR_ID_5,
    process.env.NEXT_PUBLIC_MENTOR_ID_6,
    process.env.NEXT_PUBLIC_MENTOR_ID_7,
    process.env.NEXT_PUBLIC_MENTOR_ID_8,
    process.env.NEXT_PUBLIC_MENTOR_ID_9,
    process.env.NEXT_PUBLIC_MENTOR_ID_10,
    // Add more mentor IDs as needed
  ];

  // Check if the provided userId is in the mentorUserIds array
  return mentorUserIds.includes(userId as string);
};
