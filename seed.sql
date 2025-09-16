BEGIN;

INSERT INTO equipment (name, brand, model, acquisition_year, code, status, "created_at", "updated_at")
VALUES
  ('Notebook Dell', 'Dell', 'Latitude 5420', 2021, 'EQ-001', 'available', NOW(), NOW()),
  ('Projetor Epson', 'Epson', 'EB-S41', 2019, 'EQ-002', 'maintenance', NOW(), NOW()),
  ('Impressora HP', 'HP', 'LaserJet Pro M404dn', 2020, 'EQ-003', 'available', NOW(), NOW()),
  ('Monitor LG', 'LG', 'UltraWide 29WL500', 2022, 'EQ-004', 'unavailable', NOW(), NOW()),
  ('Câmera Canon', 'Canon', 'EOS Rebel T7', 2018, 'EQ-005', 'out_of_order', NOW(), NOW());

COMMIT;

-- Inicia uma transação para garantir que todos os comandos sejam executados com sucesso.
BEGIN;

-- Exemplo 1: Baseado na URL de uma foto de dois cachorros.
-- URL Original: https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg
INSERT INTO public.media(
  id, alt, updated_at, created_at, 
  url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y, 
  sizes_thumbnail_url, sizes_thumbnail_width, sizes_thumbnail_height, sizes_thumbnail_mime_type, sizes_thumbnail_filesize, sizes_thumbnail_filename, 
  sizes_card_url, sizes_card_width, sizes_card_height, sizes_card_mime_type, sizes_card_filesize, sizes_card_filename, 
  sizes_tablet_url, sizes_tablet_width, sizes_tablet_height, sizes_tablet_mime_type, sizes_tablet_filesize, sizes_tablet_filename
) VALUES 
(
  nextval('media_id_seq'::regclass), 'Dois cachorros da raça beagle olhando para cima, sentados na grama.', now(), now(),
  '/media/example.jpg', '/media/example.jpg', 'example.jpg', 'image/jpeg', 123456, 800, 600, 0.5, 0.5,
  '/media/example.jpg', 800, 600, 'image/jpeg', 123456, 'example.jpg',
  '/media/example.jpg', 800, 600, 'image/jpeg', 123456, 'example.jpg',
  '/media/example.jpg', 800, 600, 'image/jpeg', 123456, 'example.jpg'
);
INSERT INTO public.media(
  id, alt, updated_at, created_at, 
  url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y, 
  sizes_thumbnail_url, sizes_thumbnail_width, sizes_thumbnail_height, sizes_thumbnail_mime_type, sizes_thumbnail_filesize, sizes_thumbnail_filename, 
  sizes_card_url, sizes_card_width, sizes_card_height, sizes_card_mime_type, sizes_card_filesize, sizes_card_filename, 
  sizes_tablet_url, sizes_tablet_width, sizes_tablet_height, sizes_tablet_mime_type, sizes_tablet_filesize, sizes_tablet_filename
) VALUES 
(
  nextval('media_id_seq'::regclass), 'Raça dois beagle cachorros grama senada em cima na.', now(), now(),
  '/media/example.jpg', '/media/example.jpg', 'example1.jpg', 'image/jpeg', 123456, 800, 600, 0.5, 0.5,
  '/media/example.jpg', 800, 600, 'image/jpeg', 123456, 'example.jpg',
  '/media/example.jpg', 800, 600, 'image/jpeg', 123456, 'example.jpg',
  '/media/example.jpg', 800, 600, 'image/jpeg', 123456, 'example.jpg'
);
INSERT INTO public.media(
  id, alt, updated_at, created_at, 
  url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y, 
  sizes_thumbnail_url, sizes_thumbnail_width, sizes_thumbnail_height, sizes_thumbnail_mime_type, sizes_thumbnail_filesize, sizes_thumbnail_filename, 
  sizes_card_url, sizes_card_width, sizes_card_height, sizes_card_mime_type, sizes_card_filesize, sizes_card_filename, 
  sizes_tablet_url, sizes_tablet_width, sizes_tablet_height, sizes_tablet_mime_type, sizes_tablet_filesize, sizes_tablet_filename
) VALUES 
(
  nextval('media_id_seq'::regclass), 'Beagle dois cahorro na sentados grama para.', now(), now(),
  '/media/example.jpg', '/media/example.jpg', 'example2.jpg', 'image/jpeg', 123456, 800, 600, 0.5, 0.5,
  '/media/example.jpg', 800, 600, 'image/jpeg', 123456, 'example.jpg',
  '/media/example.jpg', 800, 600, 'image/jpeg', 123456, 'example.jpg',
  '/media/example.jpg', 800, 600, 'image/jpeg', 123456, 'example.jpg'
);


