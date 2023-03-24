const express = require("express")
const app = express()
const DB = require("./model/schema")
const port = process.env.port || 3005
const conn = require("./connection/connection")
conn()

app.use(express.json())

app.get("/v1", (req, res)=>{
    try{
        res.send("working fine")
    }catch(e){
        res.send(e)
    }
})

//========== post api for event creation ================
app.post("/v1/events", async(req, res)=>{
    try{
        let flag1 = "";
        let flag2 = 0
        if(req.body.title==""){
            flag2 = 1
            flag1= "title"   
        }
        if(req.body.description==""){
            flag2 = 1
            flag1="description"
        }
        if(req.body.location==""){
            flag2 = 1
            flag1="location"
        }
        if(req.body.startTime==""){
            flag2 = 1
            flag1="startTime"
        }
        if(req.body.endTime==""){
            flag2 = 1
            flag1="endTime"
        }

        if(flag2==1){
            return res.status(400).json({
                error: `validation error: ${flag1} is required`
            })
        }  
        const event = await DB.create(req.body)
        res.status(201).json(event)
    }catch(e){
        res.status(400).json({
            error: e.message
        })
    }
})

//================ get api for getting all event ============
app.get("/v1/events", async(req,res)=>{
    try{
        const alldata = await DB.find()
        res.status(200).json({
            alldata
        })
    }catch(e){
        res.status(404).json({
            error: e.message
        })
    }
})

// ==========  getting specific event using id ==========
app.get("/v1/events/:id", async(req, res)=>{
    try{
        const p = req.params
        const finding_id = await DB.findOne({_id: p.id})
        res.status(200).json(finding_id)
    }catch(e){
        res.status(404).json({
            error: "there is no event with that id"
        })
    }
})

//============= deleting a specific id ===============
app.delete("/v1/events/:id", async(req,res)=>{
    try{
        const p = req.params
        const del = await DB.deleteOne({_id: p.id})
        res.status(204).json()
    }catch(e){
        res.status(204).json()
    }
})

//============= updating an event through put method ======
app.put("/v1/events/:id", async(req, res)=>{
    try{
        const p = req.params
        let flag1 = "";
        let flag2 = 0
        if(req.body.title==""){
            flag2 = 1
            flag1= "title"   
        }
        if(req.body.description==""){
            flag2 = 1
            flag1="description"
        }
        if(req.body.location==""){
            flag2 = 1
            flag1="location"
        }
        if(req.body.startTime==""){
            flag2 = 1
            flag1="startTime"
        }
        if(req.body.endTime==""){
            flag2 = 1
            flag1="endTime"
        }

        if(flag2==1){
            return res.status(400).json({
                error: `validation error: ${flag1} is required`
            })
        }  
        const updated = await DB.updateOne({_id: p.id}, req.body)
        const updated_event = await DB.findOne({_id: p.id})
        res.status(200).json(updated_event)
    }catch(e){
        res.status(400).json({
            error: e.message
        })
    }
})


app.listen(port, ()=>{console.log(`server is running at port ${port}`)})