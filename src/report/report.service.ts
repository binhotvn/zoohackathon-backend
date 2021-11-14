import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportDocument } from './schemas/report.schema';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel('Report') private ReportModule: Model<ReportDocument>
  ){

  }
  async create(createReportDto: CreateReportDto) {
    const newReport = new this.ReportModule(createReportDto);
    const result = await newReport.save();
    return result;
  }

  findAll() {
    return `This action returns all report`;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
