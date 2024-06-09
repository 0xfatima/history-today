import axios from "axios"
import express from "express"


const app = express();
const port=3000;
app.use(express.static("public"))
const URL="https://byabbe.se/on-this-day/"

var day=new Date().getDate();
var month=new Date().getMonth()+1;
app.get("/",async (req,res)=>{

    try{
        const result=await axios.get(URL+month+"/"+day+"/events.json");
        const events = result.data.events.map(event => ({
            year: event.year,
            description: event.description
        }));
        
       res.render("index.ejs",{
        content:events
        
    })}catch(error){
        console.log(error.message);
    }

    
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})