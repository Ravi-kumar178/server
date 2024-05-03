const mailSender = require("../utils/mailSender");

require("dotenv").config();
//contact us controller
exports.contactUs = async(req,res)=>{
    try{
        //fetch details 
        const {firstName,lastName,email,phoneNumber,message} = req.body;
        //validate
        if(!firstName || !email || !phoneNumber || !message){
            return res.status({
                success: false,
                message: "All fields are mandatory"
            });
        }

        const options = {
            firstName,lastName,email,phoneNumber,message
        }
        //send mail to us
        mailSender(process.env.MAIL_USER,"StudyNotion- Contact us",options);
        //send mail to user
        mailSender(email,"StudyNotion-Query Department","StudyNotion took your query in very serious way!!! we will look into that what can we do");
        //return res-> success
        return res.status(200).json({
            success: true,
            message:"Contact us successfully",
            data: options
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message:"Server while Contacting"
        })
    }
}