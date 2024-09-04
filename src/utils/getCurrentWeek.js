const getCurrentWeek = () => {
  const startOfSeason = new Date('2024-09-05T00:00:00'); // First game date
  const currentDate = new Date();
  const diffInTime = currentDate.getTime() - startOfSeason.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

  let week = Math.floor(diffInDays / 7) + 1; // +1 to start with week 1

  // Ensure the week doesn't go below 1 before the season starts
  if (diffInDays < 0) {
    week = 1;
  }

  return week > 18 ? 18 : week; // Limit to week 18
};

