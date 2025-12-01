

export type UserRole = 'resident' | 'provider' | null;
export type ProviderType = 'service' | 'product' | null;
export type PlanType = 'basic' | 'pro';

export interface RegistrationState {
  role: UserRole;
  basicInfo: {
    name: string;
    phone: string;
    birthDate: string;
    email: string;
    password: string;
    confirmPassword: string;
    condoName?: string; // Resident only
    address?: string; // Resident only
  };
  providerInfo: {
    document: string; // CPF or CNPJ
    type: ProviderType;
    categories: string[];
  };
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'service' | 'product';
  imageUrl?: string;
  isAvailableForOrder?: boolean; // Only for products
}

export interface Post {
  id: string;
  imageUrl: string;
  description: string;
  date: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed';
}

export interface OrderItem {
  offerId: string;
  title: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'new' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  items: OrderItem[];
  total: number;
  date: string; // Timestamp or formatted string
  status: OrderStatus;
  paymentMethod: string;
}

export interface ProviderProfile {
  id: string;
  name: string;
  type: 'service' | 'product';
  category: string;
  subcategory: string;
  isResident: boolean; // "Morador" tag
  isPresent: boolean; // "No condomínio agora" status
  isVisible: boolean; // "Disponível" toggle
  rating: number;
  coverImage: string;
  description: string;
  address?: string; // Bloco/Apt if resident
  
  // Extended Profile Data
  document?: string;
  phone?: string;
  birthDate?: string; // Added field
  socialLink?: string;
  gallery?: string[];
  offers?: Offer[];
  posts?: Post[];
  
  // PRO Modules
  plan: PlanType;
  appointments?: Appointment[];
  orders?: Order[];
}

// --- DESAPEGO TYPES ---
export interface DesapegoItem {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  sellerName: string;
  sellerAddress: string; // Bloco/Apt
  sellerPhone: string;
  sellerAvatar: string;
  date: string;
  isOwner: boolean; // Se o usuário logado é o dono (para editar/excluir)
}

export const CATEGORIES_SERVICE = [
  "Encanador", "Eletricista", "Pintor", "Churrasqueiro", "Músico", "Jardineiro", "Diarista", "Personal Trainer"
];

export const CATEGORIES_PRODUCT = [
  "Roupa Infantil", "Acessórios", "Maquiagem", "Alimentação", "Artesanato", "Pet Shop", "Decoração"
];

// Mock Data for Desapego
export const MOCK_DESAPEGO_ITEMS: DesapegoItem[] = [
  {
    id: '1',
    title: 'Bicicleta Infantil Aro 16',
    description: 'Bicicleta em ótimo estado, usada poucas vezes. Ideal para crianças de 4 a 6 anos. Acompanha rodinhas.',
    price: 150.00,
    images: [
      'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507035895480-2b32d6c44906?q=80&w=800&auto=format&fit=crop'
    ],
    sellerName: 'Ricardo Souza',
    sellerAddress: 'Bloco C - 104',
    sellerPhone: '(11) 99999-9999',
    sellerAvatar: 'https://i.pravatar.cc/150?u=ricardo',
    date: 'Há 2 horas',
    isOwner: true
  },
  {
    id: '2',
    title: 'Sofá 2 Lugares Retrátil',
    description: 'Sofá cinza, muito confortável. Precisa retirar no local (térreo). Motivo: mudança.',
    price: 450.00,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop'
    ],
    sellerName: 'Mariana Lima',
    sellerAddress: 'Bloco A - 502',
    sellerPhone: '(11) 98888-8888',
    sellerAvatar: 'https://i.pravatar.cc/150?u=mariana',
    date: 'Ontem',
    isOwner: false
  },
  {
    id: '3',
    title: 'Air Fryer Philco',
    description: 'Funcionando perfeitamente. 3.2L. 110v.',
    price: 180.00,
    images: [
      'https://images.unsplash.com/photo-1626162970425-c67290c0a90b?q=80&w=800&auto=format&fit=crop'
    ],
    sellerName: 'Carlos Silva',
    sellerAddress: 'Bloco B - 303',
    sellerPhone: '(11) 97777-7777',
    sellerAvatar: 'https://i.pravatar.cc/150?u=carlos',
    date: 'Há 3 dias',
    isOwner: false
  }
];

