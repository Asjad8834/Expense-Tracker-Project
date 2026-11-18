import app from "./src/app.js";
import connectDb from "./src/db/db.js";
import config from "./src/config/config.js";


const PORT = config.PORT;

async function startServer(){
  
  await connectDb();

  app.listen(PORT, () =>{
    console.log(`Server started on Port: ${PORT}`);
  })

}

startServer();