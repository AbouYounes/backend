const express = require('express');
const User = require('./models/user');
const Product = require('./models/product');

require('./config/connect')

const app = express();
app.use(express.json());


app.post('/add', (req, res)=>{
    data = req.body;
    usr = new User(data);
    usr.save()
    .then(
        (savedUser)=>{
            res.send(savedUser)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )

});

app.post('/create', async (req,res)=>{
    try{
        data = req.body;
        usr = new User(data);
        savedUser = await usr.save();
        console.log(data);
        res.send(savedUser);

    } catch (error){
        res.send(error)
    }
})

app.get('/getall', (req,res)=>{
    User.find()
    .then(
        (users)=>{
            res.send(users)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )

});

app.get('/all', async(req,res)=>{
    try {
        users = await User.find();
        res.send(users);
    } catch (error) {
       res.send(error) 
    }
})

app.get('/byId/:id', async (req,res)=>{
    try {
        myId = req.params.id;
        user1 = await User.findById({ _id:myId });
        res.send(user1)
    } catch (error) {
        res.send(error)
    }
})

app.get('/getbyId/:id', (req,res)=>{
    myid = req.params.id;
    User.findOne({ _id: myid })
    .then(
        (user)=>{
            res.send(user)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
})

app.put('/update/:id', (req,res)=>{
    newData = req.body;
    id = req.params.id;
    userupdated = User.findByIdAndUpdate({_id:id} , newData)
    .then(
        (userupdated)=>{
            res.send(userupdated)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
});

app.put('/updateAsync/:id', async (req,res)=>{
    try {
        newData = req.body;
        id = req.params.id;
        userupdated = await User.findByIdAndUpdate({_id:id} , newData);
        res.send(userupdated);

    } catch (error) {
        res.send(error)
    }
})

app.delete('/delete/:id', (req,res)=>{
    id = req.params.id;
    deletedUser = User.findByIdAndDelete({ _id:id })
    .then(
        (deletedUser)=>{
            res.send(deletedUser)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
} )

app.delete('/deleteuser/:id', async (req,res)=>{
    try {
        id = req.params.id;
        user = await User.findOneAndDelete({ _id:id });
        res.send(user);
    } catch (error) {
        res.send(error)
    }
})


//product CRUD
app.post('/createproduct', async (req,res)=>{
    try{
        data = req.body;
        prod = new Product(data);
        savedProd = await prod.save();
        res.status(200).send(savedProd);

    } catch (error){
        res.status(400).send(error)
    }
})

app.get('/getall_p', async(req,res)=>{
    try {
        productsget = await Product.find();
        res.status(200).send(productsget);
    } catch (error) {
        res.status(400).send(error) 
    }
})

app.get('/prod_byId/:id', async (req,res)=>{
    try {
        myId = req.params.id;
        prod = await Product.findById({ _id:myId });
        res.status(200).send(prod)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.put('/update_prod/:id', async (req,res)=>{
    try {
        newData = req.body;
        id = req.params.id;
        produpdated = await Product.findByIdAndUpdate({_id:id} , newData);
        res.status(200).send(produpdated);

    } catch (error) {
        res.status(400).send(error)
    }
})


app.delete('/deleteprod/:id', async (req,res)=>{
    try {
        id = req.params.id;
        prod = await Product.findOneAndDelete({ _id:id });
        res.send(prod);
    } catch (error) {
        res.send(error)
    }
})






app.listen(  3000 , ()=>{

    console.log('server work!')

}  )