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
