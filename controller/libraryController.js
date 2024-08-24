const { Book } = require("../model/bookModel");
const { Library } = require("../model/libraryModel");
const i18n = require('../config/i18nconfig');

const allLibraries = async (req, res) => {
    try {
        const libraries = await Library.find().populate({
            path: 'books',
            populate: {
                path: 'author',
                model: 'user'  
            }
        });;
        res.status(200).json({
            status: 200,
            data: libraries,
            message: i18n.__({ phrase: "LIBRARY_FETCHED_SUCCESS", locale: req.user.language || 'en' }),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            data: [],
            message: i18n.__({ phrase: "SERVER_ERROR", locale: req.user.language || 'en' }),
        });
    }
};

const singleLibrary = async (req, res) => {
    try {
        const library = await Library.findById(req.params.id).populate({
            path: 'books',
            populate: [
                {
                    path: 'author',
                    model: 'user',  
                    select: 'username email'  
                },
                {
                    path: 'borrower',
                    model: 'user',  
                    select: 'username email'  
                }
            ]
        });

        if (!library) {
            return res.status(404).json({ 
                status: 404,
                data: [],
                message: i18n.__({ phrase: "LIBRARY_NOT_FOUND", locale: req.user.language || 'en' })
            });
        }

        res.status(200).json({
            status: 200,
            data: library,
            message: i18n.__({ phrase: "LIBRARY_FETCHED_SUCCESS", locale: req.user.language || 'en' }),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            data: [],
            message: i18n.__({ phrase: "SERVER_ERROR", locale: req.user.language || 'en' }),
        });
    }
};
const createLibrary = async (req, res) => {
    try {
        const { name, address } = req.body;
        if (!name || !address) {
            return res.status(400).json({ message: i18n.__({ phrase: "ALL_FIELDS_REQUIRED", locale: req.user.language || 'en' }) });
        }
        const newLibrary = new Library(req.body);
        await newLibrary.save();

        res.status(201).json({ message: i18n.__({ phrase: "LIBRARY_CREATED", locale: req.user.language || 'en' }), newLibrary });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            data: [],
            message: i18n.__({ phrase: "SERVER_ERROR", locale: req.user.language || 'en' }),
        });
    }
};

const addBooksInInventory = async (req, res) => {
    try {
        const { bookId } = req.body;
        const libraryId = req.params.id;

        const library = await Library.findById(libraryId);
        if (!library) {
            return res.status(404).json({ message: i18n.__({ phrase: "LIBRARY_NOT_FOUND", locale: req.user.language || 'en' }) });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: i18n.__({ phrase: "BOOK_NOT_FOUND", locale: req.user.language || 'en' }) });
        }

        if (book.library && !book.library.equals(libraryId)) {
            return res.status(400).json({ message: i18n.__({ phrase: "BOOK_ALREADY_BORROWED", locale: req.user.language || 'en' }) });
        }

        // Add book to the library's inventory
        library.books.push(bookId);
        await library.save();

        // Update book to set its library
        book.library = libraryId;
        await book.save();

        res.status(200).json({ message: i18n.__({ phrase: "BOOK_ADDED_TO_LIBRARY", locale: req.user.language || 'en' }), book });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            data: [],
            message: i18n.__({ phrase: "SERVER_ERROR", locale: req.user.language || 'en' }),
        });
    }
};

const removeBookFromInventory = async (req, res) => {
    try {
        const library = await Library.findById(req.params.id);
        const book = await Book.findById(req.params.bookId);

        if (!library) {
            return res.status(404).json({ message: i18n.__({ phrase: "LIBRARY_NOT_FOUND", locale: req.user.language || 'en' }) });
        }

        if (!book) {
            return res.status(404).json({ message: i18n.__({ phrase: "BOOK_NOT_FOUND", locale: req.user.language || 'en' }) });
        }

        library.books.pull(req.params.bookId);
        await library.save();

        book.library = null;
        await book.save();

        res.status(200).json({
            message: i18n.__({ phrase: "BOOK_REMOVED_FROM_LIBRARY", locale: req.user.language || 'en' }),
            library
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            data: [],
            message: i18n.__({ phrase: "SERVER_ERROR", locale: req.user.language || 'en' }),
        });
    }
};

module.exports = { createLibrary, allLibraries, singleLibrary, addBooksInInventory, removeBookFromInventory };