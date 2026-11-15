// Dados de exemplo das matrizes de bordado.
//
// "versao" e "situacao" vêm separados porque são duas coisas: o número da
// versão e se ela é a vigente. A tela junta as duas na etiqueta.

export const matrizes = [
  {
    id: 1,
    nome: 'Brasão Medicina 2026/2',
    arquivo: 'medicina-2026-2.emb',
    pontos: 14280,
    desenvolvedor: 'Equipe interna',
    versao: 3,
    situacao: 'vigente',
  },
  {
    id: 2,
    nome: 'Logo Hospital Santa Clara',
    arquivo: 'santa-clara.dst',
    pontos: 9640,
    desenvolvedor: 'Terceirizado',
    versao: 2,
    situacao: 'vigente',
  },
  {
    id: 3,
    nome: 'Logo Clínica Vida Plena',
    arquivo: 'vida-plena.emb',
    pontos: 7120,
    desenvolvedor: 'Equipe interna',
    versao: 1,
    situacao: 'vigente',
  },
  {
    id: 4,
    nome: 'Brasão Enfermagem 2026/1',
    arquivo: 'enfermagem-2026-1.emb',
    pontos: 12900,
    desenvolvedor: 'Equipe interna',
    versao: 4,
    situacao: 'vigente',
  },
  {
    id: 5,
    nome: 'Logo Laboratório Bioanálise',
    arquivo: 'bioanalise.dst',
    pontos: 6350,
    desenvolvedor: 'Terceirizado',
    versao: 1,
    situacao: 'em revisão',
  },
  {
    id: 6,
    nome: 'Brasão Odontologia 2025/2',
    arquivo: 'odonto-2025-2.emb',
    pontos: 11470,
    desenvolvedor: 'Equipe interna',
    versao: 2,
    situacao: 'arquivada',
  },
];
