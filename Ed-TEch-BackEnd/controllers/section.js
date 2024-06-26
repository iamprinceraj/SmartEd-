const Course = require("../models/course");
const Section = require("../models/section");

// create section handler
exports.createSection = async (req, res) => {
  try {
    // fetch data from req body
    const { sectionName, courseId } = req.body;

    // chedk whether fields are empty or not
    if (!sectionName || !courseId) {
      return res.status(401).json({
        success: false,
        message: "fields are empty",
      });
    }

    // create new section entry in Db
    const newSection = await Section.create({ sectionName });

    // update course with section id

    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: newSection._id },
      },
      { new: true } // TODO: Populate
    );

    // send response with success flag
    res.status(200).json({
      success: true,
      message: "new Section Created successfully",
      updatedCourseDetails,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Cannot create section , error occured",
      updatedCourseDetails,
    });
  }
};

//  Update Section Handler
exports.updateSection = async (req, res) => {
  try {
    // fetch data from req body
    const { sectionName, sectionId } = req.body;

    // check whether data has been filled or not
    if (!sectionName || !sectionId) {
      return res.status(401).json({
        success: false,
        message: "fields are empty",
      });
    }

    // update section
    const section = await Section.findOneAndUpdate(
      sectionId,
      {
        $push: { sectionName },
      },
      { new: true } // todo populate
    );

    // return response
    res.status(200).json({
      success: true,
      message: "Section Updated Sucessfully ",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Cannot Update Section",
    });
  }
};

// Delete Section

exports.deleteSection = async (req, res) => {
  try {
    // fetch Date from Req.params  ..... cause id contains in params
    const { sectionId } = req.params;

    // find by id and delete
    await Section.findByIdAndDelete(sectionId);
    // TODO: do we need to delete section id from course schema

    // return respoonse
    res.status(200).json({
      success: true,
      message: "Section deleted Successfully ",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Cannot Delete Section",
    });
  }
};

// get section details
exports.getSectionDetails = async (req, res) => {
  try {
    // get sectionId from req body , to fetch all details
    const { sectionId } = req.body;

    // make a db call so and find data by sectionId
    const sectionDetails = await Section.find({ _id: sectionId }).populate(
      "SubSection"
    );

    // check if data fetched or not
    if (!sectionDetails) {
      return res.status(409).json({
        success: false,
        message: "Data not found by this sectionId",
      });
    }

    // return respoonse
    res.status(200).json({
      success: true,
      message: "all details of the section fetched Successfully ",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "something went wrong while fetching data",
    });
  }
};
