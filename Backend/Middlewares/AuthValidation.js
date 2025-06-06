const Joi=require('joi');

const signupValidation=(req,res,next)=>{//middleware function
       const schema=Joi.object({//create schema
        name:Joi.string().min(3).max(100).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(100).required()
       });
       const {error}=schema.validate(req.body);//validate the request body
       if(error){//if error return 400 status code
           return res.status(400).json({message:"Bad Request",error});
       }
       next();

};
const loginValidation=(req,res,next)=>{//middleware function
    const schema=Joi.object({//create schema
     email:Joi.string().email().required(),
     password:Joi.string().min(4).max(100).required()
    });
    const {error}=schema.validate(req.body);//validate the request body
    if(error){//if error return 400 status code
        return res.status(400).json({message:"Bad Request",error});
    }
    next();

};
module.exports={//export the functions
    signupValidation,
    loginValidation
}