-- Confirma a transação.
COMMIT;

--Inicia uma transação.
BEGIN;

-- Notícia 1: Tipo 'evento', com descrição completa.
-- Usa a imagem dos cachorros (image_id = 1).
INSERT INTO public.news(id, title, description, image_id, "type", "date", updated_at, created_at)
VALUES(
  nextval('news_id_seq'::regclass), 
  'Parque da Sapucaia sedia 15ª Feira de Adoção de Animais', 
  'A 15ª edição da Feira de Adoção de Animais de Montes Claros acontecerá neste fim de semana no Parque Municipal da Sapucaia, buscando um lar para mais de 50 animais resgatados. O evento ocorrerá nos dias 13 e 14 de setembro, das 9h às 16h. Além da adoção, a feira contará com vacinação antirrábica gratuita e palestras sobre posse consciente. Para adotar, é necessário ser maior de 18 anos e apresentar documento de identidade e comprovante de residência.', 
  1, 
  'evento', 
  '2025-09-11', 
  now(), 
  now()
);

-- Notícia 2: Tipo 'projeto', com descrição completa.
-- Usa a imagem das montanhas (image_id = 2).
INSERT INTO public.news(id, title, description, image_id, "type", "date", updated_at, created_at)
VALUES(
  nextval('news_id_seq'::regclass), 
  'Projeto Rota dos Ipês incentiva o ecoturismo na Serra do Espinhaço', 
  'Uma nova iniciativa busca mapear e promover as rotas de floração dos ipês na Serra do Espinhaço, fortalecendo o turismo sustentável na região. O projeto "Rota dos Ipês", lançado pela secretaria de turismo, visa criar um roteiro focado na observação da floração, que ocorre anualmente entre agosto e setembro. O mapeamento inclui trilhas, mirantes estratégicos e pontos de apoio em comunidades rurais para organizar o fluxo de visitantes.', 
  2, 
  'projeto', 
  '2025-09-08', 
  now(), 
  now()
);

-- Notícia 3: Tipo 'edital', com descrição completa.
-- Usa a imagem do logo (image_id = 3).
INSERT INTO public.news(id, title, description, image_id, "type", "date", updated_at, created_at)
VALUES(
  nextval('news_id_seq'::regclass), 
  'InovaMOC lança edital para startups do agronegócio', 
  'O centro de inovação de Montes Claros, InovaMOC, publicou um novo edital para selecionar startups com soluções tecnológicas para o agronegócio. O edital nº 03/2025 busca projetos nas áreas de biotecnologia, automação agrícola e gestão de recursos hídricos, com inscrições abertas até 31 de outubro. As empresas selecionadas terão acesso a um programa de aceleração de seis meses, que inclui mentoria, networking e um aporte financeiro inicial.', 
  3, 
  'edital', 
  '2025-09-10', 
  now(), 
  now()
);

-- Confirma a transação.
COMMIT;

-- Inicia uma transação.
BEGIN;

-- Projeto 1: Usando a categoria correta 'Aplicativo Móvel' e com a descrição consolidada.
INSERT INTO public.projects(id, title, category, image_id, description, start_date, status, repository, updated_at, created_at)
VALUES(
  nextval('projects_id_seq'::regclass), 
  'MocBus: Monitoramento de Transporte Público', 
  'Aplicativo Móvel', 
  3, 
  'Aplicativo para Android e iOS que fornece horários e localização em tempo real dos ônibus de Montes Claros. Funcionalidades: Mapa em tempo real, busca de linhas e notificações de chegada. O projeto visa melhorar a experiência do usuário do transporte público com uma ferramenta confiável.', 
  '2024-03-15', 
  'Em Andamento', 
  'https://github.com/ndti/mocbus-app', 
  now(), 
  now()
);

-- Projeto 2: Usando a categoria correta 'Plataforma Web' e com a descrição consolidada.
INSERT INTO public.projects(id, title, category, image_id, description, start_date, status, repository, updated_at, created_at)
VALUES(
  nextval('projects_id_seq'::regclass), 
  'Plataforma AgroNorte: IA para o Agronegócio', 
  'Plataforma Web', 
  2, 
  'Plataforma que utiliza imagens de satélite e IA para monitorar lavouras e otimizar o uso de recursos hídricos no Norte de Minas. Funcionalidades: Análise de saúde da vegetação (NDVI), mapas de irrigação otimizada e alertas de pragas. O sistema auxilia produtores rurais na tomada de decisão.', 
  '2023-01-20', 
  'Concluído', 
  'https://github.com/ndti/agronorte-platform', 
  now(), 
  now()
);