export const MOCK_PROVIDERS: ProviderProfile[] = [
  {
    id: '1',
    name: 'Vila di Italia',
    type: 'product',
    category: 'Comida',
    subcategory: 'Gelateria & Eventos',
    isResident: true,
    isPresent: true,
    isVisible: true,
    rating: 4.8,
    coverImage: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?q=80&w=800&auto=format&fit=crop',
    description: 'Sorvetes artesanais italianos e serviços completos de carrinhos de gelato para festas e eventos no condomínio.',
    address: 'Bloco B, Apt 302',
    plan: 'pro',
    document: '12.345.678/0001-90',
    offers: [
      { id: '101', title: 'Gelato 1kg', description: 'Pote de 1kg, escolha até 3 sabores.', price: 65.00, type: 'product', isAvailableForOrder: true },
      { id: '102', title: 'Picolé Artesanal', description: 'Fruta natural.', price: 12.00, type: 'product', isAvailableForOrder: true },
      { id: '103', title: 'Petit Gateau', description: 'Bolo quente com bola de sorvete.', price: 22.50, type: 'product', isAvailableForOrder: true },
      { id: '104', title: 'Carrinho de Gelato (Festa)', description: 'Serviço de carrinho com atendente por 4 horas. Sorvete à vontade.', price: 800.00, type: 'service' },
      { id: '105', title: 'Degustação Privada', description: 'Levamos os sabores até você para escolha do menu.', price: 80.00, type: 'service' }
    ],
    orders: [
      { 
        id: 'ord1', 
        clientName: 'Ana Silva', 
        clientAddress: 'Bl. A - 104',
        clientPhone: '11999999999',
        items: [{offerId: '101', title: 'Gelato 1kg', quantity: 1, price: 65.00}], 
        total: 65.00, 
        date: '14:30', 
        status: 'new',
        paymentMethod: 'Pix'
      },
      { 
        id: 'ord2', 
        clientName: 'Roberto Carlos', 
        clientAddress: 'Bl. C - 505',
        clientPhone: '11988888888',
        items: [
            {offerId: '102', title: 'Picolé Artesanal', quantity: 4, price: 12.00},
            {offerId: '103', title: 'Petit Gateau', quantity: 2, price: 22.50}
        ], 
        total: 93.00, 
        date: '14:45', 
        status: 'preparing',
        paymentMethod: 'Dinheiro'
      }
    ]
  },
  {
    id: '2',
    name: 'Ateliê da Juju',
    type: 'product',
    category: 'Criança',
    subcategory: 'Laços e Roupas',
    isResident: false,
    isPresent: false,
    isVisible: true,
    rating: 4.9,
    coverImage: 'https://images.unsplash.com/photo-1515488042361-25f4682ae2c7?q=80&w=800&auto=format&fit=crop',
    description: 'Laços personalizados e roupas infantis sob medida. Entregamos no condomínio toda terça e quinta.',
    plan: 'basic',
    offers: [
        { id: '201', title: 'Laço G', description: 'Laço grande de gorgurão.', price: 25.00, type: 'product', isAvailableForOrder: true }
    ]
  },
  {
    id: '3',
    name: 'Marcos Reparos & Vendas',
    type: 'service', // Primary type
    category: 'Casa',
    subcategory: 'Eletricista',
    isResident: true,
    isPresent: true,
    isVisible: true,
    rating: 4.5,
    coverImage: 'https://images.unsplash.com/photo-1621905476047-33f0a579c096?q=80&w=800&auto=format&fit=crop',
    description: 'Eletricista residencial com 10 anos de experiência. Vendo também materiais elétricos de emergência.',
    address: 'Bloco A, Apt 104',
    plan: 'basic',
    phone: '(11) 99999-9999',
    document: '123.456.789-00',
    birthDate: '01/01/1985',
    offers: [
        { id: '301', title: 'Troca de Chuveiro', description: 'Mão de obra para troca de resistência ou chuveiro completo.', price: 80.00, type: 'service' },
        { id: '302', title: 'Visita Técnica', description: 'Diagnóstico da rede elétrica.', price: 50.00, type: 'service' },
        { id: '303', title: 'Resistência Lorenzetti', description: 'Original, 220v, 5500w.', price: 45.00, type: 'product', isAvailableForOrder: true, imageUrl: 'https://images.unsplash.com/photo-1565518218-c2b9a7c6f0c3?q=80&w=400' },
        { id: '304', title: 'Fita Isolante 3M', description: 'Rolo de 20m.', price: 12.00, type: 'product', isAvailableForOrder: true }
    ],
    appointments: [
      { id: 'apt1', clientName: 'Carlos Oliveira', serviceName: 'Troca de Chuveiro', date: 'Amanhã', time: '10:00', status: 'confirmed'}
    ]
  },
  {
    id: '4',
    name: 'Studio Glow',
    type: 'service',
    category: 'Beleza',
    subcategory: 'Manicure e Pedicure',
    isResident: false,
    isPresent: true,
    isVisible: true,
    rating: 5.0,
    coverImage: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800&auto=format&fit=crop',
    description: 'Atendimento à domicílio ou no salão parceiro. Especialista em unhas de gel.',
    plan: 'pro'
  },
  {
    id: '5',
    name: 'Pet Walker Boss',
    type: 'service',
    category: 'Pets',
    subcategory: 'Passeador de Cães',
    isResident: true,
    isPresent: false,
    isVisible: false,
    rating: 4.7,
    coverImage: 'https://images.unsplash.com/photo-1581888227599-77981198520d?q=80&w=800&auto=format&fit=crop',
    description: 'Seu cãozinho feliz e saudável. Passeios de 30min ou 1h dentro do condomínio.',
    plan: 'basic'
  },
  {
    id: '6',
    name: 'Delícias da Tarde',
    type: 'product',
    category: 'Comida',
    subcategory: 'Bolos e Tortas',
    isResident: true,
    isPresent: true,
    isVisible: true,
    rating: 4.6,
    coverImage: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop',
    description: 'Bolos caseiros fresquinhos todos os dias. Aceitamos encomendas para festas.',
    plan: 'basic'
  },
  {
    id: '7',
    name: 'Dona Maria Limpeza',
    type: 'service',
    category: 'Casa',
    subcategory: 'Diarista',
    isResident: false,
    isPresent: false,
    isVisible: true,
    rating: 4.8,
    coverImage: 'https://images.unsplash.com/photo-1581578731117-104f8a33837d?q=80&w=800&auto=format&fit=crop',
    description: 'Limpeza pesada e organização. Referências no condomínio.',
    plan: 'basic'
  },
  {
    id: '8',
    name: 'Barbearia do Rafa',
    type: 'service',
    category: 'Beleza',
    subcategory: 'Barbeiro',
    isResident: true,
    isPresent: true,
    isVisible: true,
    rating: 5.0,
    coverImage: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop',
    description: 'Corte e barba no conforto do seu bloco. Atendo a noite.',
    plan: 'pro'
  },
  {
    id: '9',
    name: 'Vet em Casa',
    type: 'service',
    category: 'Pets',
    subcategory: 'Veterinária',
    isResident: false,
    isPresent: false,
    isVisible: true,
    rating: 4.9,
    coverImage: 'https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?q=80&w=800&auto=format&fit=crop',
    description: 'Consultas e vacinas a domicílio.',
    plan: 'basic'
  },
  {
    id: '10',
    name: 'Sushi House',
    type: 'product',
    category: 'Comida',
    subcategory: 'Japonês',
    isResident: false,
    isPresent: false,
    isVisible: true,
    rating: 4.7,
    coverImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop',
    description: 'O melhor sushi da região entregue na sua porta.',
    plan: 'pro',
    offers: [
        { id: '1001', title: 'Combo 1', description: '15 peças variadas.', price: 45.00, type: 'product', isAvailableForOrder: true }
    ]
  }
];