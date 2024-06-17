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
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD,
    name: process.env.USER_NAME,
    avatar: process.env.USER_AVATAR,
    apiUrl: process.env.API_URL,
  },
});
