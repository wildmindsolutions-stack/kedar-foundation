export const SITE = {
  name: 'Kedar Foundation',
  tagline: 'Trusted Quality in Every Grain',
  taglineGujarati: 'आइये देश के लिए कुछ करें।',
  taglineHindi: '२ कदम देश के माटे।',
  location: 'Ahmedabad, India',
  email: 'info@kedarfoundation.org',
  phone: '+91 63519 25121',
};

export const KEDAR_ACRONYM = {
  title: 'KEDAR',
  subtitle: 'Building the Future Through',
  pillars: [
    { letter: 'K', meaning: 'Knowledge', short: 'Knowledge' },
    { letter: 'E', meaning: 'Entrepreneurship', short: 'Entrepreneurship' },
    { letter: 'D', meaning: 'Dignity', short: 'Dignity' },
    { letter: 'A', meaning: 'Agriculture & Advancement', short: 'Agriculture' },
    { letter: 'R', meaning: 'राष्ट्रनिर्माण (Rashtra Nirman / Nation Building)', short: 'Rashtra Nirman' },
  ],
  visionStatement:
    'A vision-driven initiative committed to empowering individuals, strengthening communities, advancing agriculture, and contributing to the growth of the nation.',
};

export const VISION =
  'Kedar Foundation envisions creating a self-reliant, innovative, and socially empowered India by providing opportunities, knowledge, technology, and support to individuals and communities. The foundation aims to become a catalyst for positive social change by connecting innovation with community welfare and sustainable development.';

export const MISSION =
  'The mission of Kedar Foundation is to empower youth, farmers, women, students, entrepreneurs, senior citizens, and rural communities by providing access to education, technology, skill development, healthcare support, sustainable agricultural practices, and entrepreneurship opportunities. The foundation is committed to creating practical solutions that improve the quality of life while promoting environmental sustainability and national development.';

export const GUIDING_PRINCIPLE =
  'Kedar Foundation believes that sustainable national development begins with empowered individuals, innovative thinking, responsible agriculture, environmental stewardship, and collective community participation. Through collaboration, technology, education, and social responsibility, the foundation aspires to create meaningful and lasting impact across society.';

export const CORE_OBJECTIVES = [
  'Promote innovation for social welfare',
  'Encourage youth participation in nation-building',
  'Support sustainable agriculture and rural development',
  'Empower women through livelihood opportunities',
  'Assist aspiring entrepreneurs',
  'Improve healthcare accessibility',
  'Encourage environmental conservation',
  'Promote traditional and holistic wellness practices',
  'Create employment through skill development and value-added industries',
];

export const BENEFICIARIES = [
  'Students',
  'Youth with innovative ideas',
  'Farmers',
  'Women',
  'Rural communities',
  'Entrepreneurs and startups',
  'Senior citizens',
  'Persons with disabilities',
  'Skilled and unskilled workers',
  'Environment and wildlife initiatives',
];

export const PRODUCTS = [
  {
    id: '25kg',
    name: '25 kg Pack',
    subtitle: 'Ideal for Families',
    description: 'Premium wheat carefully sourced and processed for everyday household nutrition and purity.',
  },
  {
    id: '50kg',
    name: '50 kg Pack',
    subtitle: 'Perfect for Retailers',
    description: 'Consistent quality wheat for local retailers and neighbourhood stores serving families across Gujarat and beyond.',
  },
  {
    id: '100kg',
    name: '100 kg Pack',
    subtitle: 'Bulk Supply for Institutions',
    description: 'High-volume supply for institutions, wholesalers, and food businesses that demand trusted grain quality.',
  },
];

export const QUALITY_BADGES = [
  { label: '100% Pure Wheat', description: 'Premium grain with trusted sourcing and processing standards.' },
  { label: 'Food-Safety Approved', description: 'Committed to hygienic handling and quality assurance.' },
  { label: 'Export Documentation', description: 'Prepared for domestic and export market requirements.' },
];

export const CHILD_WELFARE_TAGLINE =
  'Provide support to organizations that offer free education, accommodation, and meals to children who do not have parents (orphaned boys and girls).';

