# Construtora Imóveis - TODO

## Tarefas Concluídas

- [x] Criar website com design moderno (azul, Inter font)
- [x] Implementar 28 propriedades com galeria de fotos
- [x] Adicionar filtros de busca (tipo, cidade, preço, quartos)
- [x] Criar página de detalhes do imóvel com mapa interativo
- [x] Implementar autenticação OAuth
- [x] Migrar dados para MySQL database
- [x] Implementar upload de imagens com S3
- [x] Atualizar 16 propriedades com IDs customizados (bairro-quadra-lote)
- [x] Corrigir Properties.tsx para buscar dados do banco via tRPC
- [x] Corrigir âncoras aninhadas no Header e Footer (usar asChild)
- [x] Transformar dados do banco para formato esperado pelo PropertyCard

## Tarefas Pendentes

- [ ] Testar filtros de busca com os novos dados
- [ ] Testar navegação entre páginas
- [ ] Remover logs de debug do console
- [ ] Criar testes vitest para as funcionalidades principais
- [ ] Validar responsividade em dispositivos móveis
- [ ] Melhorar performance da galeria de imagens
- [ ] Implementar paginação se houver muitos imóveis
- [ ] Adicionar mais imagens reais aos imóveis
- [ ] Implementar notificações de contato por email
- [ ] Criar painel de administração para gerenciar imóveis

## Bugs Conhecidos

- Erro no console: "Identifier 'Header' has already been declared" no PropertyDetail.tsx (não afeta funcionalidade)
- Alguns imóveis ainda usam imagens placeholder

## Próximos Passos

1. Criar checkpoint com as correções
2. Testar filtros de busca
3. Implementar testes vitest
4. Publicar o site

## Mudanças Visuais Recentes

- [x] Restaurar banco de dados após corrupção de dados
- [x] Reinsert dos 28 imóveis originais
- [x] Verificar integridade dos dados restaurados


## Alterações de Configuração Solicitadas

- [x] Remover barra de pesquisa (localização e tipo de imóvel) da página inicial
- [x] Modificar filtros de preço com faixas pré-definidas (Até 350k, 350k-500k, 500k-800k, Acima de 800k)
- [x] Remover filtros de tipo de imóvel e cidade da página de imóveis
- [x] Adicionar mapa de localização no footer (Av. Mal. Rondon, 2019 - Centro, Rondonópolis - MT)
- [x] Testar todas as alterações


## Ajustes de Layout do Footer

- [x] Remover coluna "Tipos de Imóveis" do footer
- [x] Reorganizar layout do footer com mapa no lado direito
- [x] Trazer colunas de Navegação e Contato mais perto
- [x] Remover faixa de preço "Acima de R$ 800.000" dos filtros
- [x] Testar todas as alterações


## Correção de Localização do Mapa

- [x] Extrair coordenadas corretas do link Google Maps fornecido (-16.4652161, -54.6225263)
- [x] Atualizar coordenadas no componente Footer
- [x] Redimensionar mapa para formato quadrado menor (w-40 h-40)
- [x] Testar localização correta no mapa


## Remodelação do Footer - Novo Design

- [x] Criar seção CTA (Call-to-Action) antes do footer com design elegante
- [x] Adicionar subtítulo "SEU NOVO LAR ESPERA POR VOCÊ"
- [x] Adicionar título "Pronto para Encontrar seu Imóvel?"
- [x] Adicionar descrição motivadora
- [x] Adicionar botões: "Ver Imóveis Disponíveis" (azul) e "Falar com Consultor" (outline)
- [x] Remover mapa do footer
- [x] Redesenhar footer com 4 colunas: Logo, Navegação, Contato, Frase de chamada
- [x] Testar novo design


## Adição de Logo ao Footer

- [x] Copiar logo completa para pasta public
- [x] Atualizar Footer.tsx para exibir logo
- [x] Testar exibição da logo no footer


## Otimização para Conversão - Design Premium Mobile-First

