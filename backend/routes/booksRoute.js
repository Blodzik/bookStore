import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route to save a new book
router.post('/', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;

        if (!title || !author || !publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }

        const newBook = { title, author, publishYear };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


//Get for get all books from database

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();

        return res.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

//Get one book from database

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

//Route for update a book
router.put('/:id', async (req, res) => {
    try{
        const { title, author, publishYear } = req.body;

        if (!title || !author || !publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const { id } = req.params;
        
        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result) {
            return res.status(404).json({ message: 'Book not found' });
        } else {
            return res.status(200).send({ message: 'Book updated successfully' })
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

//Route for deleting a book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result) {
            return res.status(404).json({ message: 'Book not found' });
        } else {
            return res.status(200).send({ message: 'Book deleted successfully' })
        }
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: err.message })
    }
});

export default router;