export const CHILD_WELFARE_IMAGES = [
  '/work/child-welfare/child-welfare-01.avif',
  '/work/child-welfare/child-welfare-02.avif',
  '/work/child-welfare/child-welfare-03.avif',
  '/work/child-welfare/child-welfare-04.avif',
  '/work/child-welfare/child-welfare-05.avif',
];

export const FARMING_TAGLINE =
  'Support farmers by assisting with irrigation projects and water management initiatives to improve agricultural productivity and sustainability.';

export const FARMING_IMAGES = [
  '/work/farming/farming-01.avif',
  '/work/farming/farming-02.avif',
  '/work/farming/farming-03.avif',
  '/work/farming/farming-04.avif',
];

export const BIRD_SEVA_TAGLINE =
  'Serve birds through feeding initiatives, water bowl distribution, tree plantation, and environmental awareness campaigns to conserve biodiversity and inspire community participation.';

export const BIRD_SEVA_IMAGES = Array.from(
  { length: 30 },
  (_, i) => `/work/bird-seva/bird-seva-${String(i + 1).padStart(2, '0')}.avif`,
);

export const FACTORY_TAGLINE =
  'A look inside Kedar Enterprise’s food-processing facility, where agricultural produce is handled, processed, and prepared with a commitment to hygiene, consistency, and trusted quality.';

export const FACTORY_IMAGES = Array.from(
  { length: 8 },
  (_, i) => `/work/factory/factory-${String(i + 1).padStart(2, '0')}.avif`,
);

