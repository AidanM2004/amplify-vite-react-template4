import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { votePoll } from './functions/votePoll/resource';

defineBackend({
  auth,
  data,
  votePoll // ✅ just include it directly by name
});
