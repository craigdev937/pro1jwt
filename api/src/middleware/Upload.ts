import express from "express";
import fs from "fs";
import multer from "multer";

// Multer Configuration.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync("uploads")) {
            fs.mkdirSync("uploads", { recursive: true })
        };
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const fileFilter = (
    req: express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    const ALLOWED_MIME_TYPES = [
        "image/svg+xml", "image/jpeg", 
        "image/png", "image/gif", 
        "image/webp", "application/pdf",
    ];
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`
            Unsupported File Type: ${file.mimetype}
        `));
    };
};

export const UP = multer({
    storage, fileFilter, limits: {
        fileSize: 5 * 1024 * 1024,  //  5 MB.
    },
});




