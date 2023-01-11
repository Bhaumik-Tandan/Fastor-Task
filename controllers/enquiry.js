import Enquiry from '../models/enquiry.js';
import Counselor from '../models/counselor.js';

export const addEnquiry=async (req,res)=>{
    const {name,email,courseInterest}=req.body;
    try{
        const newEnquiry=new Enquiry({
            name,email,courseInterest
        });
        const savedEnquiry=await newEnquiry.save();
        res.status(201).json(savedEnquiry);
    }catch(error){
        res.status(409).json({message:error.message});
    }
}

export const getAllEnquiries=async (req,res)=>{
    const userId=req.userId;
    try{
        const allEnquiries=await Enquiry.find({$or:[{counselor:userId},{counselor:null}]});
        res.status(200).json(allEnquiries);
    }catch(error){
        res.status(404).json({message:error.message});
    }
}

export const getEnquiryById=async (req,res)=>{
    const {id:_id}=req.params;
    try{
        const enquiry=await Enquiry
        .findById
        (_id);
        if(enquiry.counselor){
            if(enquiry.counselor.toString()!==req.userId){
                return res.status(401).json({message:"Unauthorized"});
            }
        }
        res.status(200).json(enquiry);
    }catch(error){
        res.status(404).json({message:error.message});
    }
}

export const assignEnquiry=async (req,res)=>{
    const {id:_id}=req.params;
    const userId=req.userId;
    try{
        const enquiry=await Enquiry
        .findById
        (_id);
        if(enquiry.counselor){
            if(enquiry.counselor.toString()!==req.userId){
                return res.status(401).json({message:"Unauthorized"});
            }
        }
        const counselor=await Counselor.findById(userId);
        if(!counselor){
            return res.status(404).json({message:"Counselor not found"});
        }
        const updatedEnquiry=await Enquiry.findByIdAndUpdate
        (_id,{counselor:userId},{new:true});
        res.status(200).json(updatedEnquiry);
    }catch(error){
        res.status(404).json({message:error.message});
    }
}

// get all private enquiries
export const getPrivateEnquiries=async (req,res)=>{
    const userId=req.userId;
    try{
        const allEnquiries=await Enquiry.find({counselor:userId});
        res.status(200).json(allEnquiries);
    }catch(error){
        res.status(404).json({message:error.message});
    }
}
