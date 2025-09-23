import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata uma data ISO string para o formato brasileiro (dd/mm/aaaa)
 * Trata corretamente o fuso horário para evitar diferença de dias
 */
export const formatDate = (dateString: string) => {
  // Se a data não tem informação de horário/timezone, assumimos que é uma data local
  let date: Date;
  
  if (dateString.includes('T') || dateString.includes('Z')) {
    // Data com horário, forçamos interpretação UTC para evitar problemas de timezone
    const utcDate = new Date(dateString);
    date = new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());
  } else {
    // Data simples (YYYY-MM-DD), criamos como data local
    const parts = dateString.split('-');
    date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  }
  
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo'
  });
};

/**
 * Formata uma data ISO string para o formato brasileiro com nome do mês (dd de mês de aaaa)
 * Trata corretamente o fuso horário para evitar diferença de dias
 */
export const formatDateLong = (dateString: string) => {
  // Se a data não tem informação de horário/timezone, assumimos que é uma data local
  let date: Date;
  
  if (dateString.includes('T') || dateString.includes('Z')) {
    // Data com horário, forçamos interpretação UTC para evitar problemas de timezone
    const utcDate = new Date(dateString);
    date = new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());
  } else {
    // Data simples (YYYY-MM-DD), criamos como data local
    const parts = dateString.split('-');
    date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  }
  
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo'
  });
};
