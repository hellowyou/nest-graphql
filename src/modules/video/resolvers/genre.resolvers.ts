import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Query } from '@nestjs/common';
import { GenreService } from '../services/genre.service';
import { LoggerService } from '../../../common';

@Resolver('Genre')
export class GenreResolver {
  constructor(
    private readonly genreService: GenreService,
    private readonly loggerService: LoggerService,
  ) {}

  @Query()
  genre(@Args('id') id) {
    return this.genreService.findOneById(id);
  }

  @Query()
  genres(@Args() args) {
    this.loggerService.debug({ args });
    return this.genreService.findGenres(args);
  }

  @Mutation()
  createGenre(@Args() { title, slug }) {
    return this.genreService.createGenre(title, slug);
  }

  @Mutation()
  updateGenre(@Args('data') { id, title, slug }) {
    return this.genreService.updateGenre(id, title, slug);
  }

  @Mutation()
  deleteGenre(@Args('id') id) {
    return this.genreService.deleteGenre(id);
  }
}
