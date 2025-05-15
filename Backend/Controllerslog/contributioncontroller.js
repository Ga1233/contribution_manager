const Contribution = require("../model/contribution");
const User = require("../model/User");
exports.createContribution = async (req, res) => {
  const { label, value, date } = req.body;
  const userId = req.user._id;
  try {
    const newContribution = new Contribution({
      label,
      value,
      date,
      userId,
    });
    await newContribution.save();
    res.status(201).json(newContribution);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllContribution = async (req, res) => {
  const userId = req.user._id;
  try {
    const contribution = await Contribution.find({ userId })
      .populate("userId", "name email")
      .select("label  value  date")
      .sort({ createdAt: -1 });
    res.status(200).json(contribution);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.updateContribution = async (req, res) => {
    const { label, value, date } = req.body;
    const userId = req.user._id;
    const { id } = req.params; 
  
    try {
      
      const contribution = await Contribution.findOne({ _id: id, userId });
  
      if (!contribution) {
        return res.status(404).json({ message: "Contribution not found" });
      }
  
      
      contribution.label = label || contribution.label;
      contribution.value = value || contribution.value;
      contribution.date = date || contribution.date;
  
      await contribution.save();
      res.status(200).json(contribution);
    } catch (error) {
      res.status(500).json({ message: "Failed to update contribution", error });
    }
  };
  
  exports.deleteContribution = async (req, res) => {
    const contributionId = req.params.id;
    const userId = req.user._id; 
  
    try {
      const contribution = await Contribution.findOne({ _id: contributionId, userId });
  
      if (!contribution) {
        return res.status(404).json({ message: "Contribution not found or unauthorized" });
      }
  
      await Contribution.deleteOne({ _id: contributionId });
      res.status(200).json({ message: "Contribution deleted successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  