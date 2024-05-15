import express from 'express';
import { connectionUser } from "./postgres/user.js";
import { connectionblog } from "./postgres/blog.js";
import { connectionContact } from './postgres/contactInfo.js';
import { connectionActor } from './postgres/Actor.js';
import { connectionMovie } from './postgres/Movie.js';
import { connectionActorMovie } from './postgres/ActorMovie.js';
import { connectionlike } from './postgres/Like.js';
import { connectionUserFollow } from './postgres/Follow.js';
import router from './routes/createUserAndContact.js';
import routeruser from './routes/user.js';
import routerblog from './routes/blog.js';
import routerlike from './routes/like.js';
import routerfollow from './routes/Follow.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
const app=express();
const PORT=8001;

app.get("/",(req,res)=>
{
    res.send("App is running now");
})

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(router);

app.use(routeruser)

app.use(routerblog)

app.use(routerlike)

app.use("/follow",routerfollow)
app.use("/unfollow",routerfollow)
app.use("/profile",routeruser);

app.listen(PORT,()=>
{
    console.log(`server is running at port ${PORT}`);
})

connectionUser();

connectionblog();

connectionContact();

// for Many to Many  Associations..............

connectionActor();

connectionMovie();

connectionActorMovie();

connectionlike();

// connection user follow....
connectionUserFollow();