const {Router} = require('express');
const Room = require('../models/Room');
const Message = require('../models/Message');

const router = Router();

router.get('/:id', async (req,res) => {
    try{
      const { id: roomId } = req.params;
      const candidate = await Room.findOne({_id: roomId});
      if (!candidate) {
        return res.json({users: [], messages: []});
      }
      const data = await Message.find({owner: roomId});
      
      res.json({data});
    }
    catch(e){
      res.status(500);
    }
  })
  
  
router.post('/', async (req,res) => {
    try{
      const {roomId} = req.body;
      const candidate = await Room.findOne({_id: roomId});
      if (candidate) {
        return res.send();
      }
      const room = new Room({_id:roomId});
      await room.save();
      res.send();
    }
    catch(e){
      res.status(500);
    }
  })

  module.exports = router;