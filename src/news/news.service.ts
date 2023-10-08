import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createNewsDto: CreateNewsDto) {
    const { title, content, author, publishDate, clubId } = createNewsDto;
    const publishDateValidated = new Date(publishDate);

    const news = await this.prismaService.news.create({
      data: {
        title,
        content,
        author,
        publishDate: publishDateValidated,
        clubId,
      },
    });
    return news;
  }

  async findAll() {
    const news = await this.prismaService.news.findMany();
    return news;
  }

  async findOne(id: string) {
    const news = await this.prismaService.news.findUnique({ where: { id } });
    return news;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    const { title, content, author, publishDate, clubId } = updateNewsDto;

    const news = await this.prismaService.news.update({
      where: { id },
      data: {
        title,
        content,
        author,
        publishDate,
        clubId,
      },
    });
    return news;
  }

  async remove(id: string) {
    const news = await this.prismaService.news.delete({
      where: { id },
    });
    return news;
  }
}
