const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors =require("cors");
const {Server}=require("socket.io");
const http=require("http");
const port = 8000
const app=express();

const {addUser,getUser}=require("./handlers");
const {addHuman,getHuman, getCaribou, addCaribou}=require("./handlers-human");

    app.use(express.json())
    app.use(helmet())
    app.use(morgan('tiny'))
    app.use(cors())

    const server=http.createServer(app);
    const io=new Server(server,{
        cors:{
            origin:"http://localhost:3000",
            methods:["GET","POST"],
        }
    });

    io.on("connection",(socket)=>{
        // console.log(`User Connected: ${socket.id}`);

        socket.on("join_room",(data)=>{
            socket.join(data);
            console.log(`User with ID: ${socket.id} joined room ${data}`)
        })
        socket.on("send_message", (data)=>{
            socket.to(data.room).emit("receive_message",data);
        });
        socket.on("disconnect", ()=>{
            // console.log("User Disconnected", socket.id);
        })
    })

    app.get('/users/:email/:password',getUser)
    app.post('/user',addUser)
    
    app.get('/humans',getHuman)
    app.post('/humans',addHuman)

    app.get('/caribous',getCaribou)
    app.post('/caribous',addCaribou)

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
    server.listen(3001,()=>{
        console.log("Server Running");
    })