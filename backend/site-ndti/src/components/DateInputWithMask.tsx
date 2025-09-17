'use client'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useField, FieldLabel } from '@payloadcms/ui'
import type { DateFieldClientComponent } from 'payload'

// Componente de ícone SVG do calendário
const CalendarIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="calendar-svg-icon"
  >
    <rect x="3" y="4" width="18" height="15" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
)

// CSS personalizado para o tema
const dateInputStyles = `
  .date-input-themed {
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    outline: none !important;
  }
  
  .date-input-themed:hover {
    border-color: #999999 !important;
  }
  
  /* Calendário personalizado */
  .calendar-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }
  
  .calendar-inline {
    position: absolute;
    left: 0;
    top: 100%;
    margin-top: 2px;
    z-index: 10;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 12px;
    min-width: 240px;
    max-height: 280px;
    overflow: hidden;
    color: #000000;
  }
  
  /* Tema escuro para calendário */
  @media (prefers-color-scheme: dark) {
    .calendar-inline {
      background: #222222 !important;
      border-color: #444444 !important;
      color: #ffffff !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
    }
  }
  
  .dark .calendar-inline,
  [data-theme="dark"] .calendar-inline {
    background: #222222 !important;
    border-color: #444444 !important;
    color: #ffffff !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
  }
  
  .light .calendar-inline,
  [data-theme="light"] .calendar-inline {
    background: #ffffff !important;
    border-color: #e0e0e0 !important;
    color: #000000 !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  }
  
    .calendar-icon {
    position: absolute !important;
    right: 8px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    cursor: pointer !important;
    z-index: 5 !important;
    padding: 4px !important;
    border-radius: 3px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: all 0.2s ease-in-out !important;
    opacity: 0;
    animation: fadeInIcon 0.3s ease-in-out forwards;
  }
  
  @keyframes fadeInIcon {
    from {
      opacity: 0;
      transform: translateY(-50%) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }
  }
  
  .calendar-svg-icon {
    width: 16px;
    height: 16px;
    color: #303030;
    transition: color 0.2s ease;
  }
  
  .calendar-icon:hover .calendar-svg-icon {
    color: #000000;
  }
  
  /* Tema escuro para ícone do calendário */
  @media (prefers-color-scheme: dark) {
    .calendar-svg-icon {
      color: #ffffff !important;
    }
    
    .calendar-icon:hover .calendar-svg-icon {
      color: #cccccc !important;
    }
  }
  
  .dark .calendar-svg-icon,
  [data-theme="dark"] .calendar-svg-icon {
    color: #ffffff !important;
  }
  
  .dark .calendar-icon:hover .calendar-svg-icon,
  [data-theme="dark"] .calendar-icon:hover .calendar-svg-icon {
    color: #cccccc !important;
  }
  
  .light .calendar-svg-icon,
  [data-theme="light"] .calendar-svg-icon {
    color: #303030 !important;
  }
  
  .light .calendar-icon:hover .calendar-svg-icon,
  [data-theme="light"] .calendar-icon:hover .calendar-svg-icon {
    color: #000000 !important;
  }
  
  .input-with-calendar {
    position: relative;
  }
  
  .input-with-calendar input {
    padding-right: 280px !important;
  }
  
  /* Estilos para o calendário simples */
  .simple-calendar {
    font-family: inherit;
    font-size: 12px;
  }
  
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  
  .calendar-nav-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 3px;
    color: #000000;
    font-size: 14px;
  }
  
  .calendar-nav-button:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  
  /* Tema escuro para botões de navegação */
  @media (prefers-color-scheme: dark) {
    .calendar-nav-button {
      color: #ffffff !important;
    }
    
    .calendar-nav-button:hover {
      background: rgba(255, 255, 255, 0.1) !important;
    }
  }
  
  .dark .calendar-nav-button,
  [data-theme="dark"] .calendar-nav-button {
    color: #ffffff !important;
  }
  
  .dark .calendar-nav-button:hover,
  [data-theme="dark"] .calendar-nav-button:hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }
  
  .light .calendar-nav-button,
  [data-theme="light"] .calendar-nav-button {
    color: #000000 !important;
  }
  
  .light .calendar-nav-button:hover,
  [data-theme="light"] .calendar-nav-button:hover {
    background: rgba(0, 0, 0, 0.1) !important;
  }
  
  .calendar-month-year {
    font-weight: 500;
    font-size: 11px;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  
  .month-year-selector {
    position: relative;
    display: inline-block;
  }
  
  .month-year-button {
    background: none;
    border: none;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    padding: 4px 6px;
    border-radius: 3px;
    color: inherit;
    transition: background-color 0.2s ease;
    text-transform: capitalize;
  }
  
  .month-year-button:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  
  /* Tema escuro para botões de mês/ano */
  @media (prefers-color-scheme: dark) {
    .month-year-button:hover {
      background: rgba(255, 255, 255, 0.1) !important;
    }
  }
  
  .dark .month-year-button:hover,
  [data-theme="dark"] .month-year-button:hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }
  
  .light .month-year-button:hover,
  [data-theme="light"] .month-year-button:hover {
    background: rgba(0, 0, 0, 0.1) !important;
  }
  
  .selector-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 20;
    max-height: 150px;
    overflow-y: auto;
    min-width: 80px;
  }
  
  /* Tema escuro para dropdown */
  @media (prefers-color-scheme: dark) {
    .selector-dropdown {
      background: #333333 !important;
      border-color: #555555 !important;
      color: #ffffff !important;
    }
  }
  
  .dark .selector-dropdown,
  [data-theme="dark"] .selector-dropdown {
    background: #333333 !important;
    border-color: #555555 !important;
    color: #ffffff !important;
  }
  
  .light .selector-dropdown,
  [data-theme="light"] .selector-dropdown {
    background: #ffffff !important;
    border-color: #e0e0e0 !important;
    color: #000000 !important;
  }
  
  .selector-item {
    padding: 6px 10px;
    cursor: pointer;
    font-size: 10px;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    color: inherit;
    transition: background-color 0.2s ease;
  }
  
  .selector-item:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  
  /* Tema escuro para dropdown items */
  @media (prefers-color-scheme: dark) {
    .selector-item:hover {
      background: rgba(255, 255, 255, 0.1) !important;
    }
  }
  
  .dark .selector-item:hover,
  [data-theme="dark"] .selector-item:hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }
  
  .light .selector-item:hover,
  [data-theme="light"] .selector-item:hover {
    background: rgba(0, 0, 0, 0.1) !important;
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }
  
  .calendar-day-header {
    text-align: center;
    font-size: 10px;
    font-weight: 500;
    padding: 4px 2px;
    color: #666666;
  }
  
  /* Tema escuro para cabeçalhos dos dias */
  @media (prefers-color-scheme: dark) {
    .calendar-day-header {
      color: #cccccc !important;
    }
  }
  
  .dark .calendar-day-header,
  [data-theme="dark"] .calendar-day-header {
    color: #cccccc !important;
  }
  
  .light .calendar-day-header,
  [data-theme="light"] .calendar-day-header {
    color: #666666 !important;
  }
  
  /* Domingo vermelho (primeira coluna) */
  .calendar-day-header:first-child {
    color: #e74c3c !important;
    font-weight: 600 !important;
  }
  
  /* Tema escuro - domingo vermelho mais claro */
  @media (prefers-color-scheme: dark) {
    .calendar-day-header:first-child {
      color: #ff6b6b !important;
    }
  }
  
  .dark .calendar-day-header:first-child,
  [data-theme="dark"] .calendar-day-header:first-child {
    color: #ff6b6b !important;
  }
  
  .light .calendar-day-header:first-child,
  [data-theme="light"] .calendar-day-header:first-child {
    color: #e74c3c !important;
  }
  
  .calendar-day {
    text-align: center;
    padding: 4px 2px;
    cursor: pointer;
    border-radius: 3px;
    font-size: 10px;
    border: none;
    background: none;
    color: #000000;
    min-height: 20px;
    width: 100%;
  }
  
  .calendar-day:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  
  /* Tema escuro para dias do calendário */
  @media (prefers-color-scheme: dark) {
    .calendar-day {
      color: #ffffff !important;
    }
    
    .calendar-day:hover {
      background: rgba(255, 255, 255, 0.1) !important;
    }
  }
  
  .dark .calendar-day,
  [data-theme="dark"] .calendar-day {
    color: #ffffff !important;
  }
  
  .dark .calendar-day:hover,
  [data-theme="dark"] .calendar-day:hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }
  
  .light .calendar-day,
  [data-theme="light"] .calendar-day {
    color: #000000 !important;
  }
  
  .light .calendar-day:hover,
  [data-theme="light"] .calendar-day:hover {
    background: rgba(0, 0, 0, 0.1) !important;
  }
  
  .calendar-day.selected {
    background: #0066cc;
    color: white;
  }
  
  .calendar-day.typed-day {
    background: #e6f3ff !important;
    border: 2px solid #0066cc !important;
    color: #0066cc !important;
    font-weight: 600 !important;
  }
  
  /* Tema escuro para dia digitado */
  @media (prefers-color-scheme: dark) {
    .calendar-day.typed-day {
      background: rgba(0, 102, 204, 0.2) !important;
      border: 2px solid #4da6ff !important;
      color: #4da6ff !important;
    }
  }
  
  .dark .calendar-day.typed-day,
  [data-theme="dark"] .calendar-day.typed-day {
    background: rgba(0, 102, 204, 0.2) !important;
    border: 2px solid #4da6ff !important;
    color: #4da6ff !important;
  }
  
  .light .calendar-day.typed-day,
  [data-theme="light"] .calendar-day.typed-day {
    background: #e6f3ff !important;
    border: 2px solid #0066cc !important;
    color: #0066cc !important;
    font-weight: 600 !important;
  }
  
  .calendar-day.selected:hover {
    background: #0052a3;
  }
  
  .calendar-day.other-month {
    color: #cccccc;
  }
  
  /* Tema escuro para dias de outros meses */
  @media (prefers-color-scheme: dark) {
    .calendar-day.other-month {
      color: #666666 !important;
    }
  }
  
  .dark .calendar-day.other-month,
  [data-theme="dark"] .calendar-day.other-month {
    color: #666666 !important;
  }
  
  .light .calendar-day.other-month,
  [data-theme="light"] .calendar-day.other-month {
    color: #cccccc !important;
  }
  
  .calendar-day.today {
    background: rgba(0, 102, 204, 0.1);
    color: #0066cc;
    font-weight: 500;
  }
  
  /* Tema escuro para dia atual */
  @media (prefers-color-scheme: dark) {
    .calendar-day.today {
      background: rgba(0, 102, 204, 0.2) !important;
      color: #4da6ff !important;
    }
  }
  
  .dark .calendar-day.today,
  [data-theme="dark"] .calendar-day.today {
    background: rgba(0, 102, 204, 0.2) !important;
    color: #4da6ff !important;
  }
  
  .light .calendar-day.today,
  [data-theme="light"] .calendar-day.today {
    background: rgba(0, 102, 204, 0.1) !important;
    color: #0066cc !important;
  }
  
  /* Estilo para o asterisco vermelho de campos obrigatórios */
  .field-type.date .field-label .required-indicator,
  .field-type.date .field-label::after,
  .field-type.date label .required-indicator,
  .field-type.date label::after,
  .field-type.date .field-label-wrapper .required,
  .field-type.date .field-label-wrapper .required-indicator,
  .field-type.date label .required,
  .field-type.date label span[data-required="true"],
  .field-type.date .field-label span[data-required="true"] {
    color: #DA4B48 !important;
  }
  
  /* Asterisco global para todos os campos de data */
  .field-type.date * {
    --required-color: #DA4B48;
  }
  
  .field-type.date .field-label *:contains("*"),
  .field-type.date label *:contains("*") {
    color: #DA4B48 !important;
  }
  
  /* Espaçamento personalizável entre label e campo */
  /* Para ajustar o espaçamento, modifique o valor em --label-spacing no componente */
  /* Valores sugeridos: 4px (mais próximo), 8px (padrão), 12px (médio), 16px (mais distante) */
  .field-type.date .field-label,
  .field-type.date label {
    margin-bottom: var(--label-spacing, 8px) !important;
    padding-bottom: 0 !important;
  }
  
  .field-type.date .date-time-field {
    margin-top: var(--label-spacing, 8px) !important;
    padding-top: 0 !important;
  }
  
  /* Força o espaçamento com seletores mais específicos */
  div[style*="--label-spacing"] .field-label,
  div[style*="--label-spacing"] label {
    margin-bottom: var(--label-spacing) !important;
  }
  
  div[style*="--label-spacing"] .date-time-field {
    margin-top: var(--label-spacing) !important;
  }
  
  /* Tema claro (padrão) */
  .date-input-themed {
    background-color: #ffffff !important;
    color: #000000 !important;
    border: 1px solid #e0e0e0 !important;
  }
  
  .date-input-themed::placeholder {
    color: #2f2f2f !important;
    opacity: 1 !important;
  }
  
  /* Tema escuro */
  @media (prefers-color-scheme: dark) {
    .date-input-themed {
      background-color: #222222 !important;
      color: #ffffff !important;
      border: 1px solid #444444 !important;
    }
    
    .date-input-themed:hover {
      border-color: #666666 !important;
    }
    
    .date-input-themed:focus {
      border: 1px solid #ffffff !important;
      box-shadow: none !important;
    }
    
    .date-input-themed::placeholder {
      color: #ffffff !important;
      opacity: 1 !important;
    }
  }
  
  /* Se o Payload usar classes específicas para tema escuro */
  .dark .date-input-themed,
  [data-theme="dark"] .date-input-themed {
    background-color: #222222 !important;
    color: #ffffff !important;
    border: 1px solid #444444 !important;
  }
  
  .dark .date-input-themed:hover,
  [data-theme="dark"] .date-input-themed:hover {
    border-color: #666666 !important;
  }
  
  .dark .date-input-themed:focus,
  [data-theme="dark"] .date-input-themed:focus {
    border: 1px solid #8d8d8d !important;
    box-shadow: none !important;
  }
  
  .dark .date-input-themed::placeholder,
  [data-theme="dark"] .date-input-themed::placeholder {
    color: #ffffff !important;
    opacity: 1 !important;
  }
  
  /* Se o Payload usar classes específicas para tema claro */
  .light .date-input-themed,
  [data-theme="light"] .date-input-themed {
    background-color: #ffffff !important;
    color: #000000 !important;
    border: 1px solid #e0e0e0 !important;
  }
  
  .light .date-input-themed:focus,
  [data-theme="light"] .date-input-themed:focus {
    border: 1px solid #9A9A9A !important;
    box-shadow: none !important;
  }
  
  .light .date-input-themed::placeholder,
  [data-theme="light"] .date-input-themed::placeholder {
    color: #2f2f2f !important;
    opacity: 1 !important;
  }
  
  /* Regra padrão de foco quando não há classe específica de tema */
  .date-input-themed:focus {
    border: 1px solid #9A9A9A !important;
    box-shadow: none !important;
  }
`

