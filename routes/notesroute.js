import { Router } from "express";
import Authenthicate from "../middleware/Authmiddleware.js";
const route = Router()
import notes from "../models/note.js";
route.post('/createnote' ,Authenthicate, async (req, res)=>{
    try {
        const ouruser = req.user;
        const {date , title , Content} = req.body;
        if(!date || !Content){
          return res.status(400).json({message : "All fields are required"});
        }
       await notes.create({
          UserID : ouruser._id,
          date,  
          title,
          Content
       });
       return res.status(200).json({message : "notes created successfully"});
    } 
    catch (error){
      return res.status(500).json({error : `${error}`});
    }
});

route.get('/getnotes',  Authenthicate,async (req,res)=>{
  try {
    const ouruser = req.user;
    const ourid = ouruser._id;
    const Allnotes = await notes.find({UserID :ourid})
    return res.status(200).json({
        notes : Allnotes
    })
  } catch (error){
    return res.status(500).json({error : "internal server error"});
  }
});

route.delete('/deletenote/:id', Authenthicate, async (req, res) => {
  try {
    const { id } = req.params;
    const ouruser = req.user;

    const note = await notes.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Ensure the note belongs to the logged-in user
    if (note.UserID.toString() !== ouruser._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this note" });
    }

    await notes.findByIdAndDelete(id);

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete note error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
export default route