export const INITIATIVES = [
  {
    title: 'Child Welfare Support',
    description: CHILD_WELFARE_TAGLINE,
    items: [
      'Support for orphaned boys and girls',
      'Free education partnerships',
      'Safe accommodation',
      'Nutritious daily meals',
      'Community care organizations',
    ],
    image: CHILD_WELFARE_IMAGES[0],
    images: CHILD_WELFARE_IMAGES,
    tagline: CHILD_WELFARE_TAGLINE,
  },
  {
    title: 'Farmer Irrigation & Water Management',
    description: FARMING_TAGLINE,
    items: [
      'Irrigation project support',
      'Water management initiatives',
      'Farmer productivity programs',
      'Sustainable agriculture practices',
      'Rural community outreach',
    ],
    image: FARMING_IMAGES[0],
    images: FARMING_IMAGES,
    tagline: FARMING_TAGLINE,
  },
  {
    title: 'Bird Seva',
    description: BIRD_SEVA_TAGLINE,
    items: [
      'Bird feeding initiatives',
      'Water bowl distribution',
      'Tree plantation',
      'Environmental awareness',
    ],
    image: BIRD_SEVA_IMAGES[0],
    images: BIRD_SEVA_IMAGES,
    tagline: BIRD_SEVA_TAGLINE,
  },
  {
    title: 'Food Processing & Factory Operations',
    description: FACTORY_TAGLINE,
    items: [
      'Hygienic food processing',
      'Quality-controlled operations',
      'Agricultural produce handling',
      'Packaging and supply preparation',
      'Consistent production standards',
    ],
    image: FACTORY_IMAGES[0],
    images: FACTORY_IMAGES,
    tagline: FACTORY_TAGLINE,
  },
  {
    title: 'Student Innovation & Youth Development',
    description:
      'A platform where students and young innovators present ideas, projects, and technologies that contribute to society through innovation challenges, mentorship, prototype support, and startup incubation.',
    items: ['Innovation challenges', 'Mentorship programs', 'Prototype development', 'Startup incubation', 'Technology showcase events'],
  },
  {
    title: 'School Development Programs',
    description:
      'Educational initiatives that improve learning opportunities for children through workshops, career guidance, science programs, and digital literacy.',
    items: ['Educational workshops', 'Career guidance', 'Science & innovation', 'Digital literacy', 'Skill-building camps'],
  },
  {
    title: 'Senior Citizen & Disability Support',
    description:
      'Assistance for senior citizens and persons with disabilities through healthcare awareness, mobility aids, medical camps, and rehabilitation guidance.',
    items: ['Physiotherapy equipment', 'Mobility aids', 'Healthcare camps', 'Assistive devices', 'Rehabilitation guidance'],
  },
  {
    title: 'Rural Skill Development',
    description:
      'Skill enhancement programs for village communities to improve employment and self-sufficiency.',
    items: ['Digital literacy', 'Agricultural technology', 'Food processing', 'Vocational training', 'Handicrafts'],
  },
  {
    title: 'Entrepreneurship Development',
    description:
      'Support for aspiring entrepreneurs with mentoring, affordable technology, branding, and digital presence.',
    items: ['Business mentoring', 'Startup guidance', 'Branding support', 'Digital presence', 'Networking opportunities'],
  },
  {
    title: 'Organic Farming Promotion',
    description:
      'Encouraging farmers to adopt organic and sustainable farming through awareness programs, demonstration farms, and soil health education.',
    items: ['Organic awareness', 'Demonstration farms', 'Farmer workshops', 'Soil health education'],
  },
  {
    title: 'Agricultural Value Addition',
    description:
      'Promoting value addition of agricultural produce to improve farmers\' income through processing and branding.',
    items: ['Flour processing', 'Spice packaging', 'Pulse processing', 'Dehydrated food', 'Food branding'],
  },
  {
    title: 'Farmer Exposure Visits',
    description:
      'Educational visits to successful farms and institutions for knowledge sharing and modern agricultural methods.',
    items: ['Knowledge sharing', 'Technology exposure', 'Best practices', 'Farmer interaction'],
  },
  {
    title: 'Women Empowerment',
    description:
      'Supporting women in becoming financially independent through entrepreneurship, self-help groups, and marketing assistance.',
    items: ['Home-based businesses', 'Self-help groups', 'Food processing', 'Branding support', 'Business mentorship'],
  },
  {
    title: 'Collective Farming (Samuhik Kheti)',
    description:
      'Community farming models where farmers collectively cultivate larger areas for shared resources and better profitability.',
    items: ['Shared resources', 'Reduced costs', 'Collective marketing', 'Profit sharing'],
  },
  {
    title: 'Talent & Innovation Platform',
    description:
      'An open platform where individuals with innovative ideas can collaborate with the foundation for social impact.',
    items: ['Innovative projects', 'Community service', 'Technology solutions', 'Volunteer participation'],
  },
  {
    title: 'Ayurveda & Natural Living',
    description:
      'Promoting integration of Ayurvedic principles through health awareness, natural wellness, and traditional healthcare knowledge.',
    items: ['Health awareness', 'Natural wellness', 'Lifestyle guidance', 'Herbal product awareness'],
  },
  {
    title: 'Dehydrated Food Processing',
    description:
      'Hygienic processing of fruits and vegetables through dehydration to reduce wastage and increase farmer income.',
    items: ['Reduced food wastage', 'Extended shelf life', 'Export opportunities', 'Higher farmer income'],
  },
  {
    title: 'Aromatic & Essential Oil Farming',
    description:
      'Cultivation of aromatic crops for essential oil extraction, crop diversification, and market linkage.',
    items: ['Crop diversification', 'Essential oil processing', 'Market linkage', 'Farmer income enhancement'],
  },
  {
    title: 'Medicinal Plant Farming',
    description:
      'Supporting farmers in cultivating medicinal plants with awareness, market linkage, and processing opportunities.',
    items: ['Crop awareness', 'Market linkage', 'Buyer connections', 'Best cultivation practices'],
  },
  {
    title: 'Agricultural Waste Management',
    description:
      'Effective utilization of agricultural waste through compost production, bio-decomposers, and natural fertilizers.',
    items: ['Organic compost', 'Bio-decomposer usage', 'Waste recycling', 'Awareness campaigns'],
  },
];

