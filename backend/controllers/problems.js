const Problem = require("../models/Problem");
const executeCpp = require('../judges/executeCpp');
const executePy = require("../compiler/executePython");
const generateFile = require('../compiler/generateFile');
const path = require("path");

exports.addProblem = async (req, res) => {
    try {
        let problem = new Problem({...req.body, slug: "a"});
        await problem.save();
        res.status(201).json({
            success: true,
            message: "Prblem added successfully",
            problem
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find({});

        return res.status(200).json({
            success: true,
            message: "Problems fetched successfully",
            data: problems
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

exports.getProblem = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(400).json({
                success: false,
                message: "Id not found",
            });
        }

        const problem = await Problem.findById(id);

        return res.status(200).json({
            success: true,
            message: "Problem fetched successfully",
            problem
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.checkProblem = async (req, res) => {
    try {
        let slug = req.params.slug;
        const problem = await Problem.findOne({ slug });
        //console.log(problem.output);
        if (!problem) {
            return res.status(400).json({ 
                success: false,
                message: "No Problem Found" 
            });
        }
        // else return res.status(200).json(problem);
        const { lang, code } = req.body;
        if (!code) {
            return res.status(400).json({ 
                success: false,
                message: "Empty Code Body" 
            });
        }


        const filePath = await generateFile(lang, code);
        // console.log("File path", filePath);
        
        var inputPath = `${path.join(__dirname, '../inputs/')}`;
        inputPath=inputPath+`${slug}.txt`;
        let userOutput;
        if (lang === "cpp") {
            console.log("input path", inputPath);
            userOutput = await executeCpp(filePath, inputPath);
        }
        else if (lang == "py") {
            userOutput = await executePy(filePath, inputPath);
        }
        // console.log("aa", userOutput)
        userOutput = userOutput.trim()
        console.log(JSON.stringify(userOutput));
        console.log("---");
        console.log(JSON.stringify(problem.output));
        
        if (userOutput === problem.output) {
            return res.status(200).json({
                success: true,
                message: "All test case passed",
                output: userOutput
            })
        }
        else {
            return res.status(200).json({
                success: false,
                output: userOutput,
                message: "Failing in Hidden Test Case",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error,
        });
    }
};