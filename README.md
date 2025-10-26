# 🎓 Vozes da Escola

**Vozes da Escola** é uma plataforma inovadora de saúde mental para escolas públicas que utiliza inteligência artificial para monitorar e apoiar o bem-estar emocional dos estudantes.


## 📋 Sobre o Projeto

O Vozes da Escola é uma solução completa que conecta alunos, professores e psicólogos em um ecossistema de apoio emocional. A plataforma permite que estudantes registrem suas emoções semanalmente, participem de jogos educativos, e troquem pontos por recompensas, enquanto educadores acompanham o bem-estar da turma através de relatórios gerados por IA.

### 🎯 Objetivos

- Promover a saúde mental nas escolas públicas
- Identificar precocemente alunos em situação de vulnerabilidade emocional
- Facilitar a comunicação entre alunos e equipe pedagógica
- Gamificar o processo de autocuidado emocional
- Gerar insights acionáveis para educadores

## ✨ Funcionalidades

### 👨‍🎓 Para Alunos

- **Registro de Emoções**: Sistema semanal de registro emocional com escala de 1-5 e emojis
- **Histórico Emocional**: Visualização de padrões emocionais ao longo do tempo
- **Jogos Educativos**:
  - 🧠 Jogo da Memória das Emoções
  - 🫁 Exercício de Respiração Guiada
  - 📝 Quiz das Emoções
- **Sistema de Gamificação**:
  - Pontos por engajamento
  - Badges de conquistas
  - Ranking de participação
- **Loja de Recompensas**: Troca de pontos por:
  - 📚 Livros educacionais
  - 👕 Camisas de interclasse
  - 🎫 Ingressos para eventos
  - 🎨 Material escolar
  - 🏆 Troféus e medalhas
- **Chat com Equipe**: Comunicação direta com professores e psicólogos

### 👨‍🏫 Para Professores

- **Dashboard Analítico**: Visão geral do bem-estar da turma
- **Relatórios com IA**: Insights automáticos sobre padrões emocionais
- **Lista de Alunos Priorizada**: Alunos em situação crítica aparecem primeiro
- **Recomendações Personalizadas**: IA sugere ações específicas para cada aluno
- **Sistema de Comentários**: 
  - Adicionar observações sobre alunos
  - Compartilhar com outros professores e psicólogos
  - Categorização (emocional, acadêmico, comportamental, social)
  - Níveis de prioridade (baixa, média, alta)
- **Alertas Automáticos**: Notificações para casos que requerem atenção imediata
- **Análise de Áreas Problemáticas**: Identificação de onde cada aluno está com dificuldades

### 👨‍⚕️ Para Psicólogos

- Todas as funcionalidades dos professores, mais:
- **Notas de Acompanhamento**: Registro detalhado de intervenções
- **Planos de Suporte**: Criação de estratégias personalizadas
- **Histórico Completo**: Acesso ao histórico emocional e acadêmico dos alunos

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19.2** - Biblioteca JavaScript para interfaces
- **Next.js 16** - Framework React com SSR e App Router
- **TypeScript** - Tipagem estática
- **Styled Components** - Estilização CSS-in-JS
- **Framer Motion** - Animações fluidas

### UI/UX
- **shadcn/ui** - Componentes de interface
- **Lucide React** - Ícones modernos
- **Recharts** - Gráficos e visualizações

### Estado e Dados
- **localStorage** - Persistência de dados no navegador
- **SWR** - Gerenciamento de estado e cache

### Fluxo do Aluno

1. Faça login com credenciais de aluno
2. Registre sua emoção semanal na aba "Emoções"
3. Jogue os mini-games na aba "Jogos" para ganhar pontos
4. Troque pontos por recompensas na "Loja"
5. Acompanhe seu progresso e badges conquistados

### Fluxo do Professor/Psicólogo

1. Faça login com credenciais de professor ou psicólogo
2. Visualize o relatório semanal gerado pela IA
3. Confira a lista de alunos (casos críticos aparecem primeiro)
4. Clique em um aluno para ver detalhes e recomendações
5. Adicione comentários e compartilhe com a equipe
6. (Psicólogos) Registre notas de acompanhamento emocional


### IA e Análise
- Sistema de geração de relatórios com IA (mock)
- Análise de padrões emocionais
- Recomendações personalizadas


## 🔐 Segurança e Privacidade

- Dados armazenados localmente no navegador (localStorage)
- Sem coleta de dados pessoais sensíveis
- Sistema de autenticação simulado para demonstração
- Em produção, recomenda-se implementar:
  - Autenticação real com JWT
  - Banco de dados seguro
  - Criptografia de dados sensíveis
  - Conformidade com LGPD


## 🙏 Agradecimentos

- Todos que acreditam na importância da saúde mental na educação

---

**Vozes da Escola** - Transformando a saúde mental nas escolas, um aluno por vez. 🎓💙

