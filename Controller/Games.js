import Game from '../models/Game.js';
import User from '../models/User.js';
import Achat from '../models/Achat.js';
import { validationResult } from 'express-validator';


export async function getGames(req, res)
{
    const games = await Game.find();
    res.status(200).json(games);
}

export async function getGame(req, res)
{
    const game = await Game.findById(req.params.id);
    res.status(200).json(game);
}

// add game
export async function addGame(req, res)
{
    const {title, description, price , quantity } = req.body;
    if (!validationResult(req).isEmpty()) {
        return res.status(422).json({ errors: validationResult(req).array() });
        }
        else {
 

    const game = await Game.findOne({title});
    if(game)
    {
        res.status(401).json({ message: "Game already exists" });
    }
    else{
        const newGame = new Game({title, description, price , quantity ,  image:`${req.protocol}://${req.get("host")}/img/${
            req.file.filename
          }`});
        await newGame.save();
        res.status(200).json({ message: "Game created" });
    }
}}

// buy a game 
export async function buyGame(req, res)
{
    const { idUser, idGame } = req.body;
    const user = await User.findById(idUser);
    const game = await Game.findById(idGame);
    if(user && game)
    {
        if (user.wallet < game.price)
        {
            res.status(401).json({ message: "User has not enough money" });
            return;
        }
        else if (game.quantity < 1)
        {
            res.status(401).json({ message: "Game is out of stock" });
            return;
        }
        else {
            user.wallet -= game.price;
            game.quantity -= 1;
            await user.save();
            await game.save();
            const newAchat = new Achat({idUser, idGame});
        await newAchat.save();
        res.status(200).json({ message: "Game bought" });
        }
        
    }
    else{
        res.status(401).json({ message: "User or Game not found" });
    }

}

