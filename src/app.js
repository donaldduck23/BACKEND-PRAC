import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express()

//BASIC CONFIGRATIONS 
app.use(express.json({limit : "16kb"})); 
app.use(express.urlencoded({extended : true , limit :"16kb"}))
app.use(express.static("public"))
//Cookie Parser Access
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
export default app
//------------------------------------------------
//CORS CONFIGRATION 
app.use(cors({
   origin : process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
   credentials : true , 
   methods :["GET","POST","PATCH","PUT","DELETE","OPTIONS"],
   allowedHeaders : ["Authorization","Content-Type"],
  })) ; 

  //importing the routes 
  import healthCheckRouter from "./routes/healthcheck.routes.js"

import authRouter from "./routes/auth.routes.js"
  app.use("/api/v1/auth",authRouter) ; 
  app.use("/api/v1/healthcheck",healthCheckRouter)


