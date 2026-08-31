import { CircuitComponentInfo } from '../types';

export const componentsData: CircuitComponentInfo[] = [
  {
    id: 'battery',
    name: 'Dry Cell',
    nameMalay: 'Sel Kering (Bateri)',
    functionMalay: 'Membekalkan tenaga elektrik ke dalam litar dengan menukarkan tenaga kimia kepada tenaga elektrik.',
    symbolDescription: 'Garisan panjang mewakili terminal positif (+), garisan pendek dan tebal mewakili terminal negatif (-).',
    symbolSvg: '+ | i -',
    realWorldNote: 'Mempunyai dua punang (kutub): Terminal Positif (+) yang timbul dan Terminal Negatif (-) yang rata.'
  },
  {
    id: 'bulb',
    name: 'Bulb',
    nameMalay: 'Mentol',
    functionMalay: 'Menukarkan tenaga elektrik kepada tenaga cahaya dan tenaga haba apabila arus elektrik mengalir melalui filamennya.',
    symbolDescription: 'Bulatan dengan tanda palang (X) di dalamnya.',
    symbolSvg: '( X )',
    realWorldNote: 'Di dalam mentol terdapat filamen tungsten halus yang akan membara dan bersinar apabila dipanaskan oleh arus elektrik.'
  },
  {
    id: 'switch',
    name: 'Switch',
    nameMalay: 'Suis',
    functionMalay: 'Menyambungkan atau memutuskan aliran arus elektrik dalam litar.',
    symbolDescription: 'Dua titik terminal dengan tuil garisan terangkat (terbuka) atau menyentuh (tertutup).',
    symbolSvg: 'o---/  o',
    realWorldNote: 'Suis ditutup = Litar Lengkap (Arus Mengalir). Suis dibuka = Litar Terputus (Tiada Arus).'
  },
  {
    id: 'wire',
    name: 'Connecting Wire',
    nameMalay: 'Wayar Penyambung',
    functionMalay: 'Menyambungkan setiap komponen elektrik supaya arus elektrik boleh mengalir dengan lancar.',
    symbolDescription: 'Garisan lurus mendatar atau menegak.',
    symbolSvg: '───────',
    realWorldNote: 'Teras wayar diperbuat daripada kuprum (tembaga) iaitu konduktor elektrik yang baik, disaluti penebat plastik untuk keselamatan.'
  }
];
