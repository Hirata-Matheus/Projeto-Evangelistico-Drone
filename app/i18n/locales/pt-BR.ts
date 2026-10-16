// Textos em português (Bíblia: NTLH).
// Atenção à sintaxe do vue-i18n: os caracteres { } @ | têm significado especial.
// Por isso o @ do Instagram entra como parâmetro ({handle}) e vem de data/site.ts.
export default {
  meta: {
    title: 'Uma palavra do céu para você',
    description: 'Você escaneou o QR Code do drone. Deus tem uma palavra para você hoje.',
    bible: 'NTLH',
    bibleNote: 'Textos bíblicos: Nova Tradução na Linguagem de Hoje (NTLH).'
  },
  a11y: {
    skip: 'Pular para a palavra',
    language: 'Idioma'
  },
  cursor: {
    go: 'Ir',
    drag: 'Arraste',
    share: 'Enviar',
    open: 'Abrir'
  },
  splash: {
    title: 'Uma palavra do céu para você',
    hint: 'Toque para continuar'
  },
  hero: {
    badge: 'Você escaneou o QR do drone',
    title: 'Deus tem uma palavra para você hoje.',
    lead: 'Ela desceu do céu até as suas mãos. Separe dois minutos e leia com calma.',
    cta: 'Ver minha palavra'
  },
  word: {
    title: 'Sua palavra de agora',
    question: 'O que você precisa ouvir hoje?',
    another: 'Outra palavra',
    share: 'Compartilhar',
    swipe: 'Arraste o cartão para trocar'
  },
  themes: {
    encorajamento: {
      chip: 'Encorajamento',
      title: 'Não desista agora.',
      text: 'Talvez você esteja cansado de tentar. Deus não pede que você seja forte sozinho. Ele promete estar com você em cada passo.',
      verse: {
        t: 'Seja forte e corajoso! Não fique desanimado, nem tenha medo, porque eu, o Senhor, seu Deus, estarei com você em qualquer lugar para onde você for!',
        r: 'Josué 1:9'
      }
    },
    consolo: {
      chip: 'Consolo',
      title: 'Suas lágrimas não passam despercebidas.',
      text: 'Se o coração está pesado, existe descanso. Deus se aproxima de quem está ferido e oferece um alívio que ninguém mais consegue dar.',
      verse: {
        t: 'Venham a mim, todos vocês que estão cansados de carregar as suas pesadas cargas, e eu lhes darei descanso.',
        r: 'Mateus 11:28'
      }
    },
    cura: {
      chip: 'Cura',
      title: 'Há restauração para você.',
      text: 'Para o corpo, para a mente e para as memórias que ainda doem. O Deus que criou você sabe restaurar o que se partiu.',
      verse: {
        t: 'Nós somos curados pelo castigo que ele sofreu, somos sarados pelos ferimentos que ele recebeu.',
        r: 'Isaías 53:5'
      }
    },
    esperanca: {
      chip: 'Esperança',
      title: 'O seu futuro está nas mãos dEle.',
      text: 'Mesmo quando você não enxerga a saída, Deus já conhece o caminho. A sua história ainda não terminou.',
      verse: {
        t: 'Só eu conheço os planos que tenho para vocês: prosperidade e não desgraça e um futuro cheio de esperança. Sou eu, o Senhor, quem está falando.',
        r: 'Jeremias 29:11'
      }
    },
    amor: {
      chip: 'Amor de Deus',
      title: 'Você é amado do jeito que está.',
      text: 'Deus não espera você ficar perfeito para amar você. Ele deu o maior presente antes mesmo de você pedir.',
      verse: {
        t: 'Porque Deus amou o mundo tanto, que deu o seu único Filho, para que todo aquele que nele crer não morra, mas tenha a vida eterna.',
        r: 'João 3:16'
      }
    },
    salvacao: {
      chip: 'Salvação',
      title: 'A salvação é um presente.',
      text: 'Não precisa merecer nem pagar. Jesus já fez tudo. O que cabe a você é crer e receber.',
      verse: {
        t: 'Se você disser com a sua boca: ‘Jesus é Senhor’ e crer de coração que Deus ressuscitou Jesus, você será salvo.',
        r: 'Romanos 10:9'
      }
    },
    proposito: {
      chip: 'Propósito'
    }
  },
  // Sorteio do cartão "Sua palavra de agora"
  verses: [
    { t: 'Não fique com medo, pois estou com você; não se apavore, pois eu sou o seu Deus. Eu lhe dou forças e o ajudo; eu o protejo com a minha forte mão.', r: 'Isaías 41:10' },
    { t: 'Com a força que Cristo me dá, posso enfrentar qualquer situação.', r: 'Filipenses 4:13' },
    { t: 'O Senhor está perto dos que estão desanimados e salva os que perderam a esperança.', r: 'Salmos 34:18' },
    { t: 'Ele enxugará dos olhos deles todas as lágrimas. Não haverá mais morte, nem tristeza, nem choro, nem dor.', r: 'Apocalipse 21:4' },
    { t: 'Ele cura os que têm o coração partido e trata dos seus ferimentos.', r: 'Salmos 147:3' },
    { t: 'Que Deus, que nos dá essa esperança, encha vocês de alegria e de paz, por meio da fé que vocês têm nele.', r: 'Romanos 15:13' },
    { t: 'Mas Deus nos mostrou o quanto nos ama: Cristo morreu por nós quando ainda vivíamos no pecado.', r: 'Romanos 5:8' },
    { t: 'Pois pela graça de Deus vocês são salvos por meio da fé. Isso não vem de vocês, mas é um presente dado por Deus.', r: 'Efésios 2:8' },
    { t: 'Seja forte e corajoso! Não fique desanimado, nem tenha medo, porque eu, o Senhor, seu Deus, estarei com você em qualquer lugar para onde você for!', r: 'Josué 1:9' },
    { t: 'Venham a mim, todos vocês que estão cansados de carregar as suas pesadas cargas, e eu lhes darei descanso.', r: 'Mateus 11:28' },
    { t: 'Só eu conheço os planos que tenho para vocês: prosperidade e não desgraça e um futuro cheio de esperança.', r: 'Jeremias 29:11' },
    { t: 'Porque Deus amou o mundo tanto, que deu o seu único Filho, para que todo aquele que nele crer não morra, mas tenha a vida eterna.', r: 'João 3:16' }
  ],
  prayer: {
    badge: 'Oração de entrega',
    title: 'Quer falar com Deus agora?',
    lead: 'Não existe frase certa. Se fizer sentido para você, diga em voz baixa:',
    text: 'Senhor Jesus, eu preciso de ti. Entrego nas tuas mãos a minha vida, as minhas dores e os meus sonhos. Perdoa os meus pecados e cura o meu coração. Eu creio que tu morreste e ressuscitaste por mim. A partir de hoje, quero seguir a ti. Amém.',
    cta: 'Fiz essa oração'
  },
  purpose: {
    lead: 'Você não está aqui por acaso. Seus talentos, sua história e até as lutas que enfrentou podem ser usados por Deus.',
    statement: 'Use aquilo que Deus te capacitou para glorificar o nome dEle e',
    highlight: 'prosperar além do que pode imaginar.',
    verse: {
      t: 'Seja dada glória a Deus, o qual, por meio do seu poder que age em nós, pode fazer muito mais do que nós pedimos ou até pensamos!',
      r: 'Efésios 3:20'
    }
  },
  consent: {
    badge: 'Antes de você ir',
    title: 'Podemos usar a sua imagem?',
    text: 'O drone registra fotos e vídeos desta ação. Você autoriza o uso da sua imagem nas publicações do Instagram {handle}?',
    yes: 'Sim, eu autorizo',
    no: 'Não autorizo',
    form: {
      lead: 'Para registrar a sua autorização, informe seu nome completo.',
      first: 'Nome',
      last: 'Sobrenome',
      submit: 'Confirmar autorização',
      sending: 'Enviando…',
      back: 'Voltar',
      note: 'Seu nome é usado só para registrar esta autorização de imagem.',
      requiredFirst: 'Digite seu nome.',
      requiredLast: 'Digite seu sobrenome.',
      invalid: 'Use só letras (mínimo de 2).',
      error: 'Não conseguimos registrar agora. Verifique a internet e tente de novo.'
    },
    thanksTitle: 'Obrigado! Agora faça um joia para o drone.',
    thanksTitleNamed: 'Obrigado, {name}! Agora faça um joia para o drone.',
    thanksText: 'Fique de olho no {handle} para ver o registro.',
    declinedTitle: 'Tudo bem, respeitamos a sua decisão.',
    declinedText: 'Sua imagem não será publicada. Que estas palavras acompanhem você hoje.',
    change: 'Mudar minha resposta'
  },
  footer: {
    title: 'Fale com a gente',
    copy: 'Copiar número'
  },
  share: {
    title: 'Uma palavra para você',
    label: 'Compartilhar versículo',
    copied: 'Versículo copiado!',
    phoneCopied: 'Número copiado!',
    copyFailed: 'Não foi possível copiar'
  },
  wa: {
    prayer: 'Olá! Escaneei o QR Code do drone e fiz a oração de entrega.',
    contact: 'Olá! Escaneei o QR Code do drone.'
  }
}
