import { Controller, Post, Body, Get, UsePipes, Param, NotFoundException, Patch, Delete } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { createClinicSchema } from '@praxis/core/domain';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createClinicSchema))
  async create(@Body() data: any) {
    return this.clinicsService.create(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const clinic = await this.clinicsService.findById(id);
    if (!clinic) throw new NotFoundException('Clínica não encontrada');
    return clinic;
  }

  @Get()
  async findAll() {
    return this.clinicsService.findAll();
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(createClinicSchema.partial()))
  async update(@Param('id') id: string, @Body() data: any) {
    return this.clinicsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clinicsService.delete(id);
  }
}