- [x] Reescrever textos com foco em conversão e micro-copy persuasivo
- [x] Reduzir padding vertical do CTA em ~20-30%
- [x] Adicionar elemento visual leve (gradiente/textura) no CTA
- [x] Melhorar hierarquia de texto (subtítulo menor, título forte, descrição elegante)
- [x] Diferenciar botões (azul forte vs branco com borda)
- [x] Adicionar "gancho de confiança" com micro-copy (20 anos, segurança, etc)
- [x] Adicionar divisória sutil acima do footer
- [x] Aumentar espaçamento entre colunas do footer
- [x] Otimizar layout mobile-first com responsive design
- [x] Testar em mobile e desktop


## Otimizações de Conversão Detalhadas

- [x] Hero: Título "Encontre seu novo lar em Rondonópolis com segurança e confiança"
- [x] Hero: Botão "Ver imóveis disponíveis" maior
- [x] Header: "Agendar Visita" único botão azul, telefone cinza
- [x] Header: Adicionar ícone WhatsApp ao botão
- [x] Benefícios: Ícones uniformes, texto menor, mais espaçamento
- [x] Faixa azul: Números maiores, texto menor, altura reduzida
- [x] Cards: Preço em destaque (bold + maior)
- [x] Cards: Botão com hover e sombra
- [x] CTA final: "Não encontrou o imóvel ideal?" antes do footer
- [x] Mobile: Layout otimizado (título 3 linhas, botão visível, cards coluna única)


## Layout Mobile Otimizado

- [x] Reorganizar filtros em duas colunas no mobile
- [x] Manter cards em coluna única
- [x] Testar responsividade em diferentes tamanhos


## Ajustes de CTA

- [x] Remover seção CTASection "Pronto para encontrar seu imóvel?"
- [x] Manter apenas CTA final "Não encontrou o imóvel ideal?"
- [x] Mudar botão para verde com ícone WhatsApp
- [x] Preparar para integração futura com link do WhatsApp


## Menu Mobile e WhatsApp Flutuante

- [x] Criar menu hambúrguer responsivo para mobile
- [x] Ocultar menu completo no mobile, mostrar apenas logo e hambúrguer
- [x] Criar botão flutuante de WhatsApp fixo no canto inferior direito
- [x] WhatsApp sempre visível, mesmo com menu fechado
- [x] Testar responsividade em diferentes tamanhos


## Scroll Automático ao Topo

- [x] Criar componente ScrollToTop que detecta mudanças de rota
- [x] Integrar ScrollToTop no App.tsx
- [x] Testar navegação entre páginas (Início, Imóveis, Sobre, Contato)
- [x] Garantir que página sempre rola para o topo ao navegar


## Painel Administrativo Protegido

- [ ] Remover rota pública `/imovel/:id/gerenciar-imagens`
- [ ] Criar página de painel administrativo `/admin`
- [ ] Proteger painel admin com autenticação OAuth (apenas proprietário)
- [ ] Implementar listagem de imóveis no painel admin
- [ ] Implementar gerenciamento de imagens no painel admin
- [ ] Adicionar botão de acesso ao painel admin (visível apenas para admin)
- [ ] Testar proteção e funcionalidades


## Remover Autenticação OAuth do Painel Admin (Temporário)

- [x] Remover verificação de autenticação OAuth da página Admin.tsx
- [x] Remover verificação de autenticação OAuth da página AdminPropertyImages.tsx
- [x] Testar acesso ao painel admin sem login
- [x] Criar páginas /admin e /admin/imovel/:id/imagens funcionais
- [x] Documentar que isso é temporário e será removido no futuro


## Adicionar Imagens via URL

- [x] Criar rota tRPC addImageByUrl no server/routers.ts
- [x] Adicionar campo de texto para URL na página AdminPropertyImages.tsx
- [x] Implementar botão "Adicionar por URL"
- [x] Corrigir Admin.tsx para usar id em vez de customId
- [x] Testar adição de imagens via URL


## Corrigir Link do Google Drive

- [x] Converter link do Google Drive para formato de visualização direta
- [x] Identificar problema de CORS com Google Drive
- [x] Atualizar banco de dados com link do Imgur
- [x] Testar exibição da imagem no PropertyCard - Funcionando perfeitamente!


## Corrigir Imóveis em Destaque

- [x] Alterar lógica de seleção de imóveis em destaque
- [x] Filtrar imóveis de Rondonópolis para destaque
- [x] Testar exibição na página inicial - Funcionando perfeitamente! 3 imóveis de Rondonópolis exibidos


