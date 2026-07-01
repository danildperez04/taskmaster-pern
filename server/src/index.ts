import http from "http";
import app from "./server";

import { dataSource as db } from "./config";

const server = http.createServer(app);

server.listen(3000, 'localhost', async () => {
  try {
    await db.initialize();
    console.log('Data Source has been initialized');
    console.log(`Server running on port 3000 🚀`);
    
  } catch (e) {
    console.error(e);
  }
});