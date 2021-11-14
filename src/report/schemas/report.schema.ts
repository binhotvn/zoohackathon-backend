import { SchemaFactory } from '@nestjs/mongoose';
import { Report } from '../entities/report.entity';

export type ReportDocument = Report & Document;

export const ReportSchema = SchemaFactory.createForClass(Report);