## Substituir Imóveis com Nova Tabela

- [x] Identificar imóveis a serem substituídos (exceto ID 1 e os com sigla GV)
- [x] Processar tabela com 8 lotes (alguns com valores duplicados = 2 casas)
- [x] Criar IDs no formato: bairro-qd-lt (ex: pu-qd126-lt3)
- [x] Criar títulos no formato: Casa [Nome do Bairro]
- [x] Atualizar banco de dados com os novos imóveis - 12 novos imóveis inseridos
- [x] Testar exibição dos novos imóveis - 19 imóveis exibidos corretamente


## Atualizar Detalhes dos Imóveis

- [x] Extrair dados das imagens fornecidas pelo usuário
- [x] Identificar imóveis faltantes comparando com banco de dados
- [x] Adicionar 5 novos imóveis Granville faltantes:
  - gv-qd33-lt16: R$ 450.000 (79m²)
  - gv-qd33-lt3-a: R$ 560.000 (105m², 3 quartos)
  - gv-qd33-lt3-b: R$ 470.000 (89m², 2 suítes + lavabo)
  - gv-qd18-lt27: R$ 840.000 (121m², 3 quartos)
  - gv-qd40-lt22: R$ 480.000 (89m², 2 suítes + lavabo)
- [x] Testar exibição - 24 imóveis exibidos corretamente


## Segurança do Sistema de Imagens

- [x] Remover botões admin da página pública de imóveis (Editar ID, Adicionar/Editar Imagens)
- [x] Mover funcionalidades de upload para área /admin apenas
- [x] Implementar validação de role admin no backend para endpoints de imagem (protectedProcedure)
- [x] Criar painel admin com gerenciamento de imagens por imóvel
- [x] Garantir que visitantes só possam fazer requisições GET (publicProcedure para list/getById)
- [x] Testar que nenhuma ação admin é possível sem autenticação (useAuth com redirect)


## Corrigir Upload de Imagens Imgur

- [x] Converter URLs do Imgur (imgur.com/xxx) para formato direto (i.imgur.com/xxx.jpeg)
- [x] Testar adição de imagens com link do Imgur - Funcionando!


### Atualizar WhatsApp e Contato

- [x] Atualizar número do WhatsApp para 66996622263 em todos os componentes (Header, Footer, PropertyDetail, WhatsAppButton)
- [x] Adicionar mensagem de exemplo: "Olá, vi os imóveis pelo site e tenho interesse de agendar uma visita."
- [x] Testar botão WhatsApp em diferentes páginas - Funcionando perfeitamente!


## Corrigir Erro de Upload de Arquivo

- [x] Diagnosticar erro "Input not instance of File" no painel admin
- [x] Converter arquivo para Blob antes de enviar via tRPC
- [x] Testar upload - Funcionando corretamente!


## Implementar Drag and Drop para Reordenar Imagens

- [x] Adicionar coluna order na tabela propertyImages (já existe)
- [x] Criar endpoint para atualizar ordem das imagens (updateImageOrder, deleteImage)
- [x] Implementar componente com drag and drop no AdminPropertyImages
- [x] Definir imagem principal (primeira imagem com badge "Principal")
- [x] Testar reordenação - Painel admin carregando corretamente com interface de drag and drop


## Corrigir Problema de Upload de Imagens no Painel Admin

- [ ] Verificar logs de erro no console do navegador
- [ ] Testar upload de imagem única no painel admin
- [ ] Identificar causa do erro (tamanho, formato, serialização)
- [ ] Corrigir problema no backend ou frontend
- [ ] Testar upload com imagem de teste

## Corrigir Ordenação de Imagens na Página Pública

- [x] Investigar por que a ordem das imagens não é respeitada ao visualizar imóvel
- [x] Corrigir query que busca imagens para incluir orderBy
- [x] Testar que a ordem definida no admin aparece corretamente na página pública

## Corrigir Erro no Painel Admin com ID de Imóvel Inválido

- [x] Investigar imóvel com ID "QD37 – Lote 14 GV" que está causando erro
- [x] Corrigir ID do imóvel para formato válido (sem espaços e caracteres especiais)
- [x] Testar página de gerenciar imagens