export const FUTURE_OPPORTUNITIES = [
  'Volunteer management portal',
  'Donation management system',
  'Beneficiary registration',
  'Online training platform',
  'Farmer portal',
  'Women entrepreneur marketplace',
  'Scholarship programs',
  'Impact reporting dashboard',
];

export interface TrusteeProfile {
  id: string;
  name: string;
  designation: string;
  initials: string;
  image?: string;
  professionalBackground: string[];
  areasOfExpertise?: string[];
  communityVision?: string;
  socialContributions?: string[];
  additionalRole?: string;
  personalPhilosophy?: string;
  familyNote?: string;
  vision?: string;
  coreValues: string[];
  quote?: string;
}

export const FOUNDERS_SHARED_VISION =
  'The Founders and Trustees of Kedar Foundation come from diverse backgrounds including biotechnology, education, agriculture, entrepreneurship, industry, spirituality, and social development. Together, they aim to build a compassionate, self-reliant, and environmentally conscious society through education, rural development, sustainable agriculture, environmental conservation, innovation, and community empowerment.';

export const TRUSTEES: TrusteeProfile[] = [
  {
    id: 'anil-shrivastav',
    name: 'Dr. Anil Shrivastav',
    designation: 'Founder & Trustee',
    initials: 'AS',
    professionalBackground: [
      'Biotechnology Expert',
      'Project Consultant',
      'Research Professional in Plant Biotechnology',
    ],
    areasOfExpertise: [
      'Plant Biotechnology',
      'Scientific Research',
      'Biotechnology Projects',
      'Research Consulting',
      'Sustainable Agricultural Innovation',
    ],
    communityVision:
      'Promoting science-driven sustainable development, encouraging research for social welfare, and supporting innovation in agriculture and biotechnology.',
    coreValues: ['Scientific Excellence', 'Innovation', 'Sustainability', 'Knowledge Sharing'],
  },
  {
    id: 'purushottam-putabia',
    name: 'Shri Purushottam Putabia',
    designation: 'Founder & Trustee',
    initials: 'PP',
    professionalBackground: [
      'Residential Superintendent (Grihapati), Adarsh Residential School, Dahegam',
    ],
    areasOfExpertise: [
      'Educational Leadership',
      'Community Development',
      'Social Service',
      "Women's Empowerment",
      'Gandhian Philosophy',
    ],
    socialContributions: [
      'Serving underprivileged communities',
      'Mobilizing community support',
      'Bird conservation campaigns',
      "Women's skill development",
      'Facilitating access to government welfare schemes',
    ],
    coreValues: ['Service Before Self', 'Compassion', 'Gandhian Ideology', 'Social Responsibility'],
  },
  {
    id: 'rajabhai-khatwani',
    name: 'Shri Rajabhai Khatwani',
    designation: 'Founder & Trustee',
    initials: 'RK',
    professionalBackground: ['Owner, Raja Fashion Showroom, Naroda'],
    areasOfExpertise: ['Entrepreneurship', 'Business Management', 'Community Engagement'],
    socialContributions: [
      'Spiritually inclined and actively involved in community welfare',
    ],
    coreValues: ['Spiritual Growth', 'Integrity', 'Compassion', 'Service to Society'],
  },
  {
    id: 'shivraj-chauhan',
    name: 'Shri Shivraj Chauhan',
    designation: 'Founder & Trustee',
    initials: 'SC',
    professionalBackground: [
      'Regional Manager (5 States), Patanjali Haridwar – Animal Feed Distribution & Production',
    ],
    additionalRole: 'Certified Yoga Instructor',
    socialContributions: [
      'Promotes healthy living through yoga and believes in action-oriented leadership',
    ],
    personalPhilosophy: 'Less Promise, More Deliver.',
    coreValues: ['Commitment', 'Discipline', 'Humility', 'Positivity', 'Service Excellence'],
  },
  {
    id: 'ratibhai-patel',
    name: 'Shri Ratibhai Patel',
    designation: 'Founder & Trustee',
    initials: 'RP',
    professionalBackground: [
      'Associated with Dev Day Chem Industries, Naroda (Family-managed business)',
    ],
    socialContributions: [
      'Known for compassion, devotion, discipline, and humanitarian values',
    ],
    familyNote: 'Son: Vivek Patel – Founder, Wildchild Studio (IT Company)',
    coreValues: ['Compassion', 'Devotion', 'Simplicity', 'Integrity', 'Self-Discipline'],
  },
  {
    id: 'bharat-patel',
    name: 'Shri Bharat Patel',
    designation: 'Founder & Trustee',
    initials: 'BP',
    professionalBackground: ['Organic Farming Expert with over 30 years of experience'],
    areasOfExpertise: [
      'Organic Farming',
      'Medicinal Plants',
      'Aromatic Crops',
      'Value Addition',
      'Millet Promotion',
      'Agro Tourism',
      'Sustainable Agriculture',
    ],
    socialContributions: [
      'Supports bird conservation, farmer empowerment, and medicinal crop cultivation',
      'Collaborates with organizations such as RSS and Patanjali',
    ],
    vision:
      'To ensure sustainable development benefits every section of society through innovation and natural farming.',
    coreValues: ['Nation First', 'Innovation', 'Courage', 'Environmental Conservation', 'Service'],
  },
];

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/leadership', label: 'Leadership' },
  { href: '/initiatives', label: 'Initiatives' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
];

