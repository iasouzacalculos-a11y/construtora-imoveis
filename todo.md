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
