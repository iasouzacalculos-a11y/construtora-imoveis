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
