import User from '../models/User.js';

export async function login(req, res)
{
    const { username, password } = req.body;
   const  user = await User.findOne({username,  password });
    if(user)
    {
        res.status(200).json({ message: "Login successful" });
    }
    else{
        res.status(401).json({ message: "Login failed" });
    }

    
}

// register user and add it to the data base 
export async function register(req, res)
{
    const { username, password , wallet} = req.body;
    const user = await User.findOne({username});
    if(user)
    {
        res.status(401).json({ message: "User already exists" });
    }
    else{
        const newUser = new User({username, password , wallet});
        await newUser.save();
        res.status(200).json({ message: "User created" });
    }

}

// find the user by id and update its data in the data base
export async function updateuserprofile(req, res)
{
    const { username, password , wallet} = req.body;
  
    const user = await User.findById(req.params.id);
    if(user)
    {
        await User.findOneAndUpdate({_id: req.params.id}, {username, password , wallet});
        res.status(200).json(user);

    }
    else{
        res.status(401).json({ message: "User not found" });
    }
}
