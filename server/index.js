import express from 'express';
import { connectionUser } from "./postgres/user.js";
import { connectionblog } from "./postgres/blog.js";
import { connectionContact } from './postgres/contactInfo.js';
import { connectionActor } from './postgres/Actor.js';
import { connectionMovie } from './postgres/Movie.js';
import { connectionActorMovie } from './postgres/ActorMovie.js';
import router from './routes/createUserAndContact.js';
const app=express();
const PORT=8001;

app.get("/",(req,res)=>
{
    res.send("App is running now");
})
app.use(express.json());
app.use(router);
app.listen(PORT,()=>
{
    console.log(`server is running at port ${PORT}`);
})

connectionUser();
connectionblog();
connectionContact();

// for  many to many  Associations

connectionActor();
connectionMovie();
connectionActorMovie();