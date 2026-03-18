import { Injectable } from '@nestjs/common';
import { ClinicsRepository } from './clinics.repository';
import type { CreateClinicInput, UpdateClinicInput } from '@praxis/core/domain';

@Injectable()
export class ClinicsService {
  constructor(private readonly repository: ClinicsRepository) {}

  async create(data: CreateClinicInput) {
    return this.repository.create(data);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: string){
    return this.repository.findById(id)
  }
  async update(id: string, data: UpdateClinicInput){
    return this.repository.update(id, data)
  }
  async delete(id: string){
    return this.repository.delete(id)
  }
}