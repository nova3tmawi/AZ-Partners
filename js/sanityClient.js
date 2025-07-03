// In js/sanityClient.js
import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: 'g3y5udo2',      // Your project's unique ID
  dataset: 'production',        // The name of your database
  useCdn: true,                 // `true` for fastest response times
  apiVersion: '2025-07-02',     // Use today's date
})