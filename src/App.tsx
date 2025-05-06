import React, { useEffect, useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import API from '@aws-amplify/api'; // Import Amplify API
import { useNavigate } from 'react-router-dom'; // If you want to redirect after voting

// Assuming you have a GraphQL API configured with Amplify
const PollApp = () => {
  const { signOut, user } = useAuthenticator();
  const navigate = useNavigate(); // to redirect to thank you page after voting
  const [pollData, setPollData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch poll data from DynamoDB using API call
    const fetchPollData = async () => {
      try {
        const data = await API.get('pollAPI', '/pollData', {}); // Replace with your actual API name and path
        setPollData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching poll data:', error);
        setLoading(false);
      }
    };

    fetchPollData();
  }, []);

  const vote = async (optionId: string) => {
    try {
      // Make a vote API call to DynamoDB to update vote count
      await API.post('pollAPI/vote', { body: { optionId } }); // Replace with your actual API endpoint
      navigate('/thank-you'); // Redirect after vote using useNavigate
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  if (loading) return <p>Loading poll...</p>;

  return (
    <div>
      <h1>Poll: What's your favorite option?</h1>
      <div>
        {pollData?.options.map((option: any) => {
          const percentage = ((option.votes / pollData.totalVotes) * 100).toFixed(2);
          return (
            <div key={option.optionId}>
              <button onClick={() => vote(option.optionId)}>{option.name}</button>
              <p>{option.votes} votes ({percentage}%)</p>
            </div>
          );
        })}
      </div>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

export default PollApp;
