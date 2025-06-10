const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const bodyParser=require('body-parser')

const app=express();
app.use(cors());

app.use(bodyParser.json());

main().catch(err=>console.log(err));
async function main(){
    await mongoose.connect('mongodb://localhost:27017/Student-database');
    console.log('db connected')
}
const studentSchema = new mongoose.Schema({
  description: String
})
const StudentData = mongoose.model('logindetails',studentSchema);

app.post("/student-details",async(req,res)=>{
    const admno=req.body.password;
    const rno=req.body.username;
    const completeData=await StudentData.findOne({'RNO':rno,'ADMNO':admno});
    if(completeData){
        // console.log(req.body.password+" "+completeData)
        return res.status(200).json({"data":completeData});
    }
    else{
        return res.status(404)
    }
})

app.listen(6969,()=>{
    console.log("server started at "+6969);
})


const http = require('http')
const socket = require('socket.io')

const app2=http.createServer(app);

const io=socket(app2);

const chatroomSchema = new mongoose.Schema({
  message: String,
  userId: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 10000 
  }
});
const EliteChatRoom = mongoose.model('chatroom',chatroomSchema);

io.on("connection",(socket)=>{
    console.log("new client connected");

    socket.on("newMessage",async(data)=>{
        const chat=new EliteChatRoom(data);

        await chat.save();

        io.emit("newMessage",chat);
    })

    socket.on("disconnect",()=>{
        console.log("client disconnected")
    })
})
app.get('/chatroomquestions',(req,res)=>{
  EliteChatRoom.find()
      .then(data=>res.json(data))
      .catch(err=>res.status(500).json(err))
})
app.post('/savemessages', async (req, res) => {
  const j = new EliteChatRoom();
  j.userId = req.body.user;
  j.message = req.body.text;
  const doc = await j.save();
  console.log(doc);
  io.emit('newMessage', doc); // Emit event to update clients
  res.status(200).json(doc);  // Send response
});

