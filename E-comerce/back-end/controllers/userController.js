import fs from "fs"
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = join(__dirname, "../model/users.json")

const readJsonFile = (DATA_FILE, mode='utf8') => {
    try {
        const data = fs.readFileSync(DATA_FILE, mode);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

const writeJsonFile = (DATA_FILE, data, mode='utf8') => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), mode)
}

const getUsers = async (req, res) => {
        try {
            const users = await readJsonFile(DATA_FILE)
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({"msg":"Error occured"})
        }
}

const getUserById = async(req, res) =>{
    try {
        const {id} = req.params
        
        const users = await readJsonFile(DATA_FILE)
        
        const user = users.filter((user)=>user.id==id)[0]
        
        if(user)
            return res.status(200).json(user)
        
        
        return res.status(404).json({"msg":"No User Found"})
    } catch (error) {
        return res.status(500).json({"msg":"Error occured"})
    }
}

const postUser = async (req, res) => {
    try {
        const {id, name, email} = req.body
        const users = await readJsonFile(DATA_FILE)
        const index = users.findIndex((user) => user.id == id);
        if(index!=-1){
            return res.status(400).json({"msg":"Id already exist"})
        }
        users.push({id, name, email})
        await writeJsonFile(DATA_FILE, users)
        return res.status(200).json(users[users.length - 1])
    } catch (error) {
        return res.status(500).JSON({"msg":"Error occured"})
    }
}

const patchUser = async (req, res) => {
    try {
        const {id, ...updateFeilds} = req.body
        
        const users = await readJsonFile(DATA_FILE)
        
        const index = users.findIndex((user) => user.id == id);
        if (index == -1)
            return res.status(404).json({"msg":"No user found"})

        users[index]={...users[index], ...updateFeilds}
        await writeJsonFile(DATA_FILE, users)
        return res.status(200).json(users[index])
    } catch (error) {
        return res.status(500).json({"msg":"Error occured"})
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.body
        console.log("came");
        console.log(id);
        
        const users = await readJsonFile(DATA_FILE)
        const index = users.findIndex((user) => user.id == id);
        if (index == -1)
            return res.status(404).json({"msg":"No user found"})

        const user = users[index]
        users.splice(index,1)
        await writeJsonFile(DATA_FILE, users)
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({"msg":"Error occured"})
    }
}
export {getUsers, postUser, getUserById, patchUser, deleteUser}