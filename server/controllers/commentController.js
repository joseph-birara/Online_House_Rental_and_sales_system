const getUser = require('../authController/authorize')
const commentModel = require('../models/commentModel')

const mongoose = require('mongoose')

const getByOwner = async(req, res) => {
    const { id } = req.body
    const comments = await commentModel.find({ ownerID: id })
    if (!comments) {
        return res.status(200).json({ message: "no comments found for this owner" })        
    }
return comments
} 
const getByHouse = async(req, res) => {
    const { id } = req.body
    const comments = await commentModel.find({ ownerID: id })
    if (!comments) {
        return res.status(200).json({ message: "no comments found for this house" })        
    }
return res.status(200).json(comments)
} 

const addComment = async (req, res) => {
    
    
}