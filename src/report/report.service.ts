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
    if(createReportDto.phone == ""){
      createReportDto.phone = "nf";
    }
    if(createReportDto.address == ""){
      createReportDto.address = "nf";
    }
    const newReport = new this.ReportModule(createReportDto);
    
    const result = await newReport.save();
    return result;
  }

  findAll() {
    return this.ReportModule.find({}).exec()
  }

  async findOne(id: string) {
    return await this.ReportModule.findOne({_id: id}).exec()
  }

  async remove(id: number) {
    return await this.ReportModule.remove({_id: id}).exec();
  }
}
