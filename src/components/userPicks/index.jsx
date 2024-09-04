import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useTheme } from '@mui/material/styles';

const UserPicks = ({ twitterHandle }) => {
  const [picks, setPicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchPicks = async () => {
      try {
        const picksQuery = query(collection(db, 'picks'), where('twitterHandle', '==', twitterHandle));
        const picksSnapshot = await getDocs(picksQuery);

        if (!picksSnapshot.empty) {
          const pickDoc = picksSnapshot.docs[0]; // Assuming you want the first document found
          const pickData = pickDoc.data();
          setPicks(pickData.picks); // 'picks' is the field containing the weekly picks
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching picks:', error);
        setLoading(false);
      }
    };

    fetchPicks();
  }, [twitterHandle]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Sort the weeks in descending order (Week 1 at the top)
  const sortedWeeks = Object.entries(picks).sort((a, b) => {
    const weekA = parseInt(a[0].replace('week', ''), 10);
    const weekB = parseInt(b[0].replace('week', ''), 10);
    return weekA - weekB; // Change to b - a if you want Week 18 at the top
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center" color={theme.palette.text.primary}>
        Your Picks
      </Typography>
      <List>
        {sortedWeeks.map(([week, games]) => (
          <Card key={week} variant="outlined" sx={{ marginBottom: 2, backgroundColor: theme.palette.background.default }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color={theme.palette.text.primary}>
                {`Week ${week.replace('week', '')} Picks`}
              </Typography>
              {Object.entries(games).map(([gameIndex, team]) => (
                <Typography key={gameIndex} variant="body2" component="div" color={theme.palette.text.secondary}>
                  {`Game ${parseInt(gameIndex) + 1}: ${team}`}
                </Typography>
              ))}
            </CardContent>
          </Card>
        ))}
      </List>
    </Box>
  );
};

export default UserPicks;

