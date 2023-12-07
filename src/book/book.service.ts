import { Injectable, NotFoundException, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  //Find all books
  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  // create new book
  async create(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  // Find book by Id
  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found.');
    }
    return book;
  }

  // Update book by Id
  async updateBookById(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  // Delete book
  async deleteBookById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id, {});
  }
}
