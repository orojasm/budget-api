import { CreateRecurringBillDto } from 'src/recurring-bill/dto';

export const data: CreateRecurringBillDto[] = [
  {
    description: 'Pago Tarjeta Dinners',
    initialPeriod: '202406',
    dueDate: '2024-06-01T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: 'https://www.davivienda.com',
    ref: '',
    currency: 'Peso Colombiano (COL$)',
    amount: 449980,
    budget: 'Pago tarjeta de crédito',
    category: 'Personal',
    tags: ['personal', 'tarjeta de crédito'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: 'Tarjeta de crédito Dinners',
  },
  {
    description: 'Pago Crédito Crediexpress',
    initialPeriod: '202406',
    dueDate: '2024-06-01T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: 'https://www.davivienda.com',
    ref: '',
    currency: 'Peso Colombiano (COL$)',
    amount: 6599407,
    budget: 'Pago Crédito',
    category: 'Personal',
    tags: ['personal', 'servicios', 'energía'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: 'Crediexpress',
  },
  {
    description: 'Servicio Energía Apartamento',
    initialPeriod: '202406',
    dueDate: '2024-06-01T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: 'https://www.enel.com.co/es/personas/boton-de-pago.html?NroCliente=0438977',
    ref: '36955875',
    currency: 'Peso Colombiano (COL$)',
    amount: 203000,
    budget: 'Servicios personales',
    category: 'Personal',
    tags: ['personal', 'servicios', 'energía'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: 'ENEL',
  },
  {
    description: 'Parafiscales',
    initialPeriod: '202406',
    dueDate: '2024-06-07T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: 'https://independientes2.miplanilla.com/PublicoIndependientes/Publico/IndexIndependientes',
    ref: '4EsQuatro',
    currency: 'Peso Colombiano (COL$)',
    amount: 488000,
    budget: 'Servicios personales',
    category: 'Personal',
    tags: ['personal', 'salud', 'pension'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: 'MiPlanilla',
  },
  {
    description: 'Servicio de Energía 701',
    initialPeriod: '202406',
    dueDate: '2024-06-07T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: 'https://www.enel.com.co/es/personas/boton-de-pago.html?NroCliente=0438977',
    ref: '04389771',
    currency: 'Peso Colombiano (COL$)',
    amount: 60110,
    budget: 'Servicios Oficina',
    category: 'Oficina',
    tags: ['oficina', 'servicios', 'energía'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: 'ENEL',
  },
  {
    description: 'Servicio de Energía 702',
    initialPeriod: '202406',
    dueDate: '2024-06-07T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: 'https://www.enel.com.co/es/personas/boton-de-pago.html?NroCliente=0438977',
    ref: '04389783',
    currency: 'Peso Colombiano (COL$)',
    amount: 56670,
    budget: 'Servicios Oficina',
    category: 'Oficina',
    tags: ['oficina', 'servicios', 'energía'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: 'ENEL',
  },
  {
    description: 'Servicio de Energía 602',
    initialPeriod: '202406',
    dueDate: '2024-06-07T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: 'https://www.enel.com.co/es/personas/boton-de-pago.html?NroCliente=0438977',
    ref: '04389769',
    currency: 'Peso Colombiano (COL$)',
    amount: 120220,
    budget: 'Servicios Oficina',
    category: 'Oficina',
    tags: ['oficina', 'servicios', 'energía'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: 'ENEL',
  },
  {
    description: 'Ayuda Rocío',
    initialPeriod: '202406',
    dueDate: '2024-06-14T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: 'https://www.efecty.com.co/web/',
    ref: '51728559',
    currency: 'Peso Colombiano (COL$)',
    amount: 300000,
    budget: '',
    category: 'Personal',
    tags: ['personal'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: 'Martha Rocío Rojas',
  },
  {
    description: 'Servicio de Gas Natural',
    initialPeriod: '202406',
    dueDate: '2024-06-14T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: '',
    ref: '',
    currency: 'Peso Colombiano (COL$)',
    amount: 34080,
    budget: 'Servicios Oficina',
    category: 'Personal',
    tags: ['personal', 'servicios', 'gas natural'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: 'VANTI',
  },
  {
    description: 'Servicio de Administración Apartamento',
    initialPeriod: '202406',
    dueDate: '2024-06-14T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: '',
    ref: '3-204',
    currency: 'Peso Colombiano (COL$)',
    amount: 470600,
    budget: 'Servicios personales',
    category: 'Personal',
    tags: ['personal', 'servicios', 'admon'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: 'Altos de la Colina',
  },
  {
    description: 'Servicio de Administración Oficinas',
    initialPeriod: '202406',
    dueDate: '2024-06-14T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: '',
    ref: '',
    currency: 'Peso Colombiano (COL$)',
    amount: 2165734,
    budget: '',
    category: 'Oficina',
    tags: ['oficina'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: '',
  },
  {
    description: 'Pago Tarjeta Falabella',
    initialPeriod: '202406',
    dueDate: '2024-06-14T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: '',
    ref: '',
    currency: 'Peso Colombiano (COL$)',
    amount: 34495,
    budget: '',
    category: 'Personal',
    tags: ['personal'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: '',
  },
  {
    description: 'Pago Tarjeta MasterCard',
    initialPeriod: '202406',
    dueDate: '2024-06-14T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: '',
    ref: '',
    currency: 'Peso Colombiano (COL$)',
    amount: 9164562,
    budget: '',
    category: 'Personal',
    tags: ['personal'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: '',
  },
  {
    description: 'Pago Tarjeta Visa',
    initialPeriod: '202406',
    dueDate: '2024-06-14T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: '',
    ref: '',
    currency: 'Peso Colombiano (COL$)',
    amount: 803499,
    budget: '',
    category: 'Personal',
    tags: ['personal'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: '',
  },
  {
    description: 'Servicio de Acueducto Apartamento',
    initialPeriod: '202406',
    dueDate: '2024-06-01T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: 'https://pagos.acueducto.com.co/',
    ref: '12072340',
    currency: 'Peso Colombiano (COL$)',
    amount: 203580,
    budget: 'Servicios personales',
    category: 'Personal',
    tags: ['personal', 'servicios', 'acueducto'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: 'EAAB',
  },
  {
    description: 'Servicio de Acueducto 701',
    initialPeriod: '202406',
    dueDate: '2024-06-14T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: 'https://pagos.acueducto.com.co/',
    ref: '11846630',
    currency: 'Peso Colombiano (COL$)',
    amount: 60000,
    budget: '',
    category: 'Oficina',
    tags: ['oficina'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: 'EAAB',
  },
  {
    description: 'Servicio de Acueducto 702',
    initialPeriod: '202406',
    dueDate: '2024-06-14T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: 'https://pagos.acueducto.com.co/',
    ref: '11846631',
    currency: 'Peso Colombiano (COL$)',
    amount: 60000,
    budget: '',
    category: 'Oficina',
    tags: ['oficina'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: 'EAAB',
  },
  {
    description: 'Servicio de Acueducto 602',
    initialPeriod: '202406',
    dueDate: '2024-06-14T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: 'https://pagos.acueducto.com.co/',
    ref: '',
    currency: 'Peso Colombiano (COL$)',
    amount: 1,
    budget: '11846629',
    category: 'Oficina',
    tags: ['oficina'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: 'EAAB',
  },
  {
    description: 'Servicio Internet Hogar',
    initialPeriod: '202406',
    dueDate: '2024-06-21T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: '',
    ref: '',
    currency: 'Peso Colombiano (COL$)',
    amount: 114038,
    budget: '',
    category: 'Personal',
    tags: ['personal'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: 'Movistar',
  },
  {
    description: 'Servicio telefonía Movil',
    initialPeriod: '202406',
    dueDate: '2024-06-21T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: '',
    ref: '',
    currency: 'Peso Colombiano (COL$)',
    amount: 81980,
    budget: '',
    category: 'Personal',
    tags: ['personal'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: 'WOM',
  },
  {
    description: 'Servicio de salud Colsanitas',
    initialPeriod: '202406',
    dueDate: '2024-06-27T08:00:00Z-0500',
    type: 'monthly',
    skip: 0,
    weekend: 'daily',
    end: 'forever',
    web: 'https://www.davivienda.com',
    ref: '0070',
    currency: 'Peso Colombiano (COL$)',
    amount: 1900000,
    budget: 'Salud y Bienestar',
    category: 'Personal',
    tags: ['personal', 'salud'],
    sourceAccount: 'Davivienda Ahorros',
    destinationAccount: 'Leo van der Werf',
  },
];
