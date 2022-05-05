import { Card, CardContent, CardMedia } from '@mui/material';

import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <Card>
      <CardMedia>
        <img src={user?.picture ?? 'Unknown'} alt={user?.name ?? 'Unknown'} />
      </CardMedia>
      <CardContent>
        <h2>Name: {user?.name ?? 'Unknown'}</h2>
        <p>Email: {user?.email ?? 'Unknown'}</p>
      </CardContent>
    </Card>
  ) : (
    <></>
  );
};

export default Profile;
