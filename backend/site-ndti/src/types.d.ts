// Declarações de tipos para imports do PayloadCMS
declare module '@payloadcms/next/css' {
  // Este é um import side-effect apenas para CSS
  const content: any;
  export = content;
}

// Outras declarações de tipos que podem ser necessárias
declare module '*.css' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.sass' {
  const content: { [className: string]: string };
  export = content;
}