-- Projeto 3: Usando a categoria correta 'Desenvolvimento Web' e com a descrição consolidada.
INSERT INTO public.projects(id, title, category, image_id, description, start_date, status, repository, updated_at, created_at)
VALUES(
  nextval('projects_id_seq'::regclass), 
  'Sistema de Gestão para a FENICS', 
  'Desenvolvimento Web', 
  1, 
  'Sistema web para gerenciar a inscrição de expositores, venda de ingressos e programação da Feira Nacional da Indústria, Comércio e Serviços (FENICS). Funcionalidades: Cadastro e pagamento online para expositores, venda de ingressos com QR Code e agenda interativa do evento.', 
  '2025-08-01', 
  'Planejamento', 
  'https://github.com/ndti/fenics-manager', 
  now(), 
  now()
);

-- Confirma a transação.
COMMIT;

-- Inicia uma transação.
BEGIN;

-- Membro 1: Coordenadora de Projetos.
INSERT INTO public.team(id, "name", "role", description, image_id, email, linkedin, github, lattes, is_active, "order", updated_at, created_at)
VALUES(
  nextval('team_id_seq'::regclass), 
  'Dr. Ana Carolina Costa', 
  'Coordenadora de Projetos', 
  'Professora e pesquisadora com vasta experiência em gestão de projetos de inovação. Responsável por alinhar as iniciativas do núcleo com as demandas do mercado.', 
  2, 
  'ana.costa@instituicao.edu.br', 
  'https://linkedin.com/in/anacostaficticio', 
  '', 
  'http://lattes.cnpq.br/1234567890123456', 
  true, 
  1, 
  now(), 
  now()
);

-- Membro 2: Desenvolvedor Sênior.
INSERT INTO public.team(id, "name", "role", description, image_id, email, linkedin, github, lattes, is_active, "order", updated_at, created_at)
VALUES(
  nextval('team_id_seq'::regclass), 
  'Bruno Mendes', 
  'Desenvolvedor Sênior Full-stack', 
  'Especialista em arquitetura de software e desenvolvimento de plataformas web complexas. Atua como líder técnico e mentor para a equipe de desenvolvimento.', 
  1, 
  'bruno.mendes@ndti.com.br', 
  'https://linkedin.com/in/brunomendesficticio', 
  'https://github.com/essapessoanaoexistemesmonavidareal', 
  '', 
  true, 
  2, 
  now(), 
  now()
);

-- Membro 3: Designer UI/UX.
INSERT INTO public.team(id, "name", "role", description, image_id, email, linkedin, github, lattes, is_active, "order", updated_at, created_at)
VALUES(
  nextval('team_id_seq'::regclass), 
  'Carla Dias', 
  'Designer UI/UX', 
  'Responsável pela criação de interfaces intuitivas e experiências de usuário engajadoras para todos os projetos, com foco em design centrado no usuário e prototipação.', 
  3, 
  'carla.dias@ndti.com.br', 
  'https://linkedin.com/in/carladiasficticio', 
  '', 
  '', 
  true, 
  3, 
  now(), 
  now()
);

-- Membro 4: Desenvolvedor Júnior.
INSERT INTO public.team(id, "name", "role", description, image_id, email, linkedin, github, lattes, is_active, "order", updated_at, created_at)
VALUES(
  nextval('team_id_seq'::regclass), 
  'Fernando Guimarães', 
  'Desenvolvedor Júnior', 
  'Estudante de Engenharia de Software. Atua no desenvolvimento front-end, aplicando e aprendendo novas tecnologias para a construção das interfaces dos projetos.', 
  1, 
  'fernando.guimaraes@ndti.com.br', 
  'https://linkedin.com/in/fernandoguimaraesficticio', 
  'https://github.com/ferguima', 
  'http://lattes.cnpq.br/0987654321098765', 
  true, 
  1, 
  now(), 
  now()
);

-- Confirma a transação.
COMMIT;


BEGIN;

-- Inserção para Capa (ID 1)
INSERT INTO public.site_images (
  id, slug, description, image_id, updated_at, created_at
) VALUES (
  nextval('site_images_id_seq'::regclass), 'capa', 'Imagem de capa do site', 1, now(), now()
);

-- Inserção para Contra-Capa (ID 2)
INSERT INTO public.site_images (
  id, slug, description, image_id, updated_at, created_at
) VALUES (
  nextval('site_images_id_seq'::regclass), 'contra-capa', 'Imagem de contra-capa do site', 2, now(), now()
);

COMMIT;
