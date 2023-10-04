import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';

import Navigation from './navigation';
import { SplashScreen } from './screens/Splash';

const App = () => {
  const [isLoading, setLoading] = useState(true);

  if (isLoading) {
    return <SplashScreen setLoading={setLoading} />;
  }

  return (
    <>
      <StatusBar animated style="dark" />
      <Navigation />
    </>
  );
};

export default App;
