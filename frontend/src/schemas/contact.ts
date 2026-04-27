import { z } from "zod";
import i18next from 'i18next'

export const contactSchema = z.object({
    firstName: z.string().min(1, { message: i18next.t('firstNameIsRequired', 'First name is required') }),
    lastName: z.string().min(1, { message: i18next.t('lastNameIsRequired', 'Last name is required') }),
    email: z.string().email({ message: i18next.t('invalidEmailAddress', 'Invalid email address') }),
    phone: z.string().min(1, { message: i18next.t('phoneNumberIsRequired', 'Phone number is required') }),
    branch: z.string().min(1, { message: i18next.t('branchIsRequired', 'Branch is required') }),
    message: z.string().min(1, { message: i18next.t('messageIsRequired', 'Message is required') }),
})

export type ContactSchema = z.infer<typeof contactSchema>;