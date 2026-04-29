# 🏛️ Guia Mestre de Criação de Sites: Impecável & Motion

Este guia consolida o conhecimento extraído dos repositórios `impeccable`, `design-motion-principles` e `skills`. O objetivo é criar interfaces que **impressionem (WOW)** e evitem a estética genérica de IA ("AI Slop").

---

## 🎨 1. Filosofia Estética (O "Editorial Sanctuary")

Interface de luxo não é sobre brilho, é sobre **curadoria e restrição**.

*   **Fuja do Comum**: Evite gradientes roxos, fontes Inter/Roboto e glassmorphism excessivo.
*   **Tom de Voz**: Escolha uma direção extrema (Luxo Refinado, Minimalismo Brutal, Editorial de Revista) e seja fiel a ela.
*   **Paleta de Cores (Regra 10%)**: Use uma cor de destaque decisiva (ex: Magenta Editorial) em no máximo 10% da tela. A escassez é o que dá valor.
*   **Papel, não Branco**: Use fundos levemente tingidos (Warm Ash Cream / oklch(96% 0.005 350)) em vez de branco puro (#FFF). Isso cria uma sensação de "santuário" e conforto visual.
*   **Tipografia com Alma**: Use serifas em itálico para displays (ex: Cormorant Garamond) e sans-serifs neutras para corpo (ex: Instrument Sans).
    *   **Leading**: Altura de linha de **1.6** é obrigatória para legibilidade editorial.

---

## 🎬 2. Princípios de Motion (O Método Emil Kowalski)

Não anime por animar. Anime para comunicar estado e qualidade invisível.

### A Regra da Frequência
| Frequência de Uso | Recomendação |
| :--- | :--- |
| **Raro** (ex: Onboarding) | Animações "deliciosas" e complexas permitidas. |
| **Ocasional** (ex: Menu) | Sutil e rápida. |
| **Frequente** (ex: Botões de ação) | Instantâneo ou quase sem animação. |
| **Teclado** | **Nunca** anime ações iniciadas por atalhos. |

### Dicas Práticas de Implementação
*   **Velocidade**: UI deve estar abaixo de **300ms**. 180ms é o "sweet spot" para responsividade.
*   **Feedback de Clique**: Sempre adicione um `transform: scale(0.97)` no estado `:active` dos botões.
*   **Nada de scale(0)**: Ao revelar elementos, comece de `scale(0.9)` para uma entrada elegante, nunca de 0.
*   **Blur de Transição**: Use um leve blur (2px) durante transições de estado para suavizar a troca de conteúdo.
*   **Clip-Path**: Use para revelações dramáticas de imagens ou transições de seções. É acelerado por hardware e não causa layout shift.

---

## 🛠️ 3. Regras Técnicas "Impecáveis"

*   **OKLCH Sempre**: Use o sistema de cores OKLCH para fidelidade em ampla gama e melhor controle de brilho/percepção.
*   **Bordas Afiadas**: Rejeite o padrão de "retângulo arredondado com sombra genérica". Use `border-radius: 0` para botões primários e CTAs para um visual editorial premium.
*   **Elevação Tonal**: Superfícies devem ser planas por padrão. Sombras aparecem apenas como resposta a interações (hover).
*   **Layout Assimétrico**: Evite grids de colunas simétricas perfeitas. Use layouts de revista, espaços negativos generosos e fluxo diagonal.

---

## 🚫 4. O que EVITAR (O "AI Slop" Anti-Reference)

*   **NÃO** use preto puro (#000) ou branco puro (#FFF). Use neutros tingidos.
*   **NÃO** use bordas laterais grossas coloridas em cards (o clássico "AI Dashboard").
*   **NÃO** use texto com gradiente (`background-clip: text`). Use peso ou escala para ênfase.
*   **NÃO** use animações de "bounce" ou elásticas em ferramentas de produtividade. Objetos reais desaceleram suavemente (Expo-out).
*   **NÃO** use o layout de "métrica heroica" (número gigante + label pequena + gradiente). É um clichê de SaaS.

---

## 🧩 5. Skills de Agente (Instruções Prontas)

Você pode usar estes blocos de texto para garantir que eu (ou qualquer IA) mantenha o nível de qualidade:

> "Crie uma interface com o conceito de **Santuário Editorial**. Use fundos Warm Ash Cream, tipografia Cormorant Garamond (Italic) para títulos e Instrument Sans para o corpo com leading 1.6. Mantenha os elementos planos e use sombras apenas no hover. Evite qualquer estética genérica de SaaS ou IA."

> "Aplique o **Motion de Emil Kowalski** neste componente. Assegure que as transições durem menos de 250ms, use curvas expo-out e garanta que o feedback tátil (scale 0.97) esteja presente em todos os botões."

---

### 📂 Estrutura de Conhecimento Instalada:
- `impeccable/DESIGN.md`: O manual completo de design sistêmico.
- `design-motion-principles/references/`: Checklists de auditoria de movimento.
- `skills/skills/frontend-design/`: Orientações para evitar design medíocre.
