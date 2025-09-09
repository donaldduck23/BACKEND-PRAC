import Mailgen from "mailgen";
import nodemailer from "nodemailer"


//genrate mail 

const emailVerificationMailgenContent = (username,verificationUrl)=>
{
    return {
        body :{
            name : username , 
            intro : "Welcome to our website",
            action : {
                instructions : "To verify your email please Cick on the button below ",
                button :{
                    text : "verify Your Email" ,
                    link : verificationUrl , 
                    color : "#008000"
                },
            },
            outro : "Need Help or have question Repy to The Email please "  
        },
    };
};

const forgotPasswordMailgenContent = (username,passwordResetUrl)=>
{
    return {
        body :{
            name : username , 
            intro : "We got request to reset password of your account",
            action : {
                instructions : "To Change Pssword please Cick on the button below ",
                button :{
                    text : "Reset password" ,
                    link : passwordResetUrl , 
                    color : "#008000"
                },
            },
            outro : "Need Help or have question Repy to The Email please " 
        },
    };
};


//send email 

const sendEmail = async (options) =>{
    const mailGenrator = new Mailgen({
        theme : "Default",
        product : {
            name : "Task Manager",
            link : "https://taskmanagelink.com"
        }
    })

   const emailTextual = mailGenrator.generatePlaintext(options.mailgenContent)
   const emailHtml = mailGenrator.generate(options.mailgenContent)
     const transporter =  nodemailer.createTransport({
            host : process.env.MAILTRAP_SMTP_HOST,
            port :  process.env.MAILTRAP_SMTP_POST , 
            auth : {
                user :  process.env.MAILTRAP_SMTP_USER,
                pass :  process.env.MAILTRAP_SMTP_PASS 
            }
        })


        const mail = {
            from : "mail.taskmanager@example.com" , 
            to : options.email,
            subject : options.subject ,
            text : emailTextual,
            html : emailHtml
        }

        try {
            await transporter.sendMail(mail)
        } catch (error) {
        console.error("Email Service Failed May be because of credentials of mailtrap in .env ")            
        console.error("error",error)
    }
}

export {emailVerificationMailgenContent,
forgotPasswordMailgenContent,
sendEmail }