/** Completed work / projects — add images to public/images/projects/ when ready. */
export const PROJECTS = [
  {
    id: 'child-welfare',
    title: 'Child Welfare Support',
    description: CHILD_WELFARE_TAGLINE,
    location: 'Gujarat',
    year: '2025',
    image: CHILD_WELFARE_IMAGES[0],
    images: CHILD_WELFARE_IMAGES,
  },
  {
    id: 'farmer-irrigation',
    title: 'Farmer Irrigation & Water Management',
    description: FARMING_TAGLINE,
    location: 'Rural Gujarat',
    year: '2025',
    image: FARMING_IMAGES[0],
    images: FARMING_IMAGES,
  },
  {
    id: 'bird-seva',
    title: 'Bird Seva',
    description: BIRD_SEVA_TAGLINE,
    location: 'Ahmedabad, Gujarat',
    year: '2025',
    image: BIRD_SEVA_IMAGES[0],
    images: BIRD_SEVA_IMAGES,
  },
  {
    id: 'organic-farming',
    title: 'Organic Farming Awareness Program',
    description:
      'Farmer workshops and demonstration plots promoting chemical-free cultivation, soil health, and sustainable crop rotation across rural Gujarat.',
    location: 'Ahmedabad District',
    year: '2024',
  },
  {
    id: 'women-empowerment',
    title: 'Women Self-Help Group Initiative',
    description:
      'Training and market linkage for women-led food processing units — enabling home-based businesses with branding and packaging support.',
    location: 'Rural Gujarat',
    year: '2024',
  },
  {
    id: 'youth-innovation',
    title: 'Youth Innovation Challenge',
    description:
      'A platform for students and young innovators to present technology-driven solutions for agriculture, education, and community welfare.',
    location: 'Ahmedabad, India',
    year: '2025',
  },
  {
    id: 'wheat-processing',
    title: 'Premium Wheat Processing & Supply',
    description:
      'End-to-end wheat sourcing, cleaning, grading, and packaging — delivering trusted grain quality to families, retailers, and institutions.',
    location: 'Kedar Enterprise',
    year: '2025',
    image: FACTORY_IMAGES[0],
    images: FACTORY_IMAGES,
  },
  {
    id: 'rural-skills',
    title: 'Rural Skill Development Camps',
    description:
      'Digital literacy, agricultural technology, and vocational training camps empowering village youth with employable skills.',
    location: 'Multiple Villages',
    year: '2025',
  },
];

export const HOMEPAGE_STATS = [
  { value: '19+', label: 'Strategic Initiatives' },
  { value: '10+', label: 'Product Categories' },
  { value: '100%', label: 'Quality Commitment' },
  { value: 'Ahmedabad', label: 'Based in Gujarat' },
];