## Criar Página Sobre Nós Inspirada na Impper

- [x] Analisar design e conteúdo da página Sobre Nós da Impper
- [x] Criar página Sobre Nós adaptada para Souza Construtora
- [x] Incluir história, missão, valores e diferenciais
- [x] Testar responsividade e design

## Criar Página de Contato Completa

- [x] Criar hero section com título e subtítulo
- [x] Adicionar seção de informações de contato (endereço, telefone, email, horário)
- [x] Implementar formulário de contato com campos completos
- [x] Adicionar mapa interativo do Google Maps
- [x] Criar seção "Seja um Corretor Parceiro" com formulário específico
- [x] Adicionar FAQ com perguntas frequentes
- [x] Implementar backend para salvar mensagens e notificar proprietário
- [x] Testar responsividade e funcionalidades


## Simplificar Página de Contato

- [x] Remover seção de localização/mapa da página de Contato
- [x] Remover "Treinamentos" dos benefícios do Corretor Parceiro
- [x] Remover formulário de cadastro de corretor - apenas convite para contato
- [x] Testar alterações


## Atualizar Imóveis em Destaque na Página Inicial

- [x] Trocar imóveis em destaque para: gv-qd40-lt22, qd18-lote-27-gv, sf-qd13-lt22
- [x] Testar página inicial


## Adicionar Imagens aos Imóveis em Destaque

- [x] Adicionar imagem https://i.imgur.com/Hjp93hh.png ao imóvel gv-qd40-lt22
- [x] Adicionar imagem https://i.imgur.com/p0qG3N2.png ao imóvel qd18-lote-27-gv
- [x] Adicionar imagem https://i.imgur.com/jCTs2wc.png ao imóvel sf-qd13-lt22


## Adicionar Imagens de Capa aos Imóveis em Destaque

- [x] Adicionar https://i.imgur.com/Hjp93hh.png ao imóvel gv-qd40-lt22
- [x] Adicionar https://i.imgur.com/p0qG3N2.png ao imóvel qd18-lote-27-gv
- [x] Adicionar https://i.imgur.com/jCTs2wc.png ao imóvel sf-qd13-lt22


## Criar Carrossel de Imóveis na Página Inicial

- [x] Instalar biblioteca de carrossel (embla-carousel ou similar)
- [x] Transformar grid de imóveis em destaque em carrossel interativo
- [x] Adicionar setas de navegação e indicadores
- [x] Testar responsividade em mobile e desktop


## Implementar Timeline de Entregas na Página Inicial

- [x] Adicionar campo "status" ao schema de imóveis (pronto_para_morar, em_construcao)
- [x] Adicionar campo "deliveryDate" para previsão de entrega
- [x] Remover seção "Imóveis em Destaque" da página inicial
- [x] Criar seção "Timeline de Entregas" com duas categorias
- [x] Implementar filtro por status no backend
- [x] Testar e validar


## Criar Painel Admin para Gerenciar Imóveis em Destaque

- [ ] Adicionar campo "featured" (boolean) ao schema de imóveis
- [ ] Criar página admin para listar imóveis por status (Prontos/Em Construção)
- [ ] Adicionar toggle para marcar/desmarcar imóveis como destaque
- [ ] Atualizar página inicial para mostrar apenas imóveis marcados como featured
- [ ] Limitar a 3 imóveis em destaque por categoria
- [ ] Testar funcionalidade completa

## Adicionar Imagens aos 3 Imóveis em Destaque

- [x] Identificar os 3 imóveis marcados como destaque
- [x] Corrigir bug de acesso à URL da imagem (imageUrl vs url)
- [x] Verificar resultado na página inicial - Casa Granville aparecendo corretamente

## Atualizar Link do WhatsApp

- [x] Atualizar número para 5566999998693
- [x] Atualizar mensagem para "Olá, vim pelo site da Souza Construtora e gostaria de mais informações sobre os imóveis disponíveis."
- [x] Aplicar em todos os componentes (Header, Footer, WhatsAppButton, Contato)
- [x] Testar botão WhatsApp - funcionando perfeitamente!
