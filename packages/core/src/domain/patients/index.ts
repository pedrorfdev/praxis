import { z } from "zod";

const validateCpf = (cpf: string) => {
  const cleanCpf = cpf.replace(/\D/g, "");
  if (cleanCpf.length !== 11 || !!cleanCpf.match(/(\d)\1{10}/)) return false;
  const digits = cleanCpf.split("").map(Number);
  const calcDigit = (slice: number[]) => {
    const sum = slice.reduce(
      (acc, curr, i) => acc + curr * (slice.length + 1 - i),
      0,
    );
    const result = (sum * 10) % 11;
    return result === 10 ? 0 : result;
  };
  return (
    calcDigit(digits.slice(0, 9)) === digits[9] &&
    calcDigit(digits.slice(0, 10)) === digits[10]
  );
};

export const patientSchema = z.object({
  id: z.uuid(),
  clinicId: z.uuid(),
  type: z.enum(["ADULT", "CHILD"], {
    error: "O tipo do paciente deve ser 'ADULT' ou 'CHILD'"
  }),
  fullName: z
    .string()
    .min(3, "O nome do paciente deve ter no mínimo 3 caracteres")
    .max(120, "Nome muito longo"),
  birthDate: z.coerce.date({
    error: "Data de nascimento é obrigatória"
  }),
  gender: z.string().min(1, "Esse campo é obrigatório"),
  phone: z.string().min(10, "Telefone incompleto").nullable().optional(),
  
  address: z.string().min(5, "Endereço muito curto"),
  city: z.string().min(2, "Cidade muito curta"),

  responsibleName: z
    .string()
    .min(3, "Nome do responsável inválido")
    .nullable()
    .optional(),
  responsiblePhone: z
    .string()
    .min(10, "Telefone do responsável incompleto")
    .nullable()
    .optional(),

  cpf: z
    .string()
    .transform((v) => v?.replace(/\D/g, ""))
    .refine((v) => !v || validateCpf(v), { message: "CPF inválido" })
    .nullable()
    .optional(),

  birthPlace: z.string().min(1, "Esse campo é obrigatório"),
  maritalStatus: z.string().min(1, "Esse campo é obrigatório"),
  educationLevel: z.string().min(1, "Esse campo é obrigatório"),
  profession: z.string().min(1, "Esse campo é obrigatório"),
  religion: z.string().min(1, "Esse campo é obrigatório"),
  diagnosis: z.string().optional().nullable(),

  createdAt: z.date(),
  updatedAt: z.date(),
});


const basePatientSchema = patientSchema.omit({ 
  id: true,
  clinicId: true,
  createdAt: true, 
  updatedAt: true 
});

  export const createPatientSchema = basePatientSchema
  .superRefine((data, ctx) => {
    if (data.type === 'CHILD') {
      if (!data.responsibleName || data.responsibleName.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nome do responsável é obrigatório para crianças",
          path: ["responsibleName"],
        });
      }
      if (!data.responsiblePhone || data.responsiblePhone.length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Telefone do responsável é obrigatório",
          path: ["responsiblePhone"],
        });
      }
    }

    if (data.type === 'ADULT') {
      const fields = ['profession', 'maritalStatus', 'educationLevel', 'cpf'] as const;
      fields.forEach((field) => {
        if (!data[field] || data[field]!.length < 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Este campo é obrigatório para adultos",
            path: [field],
          });
        }
      });
    }
  });

export const updatePatientSchema = basePatientSchema.partial();

export type Patient = z.infer<typeof patientSchema>;
export type CreatePatientInput = z.infer<typeof createPatientSchema>;
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;