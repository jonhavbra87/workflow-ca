import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

// Last inn miljøvariablene
dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    email: process.env.CYPRESS_USER_EMAIL,
    password: process.env.CYPRESS_USER_PASSWORD,
    name: process.env.CYPRESS_USER_NAME,
    avatar: process.env.CYPRESS_USER_AVATAR,
    apiUrl: process.env.CYPRESS_API_URL,
  },
});
