const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');
const path = require('path');
const Follow = require("../models/follow.model");
const Content = require('../models/content.model');

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = 'media';

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(containerName);

exports.uploadImage = async (req, res) => {
    try {
        const fileName = req.file.filename;
        const filePath = path.join(__dirname, 'uploads', fileName);
        const { contentId } = req.query;

        const blobClient = containerClient.getBlockBlobClient(fileName);

        const fileStream = fs.createReadStream(filePath);

        await blobClient.uploadStream(fileStream, req.file.size, 5, { blobHTTPHeaders: { blobContentType: req.file.mimetype } });

        fs.unlinkSync(filePath);

        const blobUrl = blobClient.url;

        await Content.update(
            { imgLink: blobUrl },
            { where: { Id: contentId } }
        ).then(() => {
            return res.status(200).json({ success: "Image uploaded successfully" });
        }).catch((err) => {
            console.log(err);
            return res.status(500).json({ error: "Internal server error, please contact administrators" });
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

