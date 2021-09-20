import { JwtAuthGuard } from './../../guards/auth.guard';
import { AcronymDocument } from 'src/schemas/acronym.schema';
import { Acronym } from './../../schemas/acronym.schema';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AcronymService } from '../../services/acronym/acronym.service';
import { UpdateQuery } from 'mongoose';

interface PaginationQuery {
  from: string;
  limit: string;
  search: string;
}
@Controller()
export class AcronymController {
  constructor(private readonly acronymService: AcronymService) { }

  @Get('/acronym')
  async getAcronyns(@Query() query: PaginationQuery, @Res() res: Response) {
    const queryLimit = parseInt(query.limit);
    const queryFrom = parseInt(query.from);
    const data = await this.acronymService.getAcronym(
      queryLimit,
      queryFrom,
      query.search,
    );
    const hasMoreData =
      data.count - queryLimit - queryFrom > 0 ? 'true' : 'false';
    res.set('has-more-data', hasMoreData);
    res.json(data.acronyms);
    res.send();
  }

  @Post('/acronym')
  createAcronyns(@Body() body: Acronym): Promise<any> {
    return this.acronymService.createAcronym(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/acronym/:acronym')
  updateAcronyns(
    @Body() body: Acronym,
    @Param() params,
  ): UpdateQuery<AcronymDocument> {
    return this.acronymService.updateAcronym(body, params.acronym);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/acronym/:acronym')
  deleteAcronym(@Param() params): UpdateQuery<AcronymDocument> {
    return this.acronymService.deleteAcronym(params.acronym);
  }
}
