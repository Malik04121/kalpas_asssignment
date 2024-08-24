const { Book } = require("../model/bookModel");
const i18n = require('../config/i18nconfig');
const { bucket } = require("../config/firebaseconfig");

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({
            status: 200,
            data: books,
            message: i18n.__({ phrase: "BOOK_FETCHED_SUCCESS", locale: req.user.language || 'en' }),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            data: [],
            message: i18n.__({ phrase: "SERVER_ERROR", locale: req.user.language || 'en' }),
        });
    }
}

const getSingleBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author').populate('library');
        res.status(200).json({
            status: 200,
            data: book,
            message: i18n.__({ phrase: "BOOK_FETCHED_SUCCESS", locale: req.user.language || 'en' }),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            data: [],
            message: i18n.__({ phrase: "SERVER_ERROR", locale: req.user.language || 'en' }),
        });
    }
}
// const createBook = async (req, res) => {
//     try {
//         const { title, library, borrower, image } = req.body;
//         const book = new Book({
//             title,
//             author: req.user.userId,
//             library,
//             borrower,
//             image
//         });
//         await book.save();
//         res.status(201).json({ message: i18n.__({ phrase: "BOOK_CREATED", locale: req.user.language || 'en' }), book });
//     } catch (error) {

//         res.status(500).json({ message: i18n.__({ phrase: "SERVER_ERROR", locale: req.user.language || 'en' }) });
//     }
// };
const createBook = async (req, res) => {
    const { title, library, borrower, image } = req.body;
    try {
        
if (!req.file) {
    return res.status(400).json({
        status: 400,
        data: [],
        message: i18n.__({ phrase: "IMAGE_REQUIRED", locale: req.user.language || 'en' })
    });
}

// Upload image to Firebase
const blob = bucket.file(req.file.originalname);
const blobStream = blob.createWriteStream({
    metadata: {
        contentType: req.file.mimetype
    }
});

blobStream.on('error', (error) => {
    console.error(error);
    res.status(500).json({
        status: 500,
        data: [],
        message: i18n.__({ phrase: "IMAGE_UPLOAD_ERROR", locale: req.user.language || 'en' })
    });
});

blobStream.on('finish', async () => {
    await blob.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

    // Create a new book with the image URL
    const book = new Book({
        title,
        author: req.user.userId,
        library,
        borrower,
        image: publicUrl // Store the public URL of the image in the book document
    });

    await book.save();

    res.status(201).json({
        status: 201,
        data: book,
        message: i18n.__({ phrase: "BOOK_CREATED", locale: req.user.language || 'en' })
    });
});
blobStream.end(req.file.buffer);
    } catch (error) {

        res.status(500).json({ message: i18n.__({ phrase: "SERVER_ERROR", locale: req.user.language || 'en' }) });
    }
};


const updateBook = async (req, res) => {
    try {
        const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(202).json({
            status: 202,
            data: updateBook,
            message: i18n.__({ phrase: "BOOK_UPDATED", locale: req.user.language || 'en' }),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            data: [],
            message: i18n.__({ phrase: "SERVER_ERROR", locale: req.user.language || 'en' }),
        });
    }
}

const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(202).json({
            status: 202,
            data: [],
            message: i18n.__({ phrase: "BOOK_DELETED", locale: req.user.language || 'en' }),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            data: [],
            message: i18n.__({ phrase: "SERVER_ERROR", locale: req.user.language || 'en' }),
        });
    }
}

module.exports = { createBook, getAllBooks, getSingleBook, updateBook, deleteBook };
