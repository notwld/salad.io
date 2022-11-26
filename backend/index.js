require('dotenv').config();

const express = require('express');
const app = express();
const uploadFile = require("./middleware");
const path = require("path");
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require("cors");
app.use(cors());

const upload = async (req, res) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

        res.status(200).send({
            message: "Uploaded the file successfully: ",
        });
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${err}`,
        });
    }
};

const getListFiles = (req, res) => {
    const directoryPath = path.join("public", "uploads");

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: path.join("public", "upload", file),
            });
        });

        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = path.join("public", "uploads");

    res.download(directoryPath + '/' + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

//routes

app.post("/upload", upload)
app.get("/files", getListFiles)
app.get("/files/:name", download)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

