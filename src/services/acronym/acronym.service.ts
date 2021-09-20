import { Acronym, AcronymDocument } from './../../schemas/acronym.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';

@Injectable()
export class AcronymService {
  constructor(
    @InjectModel(Acronym.name) private acronymModel: Model<AcronymDocument>,
  ) { }

  async getAcronym(
    limit: number,
    from: number,
    search: string,
  ): Promise<{ acronyms: Array<Acronym>; count: number }> {
    const query = { value: new RegExp(`${search}`, 'i') };
    const count = await this.acronymModel.count(query);

    const data = await this.acronymModel
      .find(query)
      .skip(from)
      .limit(limit)
      .exec();

    return {
      acronyms: data,
      count,
    };
  }

  createAcronym(acronym: Acronym): Promise<any> {
    return this.acronymModel.create(acronym);
  }

  updateAcronym(
    acronym: Acronym,
    acronymKey: string,
  ): UpdateQuery<AcronymDocument> {
    return this.acronymModel.updateOne({ key: acronymKey }, acronym);
  }

  deleteAcronym(acronymKey: string): UpdateQuery<AcronymDocument> {
    return this.acronymModel.deleteOne({ key: acronymKey });
  }
}
