const dotenv = require("dotenv");
const sendMail = require("../helpers/sendMail");
const path = require('path');
const Contribution = require(path.join(__dirname, '../models/Contribution'));

const { text } = require("express");
dotenv.config();

const contributionEmail = async () => {
  const contributions = await Contribution.find();

  const totalContribution=contributions.reduce(
    (acc,contribution)=>acc+contribution.value,0
  )

  if(totalContribution > 10000){
    let messageOption={
        from:process.env.EMAIL,
        to:process.env.ADMIN_EMAIL,
        subject:"Warning",
        text:'Your total contributions is ${totalContribution}. please review the contributions'
    };
    await sendMail(messageOption);
  }


};

module.exports = contributionEmail;
