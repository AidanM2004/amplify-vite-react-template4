import { useAuthenticator } from '@aws-amplify/ui-react';

function App() {
  const { signOut } = useAuthenticator();

  return (
    <main>
      <h1>Sign In</h1>
      
      {/* Sign-out button */}
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
