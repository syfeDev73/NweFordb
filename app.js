  //jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://syfeDev73:qz3Vbrhg2XH0grTA@realmcluster.uldob.mongodb.net/todolistDB")

const taskSchema = {
  task: {
    type: String,
    required: [true, "You can't enter en emptyy Task!"]
  }
}

const Task = mongoose.model("Task", taskSchema);
const newTask = new Task({
  task: "Week The Fuck UP!"
})
const secnodTask = new Task({
  task: "Add me!"
})
const TherdTask = new Task({
  task: "Delete me !"
})
const arryTaskes = [newTask, secnodTask, TherdTask]
const listSchema = {
  name: String,
  task: [taskSchema]
}

const List = mongoose.model("List", listSchema)

app.get("/", function (req, res) {
  Task.find((err, results) => {

    if (results.length === 0) {
      Task.insertMany(arryTaskes, (err => {
        if (err) {
          console.log(err);
        } else {
          console.log("Done!")
        }

      }))
      res.redirect("/")
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: results
      });
    }
  })
})

app.post("/", function (req, res) {

  const todoTask = req.body.newItem;
  const pageList = req.body.list;
  const newTask = new Task({
    task: todoTask
  })

 
 
  if (pageList==="Today"){
    // console.log('newTask')
    newTask.save()
  res.redirect("/")
  }else{
    List.findOne({name: pageList}, (err, foundList)=>{
      foundList.task.push(newTask);
      foundList.save();
      res.redirect("/" + pageList)
    })
  }

  


});
app.post('/delete', (req, res) => {
  const checkTaskId = req.body.checkbox;
  const listName = req.body.listName
  
  if (listName==="Today"){
    Task.findByIdAndRemove({
      _id: checkTaskId
    }, (err) => {
      if (!err) {      
        res.redirect('/')
        console.log("The Task deleited!")
      }
    })
  }else {
    List.findOneAndUpdate({name: listName}, {$pull: {task:{_id: checkTaskId}}}, (err, foundList )=>{
    if(!err){
      res.redirect("/" + listName)
    }
    })

  }
  
})
app.get('/:pageUrl', (req, res) => {
  const urlName = req.params.pageUrl;
  
  List.findOne({name: urlName}, (err, resl)=>{
    if(!err){
     // console.log(err)
      if(!resl){
        const list = new List({
          name: urlName,
          task: arryTaskes
        })
        list.save();
        res.redirect("/" + urlName)
        console.log('New list added')
      }else{
        res.render("list", {
          listTitle: urlName,
          newListItems: resl.task
        }); 
       // console.log("it's alrady exiest!")
       
      }
   
    }
  })

})

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(process.env.PORT || 30000, function () {
  console.log("Server started on port 3000");
});
