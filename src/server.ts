import { AppDataSource } from './config/database';
import { env } from './config/env';
import { app } from './app';

const start = async () => {
  try {
    // Database initialization is already handled in src/config/database.ts 
    // but better to ensure it's initialized before listening if needed.
    // In our case, the file does it on import, but we'll use the singleton here.
    
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    app.listen(env.PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('❌ Error during server stool bootstrap:', error);
    process.exit(1);
  }
};

start();