// Adiciona os estilos ao documento se ainda não existirem
if (typeof window !== 'undefined' && !document.getElementById('date-input-theme-styles')) {
  const styleElement = document.createElement('style')
  styleElement.id = 'date-input-theme-styles'
  styleElement.textContent = dateInputStyles
  document.head.appendChild(styleElement)
}

// Função para aplicar máscara de data (dd/mm/aaaa)
const applyDateMask = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '')
  
  // Aplica a máscara progressivamente
  if (numbers.length <= 2) {
    return numbers
  } else if (numbers.length <= 4) {
    return `${numbers.slice(0, 2)}/${numbers.slice(2)}`
  } else {
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`
  }
}

// Função para validar se a data está no formato correto
const isValidDateFormat = (value: string): boolean => {
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/
  return dateRegex.test(value)
}

// Função para converter dd/mm/aaaa para yyyy-mm-dd (formato ISO)
const convertToISODate = (value: string): string => {
  if (!isValidDateFormat(value)) return ''
  
  const [day, month, year] = value.split('/')
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

// Função para converter yyyy-mm-dd ou timestamp para dd/mm/aaaa
const convertFromISODate = (value: string): string => {
  if (!value) return ''
  
  try {
    let dateString = value
    
    // Se o valor contém timestamp (formato: 2025-09-17 00:00:00+00 ou 2025-09-17T00:00:00.000Z)
    if (value.includes(' ') || value.includes('T')) {
      // Extrai apenas a parte da data (YYYY-MM-DD)
      dateString = value.split('T')[0].split(' ')[0]
    }
    
    // Processa a data no formato YYYY-MM-DD
    const [year, month, day] = dateString.split('-')
    if (year && month && day) {
      const numYear = parseInt(year)
      const numMonth = parseInt(month)
      const numDay = parseInt(day)
      
      // Valida se os valores são válidos
      if (numYear > 0 && numMonth >= 1 && numMonth <= 12 && numDay >= 1 && numDay <= 31) {
        return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
      }
    }
    
    return ''
  } catch {
    return ''
  }
}

export const DateInputWithMask: DateFieldClientComponent = (props) => {
  const { field, path } = props
  const { value, setValue } = useField({ path })
  
  const [inputValue, setInputValue] = useState(
    value ? convertFromISODate(value as string) : ''
  )
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    if (value) {
      try {
        let dateString = value as string
        
        // Se o valor contém timestamp, extrai apenas a parte da data
        if (dateString.includes(' ') || dateString.includes('T')) {
          dateString = dateString.split('T')[0].split(' ')[0]
        }
        
        const [year, month, day] = dateString.split('-')
        if (year && month && day) {
          return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
        }
      } catch {
        // Se houver erro na conversão, retorna null
      }
    }
    return null
  })
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [stylesLoaded, setStylesLoaded] = useState(false)
  const [showMonthSelector, setShowMonthSelector] = useState(false)
  const [showYearSelector, setShowYearSelector] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  // Sincroniza o input value quando o value do field muda
  useEffect(() => {
    setInputValue(value ? convertFromISODate(value as string) : '')
    
    // Atualiza selectedDate também
    if (value) {
      try {
        let dateString = value as string
        
        // Se o valor contém timestamp, extrai apenas a parte da data
        if (dateString.includes(' ') || dateString.includes('T')) {
          dateString = dateString.split('T')[0].split(' ')[0]
        }
        
        const [year, month, day] = dateString.split('-')
        if (year && month && day) {
          setSelectedDate(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)))
          // Atualiza o calendário para o mês da data
          setCurrentMonth(new Date(parseInt(year), parseInt(month) - 1, 1))
        }
      } catch {
        setSelectedDate(null)
        // Volta para o mês atual quando há erro
        const today = new Date()
        setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))
      }
    } else {
      setSelectedDate(null)
      // Volta para o mês atual quando não há valor
      const today = new Date()
      setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))
    }
  }, [value])

  // Ensure styles are loaded before showing the icon
  useEffect(() => {
    // Small delay to ensure CSS is applied
    const timer = setTimeout(() => {
      setStylesLoaded(true)
    }, 150)
    
    return () => clearTimeout(timer)
  }, [])

  // Função para lidar com o clique no campo de input
  const handleInputClick = () => {
    setShowCalendar(true)
  }

  // Função para selecionar mês
  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1))
    setShowMonthSelector(false)
  }

  // Função para selecionar ano
  const handleYearSelect = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1))
    setShowYearSelector(false)
  }

  // UseEffect para fechar calendário quando clicar fora ou focar em outros campos
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false)
        setShowMonthSelector(false)
        setShowYearSelector(false)
      }
    }

    const handleFocusChange = (event: FocusEvent) => {
      // Fecha o calendário se focar em outro elemento que não seja parte do nosso componente
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false)
        setShowMonthSelector(false)
        setShowYearSelector(false)
      }
    }

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('focusin', handleFocusChange)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('focusin', handleFocusChange)
    }
  }, [showCalendar])

  // Função para gerar o calendário
  const generateCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay()) // Início da semana

    const days = []
    const today = new Date()
    
    // Extrai o dia digitado do input para destacar
    const numbers = inputValue.replace(/\D/g, '')
    const typedDay = numbers.length >= 2 ? parseInt(numbers.slice(0, 2)) : null
    
    for (let i = 0; i < 42; i++) { // 6 semanas
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      
      const isCurrentMonth = date.getMonth() === month
      const isSelected = selectedDate && 
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      const isToday = 
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      
      // Destaca o dia que foi digitado (mesmo que a data não esteja completa)
      const isTypedDay = isCurrentMonth && typedDay && date.getDate() === typedDay

      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isSelected,
        isToday,
        isTypedDay
      })
    }

    return days
  }

  // Função para lidar com seleção de data no calendário
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    
    // Converte a data para formato ISO sem problemas de fuso horário
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    
    const isoDate = `${year}-${month}-${day}`
    const formattedDate = `${day}/${month}/${year}`
    
    setInputValue(formattedDate)
    setValue(isoDate)
    setShowCalendar(false)
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      // Busca por asteriscos em labels dentro do componente atual
      const parentElement = document.querySelector(`[data-path="${path}"]`) || 
                          document.querySelector('.field-type.date')
      
      if (parentElement) {
        // Busca por elementos que contenham asterisco
        const labels = parentElement.querySelectorAll('label, .field-label, .field-label-wrapper')
        labels.forEach(label => {
          if (label.textContent?.includes('*')) {
            // Aplica cor vermelha diretamente ao elemento que contém o asterisco
            const textNodes = Array.from(label.childNodes).filter(node => 
              node.nodeType === Node.TEXT_NODE && node.textContent?.includes('*')
            )
            
            textNodes.forEach(node => {
              if (node.parentElement) {
                node.parentElement.style.setProperty('color', '#DA4B48', 'important')
              }
            })
            
            // Também aplica aos spans que podem conter o asterisco
            const spans = label.querySelectorAll('span')
            spans.forEach(span => {
              if (span.textContent?.includes('*')) {
                span.style.setProperty('color', '#DA4B48', 'important')
              }
            })
          }
        })
      }
    }, 100)
    
    return () => clearTimeout(timer)
  }, [path])

  // Função para sincronizar calendário com input parcial
  const syncCalendarWithInput = useCallback((inputValue: string) => {
    const numbers = inputValue.replace(/\D/g, '')
    
    if (numbers.length === 0) {
      // Se não há números, volta para o mês atual
      const today = new Date()
      setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))
      return
    }
    
    if (numbers.length >= 2) {
      // Se temos pelo menos o dia
      const day = parseInt(numbers.slice(0, 2))
      let month = currentMonth.getMonth()
      let year = currentMonth.getFullYear()
      
      if (numbers.length >= 4) {
        // Se temos dia e mês
        month = parseInt(numbers.slice(2, 4)) - 1 // mês é 0-indexado
        
        if (numbers.length >= 6) {
          // Se temos dia, mês e pelo menos parte do ano
          const yearStr = numbers.slice(4, 8)
          if (yearStr.length === 4) {
            year = parseInt(yearStr)
          } else if (yearStr.length >= 2) {
            // Para anos com 2 dígitos, assume 20xx
            year = 2000 + parseInt(yearStr.slice(0, 2))
          }
        }
      }
      
      // Valida se o mês é válido (1-12)
      if (month >= 0 && month <= 11) {
        // Valida se o dia é válido para o mês/ano
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        if (day >= 1 && day <= daysInMonth) {
          const newDate = new Date(year, month, day)
          setCurrentMonth(new Date(year, month, 1))
          
          // Se a data estiver completa, seleciona também
          if (numbers.length >= 8) {
            setSelectedDate(newDate)
          }
        } else {
          // Se o dia não é válido, pelo menos atualiza o mês/ano
          setCurrentMonth(new Date(year, month, 1))
        }
      }
    } else {
      // Se temos menos de 2 dígitos, volta para o mês atual
      const today = new Date()
      setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))
    }
  }, [currentMonth])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = applyDateMask(e.target.value)
    setInputValue(maskedValue)

    // Sincroniza o calendário com o input (mesmo que incompleto)
    syncCalendarWithInput(maskedValue)

    // Se a data estiver completa e válida, atualiza o valor do campo
    if (isValidDateFormat(maskedValue)) {
      const isoDate = convertToISODate(maskedValue)
      setValue(isoDate)
      
      // Atualiza o calendário para refletir a data digitada
      const newDate = new Date(isoDate)
      if (!isNaN(newDate.getTime())) {
        setSelectedDate(newDate)
        setCurrentMonth(new Date(newDate.getFullYear(), newDate.getMonth(), 1))
      }
    } else if (maskedValue === '') {
      // Se o campo estiver vazio, limpa o valor e volta para o mês atual
      setValue(null)
      setSelectedDate(null)
      // Volta para o mês atual
      const today = new Date()
      setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))
    }
  }, [setValue, syncCalendarWithInput])

  const handleBlur = useCallback(() => {
    // Valida a data ao sair do campo
    if (inputValue && !isValidDateFormat(inputValue)) {
      setInputValue('')
      setValue(null)
      setSelectedDate(null)
      // Volta para o mês atual quando apaga uma data inválida
      const today = new Date()
      setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))
    }
  }, [inputValue, setValue])

  // Renderiza o campo customizado
  return (
    <div 
      className="field-type date" 
      style={{ '--label-spacing': '0px' } as React.CSSProperties}
    >
      <div style={{ marginBottom: '5px' }}>
        <FieldLabel
          label={field.label}
          required={field.required}
        />
      </div>
      <div 
        className="date-time-field"
        style={{ marginTop: '0px' } as React.CSSProperties}
      >
        <div className="calendar-wrapper" ref={calendarRef}>
          <div className="input-wrapper input-with-calendar">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onClick={handleInputClick}
              placeholder=" dd/mm/aaaa"
              maxLength={10}
              className="date-input date-input-themed"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                fontFamily: 'inherit',
                borderRadius: '3px'
              }}
            />
            
            {showCalendar && (
              <div className="calendar-inline simple-calendar">
                <div className="calendar-header">
                  <button
                    type="button"
                    className="calendar-nav-button"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                  >
                    ‹
                  </button>
                  <div className="calendar-month-year">
                    <div className="month-year-selector">
                      <button
                        type="button"
                        className="month-year-button"
                        onClick={() => setShowMonthSelector(!showMonthSelector)}
                      >
                        {currentMonth.toLocaleDateString('pt-BR', { month: 'short' })}
                      </button>
                      {showMonthSelector && (
                        <div className="selector-dropdown">
                          {[
                            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                          ].map((month, index) => (
                            <button
                              key={index}
                              type="button"
                              className="selector-item"
                              onClick={() => handleMonthSelect(index)}
                            >
                              {month}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="month-year-selector">
                      <button
                        type="button"
                        className="month-year-button"
                        onClick={() => setShowYearSelector(!showYearSelector)}
                      >
                        {currentMonth.getFullYear()}
                      </button>
                      {showYearSelector && (
                        <div className="selector-dropdown">
                          {Array.from({ length: 21 }, (_, i) => {
                            const year = new Date().getFullYear() - 10 + i
                            return (
                              <button
                                key={year}
                                type="button"
                                className="selector-item"
                                onClick={() => handleYearSelect(year)}
                              >
                                {year}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="calendar-nav-button"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                  >
                    ›
                  </button>
                </div>

                <div className="calendar-grid">
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
                    <div key={index} className="calendar-day-header">
                      {day}
                    </div>
                  ))}
                  
                  {generateCalendar().map((dayInfo, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`calendar-day ${
                        !dayInfo.isCurrentMonth ? 'other-month' : ''
                      } ${dayInfo.isSelected ? 'selected' : ''} ${
                        dayInfo.isToday ? 'today' : ''
                      } ${dayInfo.isTypedDay ? 'typed-day' : ''}`}
                      onClick={() => handleDateSelect(dayInfo.date)}
                    >
                      {dayInfo.day}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {stylesLoaded && (
              <span 
                className="calendar-icon"
                onClick={() => setShowCalendar(!showCalendar)}
                title={showCalendar ? "Fechar calendário" : "Abrir calendário"}
              >
                <CalendarIcon />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}