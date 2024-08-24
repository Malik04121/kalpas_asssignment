const { Book } = require("../model/bookModel");
const i18n = require('../config/i18nconfig');

const borrowBook = async (req, res) => {
    try {
        const { bookId, amount } = req.body;
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({
                status: 404,
                data: [],
                message: i18n.__({ phrase: "BOOK_NOT_FOUND", locale: req.user.language || 'en' })
            });
        }

        if (book.borrower) {
            return res.status(400).json({
                status: 400,
                data: [],
                message: i18n.__({ phrase: "BOOK_ALREADY_BORROWED", locale: req.user.language || 'en' })
            });
        }

        book.borrower = req.user.userId; 
        await book.save();

        res.status(200).json({
            status: 200,
            data: book,
            message: i18n.__({ phrase: "BOOK_BORROWED_SUCCESS", locale: req.user.language || 'en' })
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            data: [],
            message: i18n.__({ phrase: "SERVER_ERROR", locale: req.user.language || 'en' })
        });
    }
};
const returnBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId).populate('library');

        if (!book) {
            return res.status(404).json({
                status: 404,
                data: [],
                message: i18n.__({ phrase: "BOOK_NOT_FOUND", locale: req.user.language || 'en' })
            });
        }

        const ObjectId = require('mongoose').Types.ObjectId;

        if (!book.borrower || !book.borrower.equals(new ObjectId(req.user.userId))) {
            return res.status(400).json({
                status: 400,
                data: [],
                message: i18n.__({ phrase: "NOT_BORROWER_OF_BOOK", locale: req.user.language || 'en' })
            });
        }
        

        // Update book to remove the borrower
        book.borrower = null;
        await book.save();

        res.status(200).json({
            status: 200,
            data: book,
            message: i18n.__({ phrase: "BOOK_RETURNED_SUCCESS", locale: req.user.language || 'en' })
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            data: [],
            message: i18n.__({ phrase: "SERVER_ERROR", locale: req.user.language || 'en' })
        });
    }
};

module.exports = { borrowBook, returnBook };