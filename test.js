// Requirig mongoose
const mongoose = require('mongoose');

// Creat  -- mongoDB connection -- to fruits data base
mongoose.connect("mongodb://localhost:27017/fruitsDB")
// mongod fo daatbase connction & mongod for mongose shell

// Creat -- Schema -- For the fruits collection
const fruitSchema = new mongoose.Schema ({
    name : String,
    rating: Number,
    review: String
})
// Creating -- Model -- for the fruits Schema fo the fuirts collection in the fruitBD database
const Fruit = mongoose.model("Fruit", fruitSchema)
// //--------------Creat a -- docments -- for the fruits collection------------------------------------ Creat  

const fruit = new Fruit ({
    name: "Apple",
    rating: 6,
    review: "The best Medcine" 
})
// SAVE the fruit collection 
//fruit.save();
const userSchema = new mongoose.Schema({
    name:   {
            //Data validation
            type: String,
             required: [true, "Nmae mast bet entred"]
            },
    age: Number,
    //Embedding Documents
    favouriteFruit: fruitSchema

})
const User = mongoose.model("User", userSchema)

 const user = new User ({
     name: "syfe",
     age : 29
 })
 
 const khalil = new User ({
     name : "Khalil",
     age: 29
 })
 const Hoda = new User ({name: " Hoda", age: 18});
 const bah = new User({
     name: "Ibrahim",
     age: 30
 })

//User.insertMany([khalil, Hoda, bah], (err) =>{
//      if (err) {
//          console.log(err)
//      }else {
//          console.log("a Three New Users hase been add to teh Users Colection")
//      }
//  })
// //--------------Read From -- docments -- for the User collection**--       Read  

/*
User.find((err, users)=>{
if(err){
    console.log(err);
}else{
    mongoose.connection.close()

   users.forEach(element => {
     console.log(element.name)
   });
}
})
*/

//--! Data Validation with mongoose
//--------------Update From -- docments -- for the User collection**--       Update  
/*
User.updateOne({_id: "620055b48d088011af932811"}, {name: "Djaber"}, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Filed hasebin updated seccssfuly!")
    }
    
})
*/

//--------------Deete From -- docments -- for the User collection**--       Delete

//User.deleteOne({name: " Hoda"}, (err)=>{})
User.updateOne({name:"syfe"}, {favouriteFruit: fruit}, (err)=>{})
