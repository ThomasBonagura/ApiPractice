const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;
app.use(express.json());

//Instead of database, this is a simple metaData for my pets.
let petMetaData = {
  1: {
    id: 1,
    name: 'doggie',
    photoUrls: ['string'],
    status: 'available'
  }
};


app.get('/', (req, res) => {
  res.send('Enter something in the /{}! Check "README" for details');
});

app.get('/findByID/:id', (req, res) => {
  const id = req.params.id;
  const pet = petMetaData[id];
  if (pet) {
    res.send(pet);
  } else {
    res.send('Pet not found (try different ID)');
  }
});
app.get('/findByName/:name', (req, res) => {
    const name = req.params.name;
    const pet = Object.values(petMetaData).find((pet) => pet.name === name);
  
    if (pet) {
      res.send(pet);
    } else {
      res.send('Pet not found (try a different name)');
    }
  });
  

app.post('/makeNewPet/:id/:name/:photoUrls/:status', (req, res) => {
    const newPetId = req.params.id;
    const newPetName = req.params.name;
    const newPetPhotoUrls = req.params.photoUrls;
    const newPetStatus = req.params.status;
  
    if (!newPetName || !newPetPhotoUrls || !newPetStatus) {
      res.send('Missing required information');
      return;
    }
  
    let newPet = {
      id: newPetId,
      name: newPetName,
      photoUrls: newPetPhotoUrls,
      status: newPetStatus
    };
  
    petMetaData[newPetId] = newPet;
  
    res.send(newPet);
  });
  
app.put('/updatePet/:id/:name/:photoUrls/:status', (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    const photoUrls = req.params.photoUrls;
    const status = req.params.status;
  
    if (!id || !name || !photoUrls || !status) {
      res.send('Missing required information');
      return;
    }
  
    const pet = petMetaData[id];
  
    if (!pet) {
      res.send('Pet not found');
      return;
    }
  
    // Update all parameters for the pet
    pet.name = name;
    pet.photoUrls = photoUrls;
    pet.status = status;
  
    res.send('Pet updated successfully');
  });
  

  app.delete('/delete/:id',(req,res) => {
      const id = req.params.id;
      if(!id){
        res.send('Pet not found.');
        return;
      }
      delete petMetaData[id];
      res.send("Pet deleted.");
  });
  

app.listen(port, () => console.log('> Server is up and running on port: ' + port));


