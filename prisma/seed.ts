import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criar países
  const country = await prisma.country.create({
    data: {
      name: 'Moçambique',
      logo: 'MOZ.png',
    },
  });

  // Criar tipos de torneios
  const tournamentTypes = await prisma.tournamentType.createMany({
    data: [{ name: 'LIGA' }, { name: 'TAÇA' }, { name: 'LIGA_E_TAÇA' }],
  });

  // Criar níveis de torneios
  const tournamentLevels = await prisma.tournamentLevel.createMany({
    data: [
      { name: 'NACIONAL' },
      { name: 'INTERNACIONAL' },
      { name: 'REGIONAL' },
    ],
  });

  // Criar formatos de torneios
  const tournamentFormats = await prisma.tournamentFormat.createMany({
    data: [
      { name: 'PONTOS_CORRIDOS' },
      { name: 'ELIMINAÇÃO_DIRETA' },
      { name: 'FASE_DE_GRUPOS' },
    ],
  });

  // Criar categorias de idade
  const ageCategories = await prisma.ageCategory.createMany({
    data: [{ name: 'SENIOR' }, { name: 'SUB-21' }, { name: 'JUVENIL' }],
  });

  // Criar tipos de eventos de partidas
  const matchEventTypes = await prisma.matchEventType.createMany({
    data: [
      { name: 'GOL' },
      { name: 'GOL_CONTRA' },
      { name: 'PENALTI_GOL' },
      { name: 'PENALTI_PERDIDO' },
      { name: 'CHUTE_NO_ALVO' },
      { name: 'CHUTE_FORA' },

      { name: 'CARTAO_AMARELO' },
      { name: 'CARTAO_VERMELHO' },
      { name: 'SEGUNDO_CARTAO_AMARELO' },
      { name: 'SUBSTITUICAO' },
      { name: 'FALTA' },
      { name: 'MAO_NA_BOLA' },
      { name: 'IMPEDIMENTO' },

      { name: 'ESCANTEIO' },
      { name: 'LATERAL' },

      { name: 'INICIO_PRIMEIRO_TEMPO' },
      { name: 'INICIO_SEGUNDO_TEMPO' },
      { name: 'INICIO_PRORROGACAO' },
      { name: 'FIM_PRIMEIRO_TEMPO' },
      { name: 'FIM_SEGUNDO_TEMPO' },
      { name: 'FIM_PRORROGACAO' },
      { name: 'FIM_DISPUTA_PENALTIS' },
      { name: 'PENALTI_MARCADO' },
      { name: 'OUTRO' },
    ],
  });

  // Criar tipos de gênero
  const genderTypes = await prisma.genderType.createMany({
    data: [{ name: 'MASCULINO' }, { name: 'FEMININO' }, { name: 'MISTO' }],
  });

  // Criar formatos de equipe
  const formatTeams = await prisma.formatTeam.createMany({
    data: [
      { name: '11_CONTRA_11' },
      { name: '10_CONTRA_10' },
      { name: '9_CONTRA_9' },
      { name: '8_CONTRA_8' },
      { name: '7_CONTRA_7' },
      { name: '6_CONTRA_6' },
      { name: '5_CONTRA_5' },
      { name: '4_CONTRA_4' },
      { name: '3_CONTRA_3' },
      { name: '2_CONTRA_2' },
      { name: '1_CONTRA_1' },
    ],
  });

  // Criar posições em campo
  const positionFields = await prisma.positionField.createMany({
    data: [
      { name: 'GUARDA-REDES' },
      { name: 'LIBERO' },
      { name: 'DEFESA_CENTRAL' },
      { name: 'LATERAL_DIREITO' },
      { name: 'LATERAL_ESQUERDO' },
      { name: 'MÉDIO_DEFENSIVO' },
      { name: 'MÉDIO_CENTRO' },
      { name: 'MÉDIO_DIREITO' },
      { name: 'MÉDIO_ESQUERDO' },
      { name: 'MÉDIO_OFENSIVO' },
      { name: 'EXTREMO_DIREITO' },
      { name: 'EXTREMO_ESQUERDO' },
      { name: 'AVANÇADO' },
      { name: 'SEGUNDO_AVANÇADO' },
      { name: 'PONTA_DE_LANÇA' },
    ],
  });

  // Criar critérios de desempate
  const tiebreakerCriteria = await prisma.tiebreakerCriteria.createMany({
    data: [
      { name: 'CONFRONTO_DIRECTO' },
      { name: 'GOLOS_MARCADOS' },
      { name: 'SALDO_GOLOS' },
    ],
  });

  // Criar status de convocação
  const callUpStatuses = await prisma.callUpStatus.createMany({
    data: [{ name: 'CONVOCADO' }, { name: 'AUSENTE' }],
  });

  // Criar status de saúde dos jogadores
  const playerHealthStatuses = await prisma.playerHealthStatus.createMany({
    data: [
      { name: 'DISPONIVEL' },
      { name: 'LESIONADO' },
      { name: 'SUSPENSO' },
      { name: 'EM_REABILITACAO' },
    ],
  });

  // Criar tipos de equipe
  const teamTypes = await prisma.teamType.createMany({
    data: [{ name: 'CLUBE' }, { name: 'NACIONAL' }],
  });

  // Criar status de jogo (MatchStatus)
  const matchStatuses = await prisma.matchStatus.createMany({
    data: [
      { name: 'NAO_INICIADO' },
      { name: 'EM_PROGRESSO' },
      { name: 'INTERVALO' },
      { name: 'TERMINADO' },
    ],
  });

  const stageTypes = await prisma.stageType.createMany({
    data: [
      { name: 'LIGA' },
      { name: 'GRUPO' },
      { name: 'ELIMINATORIA' },
      { name: 'FINAL' },
    ],
  });

  const formationSchemes = await prisma.formationScheme.createMany({
    data: [
      { formation: '3-4-3', label: '3-4-3' },
      { formation: '3-4-3', label: '3-4-3 Ofensivo' },
      { formation: '3-4-3', label: '3-4-3 Defensivo' },

      { formation: '3-5-2', label: '3-5-2' },
      { formation: '3-5-2', label: '3-5-2 Ofensivo' },
      { formation: '3-5-2', label: '3-5-2 Contenção' },

      { formation: '4-2-3-1', label: '4-2-3-1' },
      { formation: '4-2-3-1', label: '4-2-3-1 Ofensivo' },
      { formation: '4-2-3-1', label: '4-2-3-1 Defensivo' },

      { formation: '4-3-3', label: '4-3-3' },
      { formation: '4-3-3', label: '4-3-3 Ofensivo' },
      { formation: '4-3-3', label: '4-3-3 Defensivo' },

      { formation: '4-4-2', label: '4-4-2' },
      { formation: '4-4-2', label: '4-4-2 Diamante' },
      { formation: '4-4-2', label: '4-4-2 Pirâmide' },

      { formation: '4-1-4-1', label: '4-1-4-1' },
      { formation: '4-1-4-1', label: '4-1-4-1 Ofensivo' },
      { formation: '4-1-4-1', label: '4-1-4-1 Defensivo' },

      { formation: '4-5-1', label: '4-5-1' },
      { formation: '4-5-1', label: '4-5-1 Ofensivo' },
      { formation: '4-5-1', label: '4-5-1 Defensivo' },

      { formation: '5-3-2', label: '5-3-2' },
      { formation: '5-3-2', label: '5-3-2 Ofensivo' },
      { formation: '5-3-2', label: '5-3-2 Defensivo' },

      { formation: '5-4-1', label: '5-4-1' },
      { formation: '5-4-1', label: '5-4-1 Defensivo' },
      { formation: '5-4-1', label: '5-4-1 Contra-Ataque' },

      { formation: '3-6-1', label: '3-6-1' },
      { formation: '3-6-1', label: '3-6-1 Ofensivo' },
      { formation: '3-6-1', label: '3-6-1 Defensivo' },

      { formation: '4-2-2-2', label: '4-2-2-2' },
      { formation: '4-2-2-2', label: '4-2-2-2 Ofensivo' },
      { formation: '4-2-2-2', label: '4-2-2-2 Defensivo' },

      { formation: '4-3-2-1', label: '4-3-2-1' },
      { formation: '4-3-2-1', label: '4-3-2-1 Árvore de Natal' },

      { formation: '3-4-1-2', label: '3-4-1-2' },
      { formation: '3-4-1-2', label: '3-4-1-2 Ofensivo' },
      { formation: '3-4-1-2', label: '3-4-1-2 Defensivo' },
    ],
  });

  console.log('Match statuses created successfully.');

  console.log('Seed data created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
