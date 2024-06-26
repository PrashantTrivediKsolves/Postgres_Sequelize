import express from 'express';

import { connectionUser } from "./postgres/user.js";
import { connectionblog } from "./postgres/blog.js";
import { connectionContact } from './postgres/contactInfo.js';
import { connectionActor } from './postgres/Actor.js';
import { connectionMovie } from './postgres/Movie.js';

import { connectionActorMovie } from './postgres/ActorMovie.js';
import { connectionlike } from './postgres/Like.js';
import { connectionUserFollow } from './postgres/Follow.js';
import { connectioncomment } from './postgres/comment.js';
import { connectionNewBlogFile } from './postgres/blogsWithFile.js';

import router from './routes/createUserAndContact.js';
import routeruser from './routes/user.js';
import routerblog from './routes/blog.js';
import routerlike from './routes/like.js';
import routerfollow from './routes/Follow.js';
import routercomment from './routes/comment.js';

import routerBlogFile from './routes/newblogFile.js';
import cookieParser from 'cookie-parser';

import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import { UserFollowModel } from './models/Follow.js';

const app=express();

app.use(cors({
  
    origin:"http://localhost:4200",

    credentials:true
}));

const PORT=8001;

app.use(bodyParser.json());

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.get("/",(req,res)=>
{
    res.send("App is running now........");
})
app.get("/loginuser", async (req, res) => {
    console.log("Login successful");
  
    // Redirect to the dashboard
    res.redirect("http://localhost:4200/home");
  });
  
  app.post("/loginuser", async (req, res) => {
    console.log(req.body);
  
    // Redirect to the dashboard after login
    res.redirect("http://localhost:4200/home");
  });
app.use(express.json());


app.use(cookieParser());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);
// app.use("/profile",routeruser);
app.use(routeruser)

// app.use(routerblog)

app.use(routerlike)

// app.use("/follow",routerfollow)
// app.use("/unfollow",routerfollow)

app.use(routerfollow);
// app.use("/profile",routeruser);

app.use(routercomment);

app.use(routerBlogFile);

app.listen(PORT,()=>
{
    console.log(`server is running at port ${PORT}`);
})

connectionUser();

connectionblog();

connectionContact();

// for Many to Many  Associations.........................

connectionActor();

connectionMovie();

connectionActorMovie();

connectionlike();

// connection user follow....
connectionUserFollow();

// connection user comment
connectioncomment();




// connection new blog file
connectionNewBlogFile();

