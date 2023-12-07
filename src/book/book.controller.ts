import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { createBookDto } from './dto/Create-book.dto';
import { updateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  // Get all books
  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  // create new book
  @Post('new')
  async createBook(@Body() book: createBookDto): Promise<Book> {
    return this.bookService.create(book);
  }

  // get Book by id
  @Get(':id')
  async getBookById(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.bookService.findById(id);
  }

  // udpate Book by id
  @Put(':id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    book: updateBookDto,
  ): Promise<Book> {
    return this.bookService.updateBookById(id, book);
  }

  // Delete book
  @Delete(':id')
  async deleteBookById(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.bookService.deleteBookById(id)
  }
}
