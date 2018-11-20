import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import { GenreEntity } from '../entities/genre.entity';

export interface IFindGenres {
  first: number;
  skip: number;
  after: number;
}

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
  ) {}

  findOneById(id: number | string): Promise<GenreEntity> {
    return this.genreRepository.findOne(id);
  }

  findGenres(options?: IFindGenres): Promise<GenreEntity[]> {
    const defaults = {
      skip: 0,
      first: 10,
    };

    const args = Object.assign({}, defaults, options);
    const query = this.genreRepository.createQueryBuilder();

    query.limit(args.first).skip(args.skip);

    if (args.after) {
      query.where('id > :id', { id: options.after });
    }

    return query.getMany();
  }

  async createGenre(title: string, slug?: string): Promise<GenreEntity> {
    const genre = this.genreRepository.create();
    genre.title = title;
    genre.slug = await this.generateSlug(title, slug);

    return this.genreRepository.save(genre);
  }

  async updateGenre(
    id: number | string,
    title?: string,
    slug?: string,
  ): Promise<GenreEntity> {
    const genre = await this.findOneById(id);
    genre.title = title;
    genre.slug = await this.generateSlug(title, slug);

    return this.genreRepository.save(genre);
  }

  async deleteGenre(id: number | string): Promise<GenreEntity> {
    return this.genreRepository.remove(
      await this.genreRepository.findOneOrFail(id),
    );
  }

  slugExists(slug: string): Promise<boolean> {
    return this.genreRepository.count({ slug }).then(number => Boolean(number));
  }

  protected async generateSlug(title: string, proposedSlug?: string) {
    let slug = '';
    if (proposedSlug && slugify(proposedSlug) === proposedSlug) {
      slug = proposedSlug;
    } else {
      slug = slugify(title);
    }

    for (let i = 0; i < 10; i++) {
      // If the slug does not exists then make this as the slug.
      if (!(await this.slugExists(slug))) {
        break;
      }

      if (9 === i) {
        throw new Error(`Could not generate slug for ${title}`);
      }

      slug = slugify([slug, i + 1].join(' '));
    }

    return slug;
  }
}
