import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Alterar a coluna start_date de varchar para timestamp com timezone
    -- Primeiro, criar uma coluna temporária
    ALTER TABLE "projects" ADD COLUMN "start_date_temp" timestamp(3) with time zone;
    
    -- Migrar dados existentes - converter strings de data para timestamp
    -- Assumindo que as datas estão em formato legível (ex: '2024-01-15' ou '15/01/2024')
    UPDATE "projects" 
    SET "start_date_temp" = 
      CASE 
        -- Se está no formato YYYY-MM-DD
        WHEN "start_date" ~ '^\d{4}-\d{2}-\d{2}$' THEN "start_date"::timestamp
        -- Se está no formato DD/MM/YYYY
        WHEN "start_date" ~ '^\d{2}/\d{2}/\d{4}$' THEN 
          TO_TIMESTAMP("start_date", 'DD/MM/YYYY')
        -- Se está no formato MM/DD/YYYY
        WHEN "start_date" ~ '^\d{2}/\d{2}/\d{4}$' THEN 
          TO_TIMESTAMP("start_date", 'MM/DD/YYYY')
        -- Para outros formatos, usar data atual como fallback
        ELSE CURRENT_TIMESTAMP
      END;
    
    -- Remover a coluna antiga
    ALTER TABLE "projects" DROP COLUMN "start_date";
    
    -- Renomear a coluna temporária
    ALTER TABLE "projects" RENAME COLUMN "start_date_temp" TO "start_date";
    
    -- Adicionar constraint NOT NULL
    ALTER TABLE "projects" ALTER COLUMN "start_date" SET NOT NULL;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Reverter: alterar de timestamp para varchar
    ALTER TABLE "projects" ADD COLUMN "start_date_temp" varchar;
    
    -- Converter timestamp para string no formato YYYY-MM-DD
    UPDATE "projects" 
    SET "start_date_temp" = TO_CHAR("start_date", 'YYYY-MM-DD');
    
    -- Remover a coluna de timestamp
    ALTER TABLE "projects" DROP COLUMN "start_date";
    
    -- Renomear a coluna temporária
    ALTER TABLE "projects" RENAME COLUMN "start_date_temp" TO "start_date";
    
    -- Adicionar constraint NOT NULL
    ALTER TABLE "projects" ALTER COLUMN "start_date" SET NOT NULL;
  `)
}