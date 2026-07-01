export interface CountryInfo {
  timezone: string
  currency: string
  currencySymbol: string
  currencyName: string
}

const countryData: Record<string, CountryInfo> = {
  // Moyen-Orient
  'Israel':               { timezone: 'Asia/Jerusalem',                    currency: 'ILS', currencySymbol: '₪',   currencyName: 'Shekel' },
  'UAE':                  { timezone: 'Asia/Dubai',                        currency: 'AED', currencySymbol: 'د.إ', currencyName: 'Dirham' },
  'United Arab Emirates': { timezone: 'Asia/Dubai',                        currency: 'AED', currencySymbol: 'د.إ', currencyName: 'Dirham' },
  'Turkey':               { timezone: 'Europe/Istanbul',                   currency: 'TRY', currencySymbol: '₺',   currencyName: 'Livre turque' },

  // Europe de l'Ouest
  'France':               { timezone: 'Europe/Paris',                      currency: 'EUR', currencySymbol: '€',   currencyName: 'Euro' },
  'Germany':              { timezone: 'Europe/Berlin',                     currency: 'EUR', currencySymbol: '€',   currencyName: 'Euro' },
  'Belgium':              { timezone: 'Europe/Brussels',                   currency: 'EUR', currencySymbol: '€',   currencyName: 'Euro' },
  'Netherlands':          { timezone: 'Europe/Amsterdam',                  currency: 'EUR', currencySymbol: '€',   currencyName: 'Euro' },
  'Italy':                { timezone: 'Europe/Rome',                       currency: 'EUR', currencySymbol: '€',   currencyName: 'Euro' },
  'Spain':                { timezone: 'Europe/Madrid',                     currency: 'EUR', currencySymbol: '€',   currencyName: 'Euro' },
  'Portugal':             { timezone: 'Europe/Lisbon',                     currency: 'EUR', currencySymbol: '€',   currencyName: 'Euro' },
  'Austria':              { timezone: 'Europe/Vienna',                     currency: 'EUR', currencySymbol: '€',   currencyName: 'Euro' },
  'Greece':               { timezone: 'Europe/Athens',                     currency: 'EUR', currencySymbol: '€',   currencyName: 'Euro' },
  'Luxembourg':           { timezone: 'Europe/Luxembourg',                 currency: 'EUR', currencySymbol: '€',   currencyName: 'Euro' },
  'Switzerland':          { timezone: 'Europe/Zurich',                     currency: 'CHF', currencySymbol: 'CHF', currencyName: 'Franc suisse' },
  'United Kingdom':       { timezone: 'Europe/London',                     currency: 'GBP', currencySymbol: '£',   currencyName: 'Livre sterling' },
  'UK':                   { timezone: 'Europe/London',                     currency: 'GBP', currencySymbol: '£',   currencyName: 'Livre sterling' },
  'England':              { timezone: 'Europe/London',                     currency: 'GBP', currencySymbol: '£',   currencyName: 'Livre sterling' },
  'Sweden':               { timezone: 'Europe/Stockholm',                  currency: 'SEK', currencySymbol: 'kr',  currencyName: 'Couronne suédoise' },
  'Norway':               { timezone: 'Europe/Oslo',                       currency: 'NOK', currencySymbol: 'kr',  currencyName: 'Couronne norvégienne' },
  'Denmark':              { timezone: 'Europe/Copenhagen',                 currency: 'DKK', currencySymbol: 'kr',  currencyName: 'Couronne danoise' },

  // Europe de l'Est
  'Russia':               { timezone: 'Europe/Moscow',                     currency: 'RUB', currencySymbol: '₽',   currencyName: 'Rouble' },
  'Ukraine':              { timezone: 'Europe/Kiev',                       currency: 'UAH', currencySymbol: '₴',   currencyName: 'Hryvnia' },
  'Poland':               { timezone: 'Europe/Warsaw',                     currency: 'PLN', currencySymbol: 'zł',  currencyName: 'Zloty' },
  'Hungary':              { timezone: 'Europe/Budapest',                   currency: 'HUF', currencySymbol: 'Ft',  currencyName: 'Forint' },
  'Czech Republic':       { timezone: 'Europe/Prague',                     currency: 'CZK', currencySymbol: 'Kč',  currencyName: 'Couronne tchèque' },
  'Romania':              { timezone: 'Europe/Bucharest',                  currency: 'RON', currencySymbol: 'lei', currencyName: 'Leu roumain' },
  'Bulgaria':             { timezone: 'Europe/Sofia',                      currency: 'BGN', currencySymbol: 'лв',  currencyName: 'Lev bulgare' },
  'Moldova':              { timezone: 'Europe/Chisinau',                   currency: 'MDL', currencySymbol: 'L',   currencyName: 'Leu moldave' },

  // Amérique du Nord
  'United States':        { timezone: 'America/New_York',                  currency: 'USD', currencySymbol: '$',   currencyName: 'Dollar américain' },
  'USA':                  { timezone: 'America/New_York',                  currency: 'USD', currencySymbol: '$',   currencyName: 'Dollar américain' },
  'U.S.A':               { timezone: 'America/New_York',                  currency: 'USD', currencySymbol: '$',   currencyName: 'Dollar américain' },
  'Canada':               { timezone: 'America/Toronto',                   currency: 'CAD', currencySymbol: 'CA$', currencyName: 'Dollar canadien' },
  'Mexico':               { timezone: 'America/Mexico_City',               currency: 'MXN', currencySymbol: '$',   currencyName: 'Peso mexicain' },

  // Amérique du Sud
  'Argentina':            { timezone: 'America/Argentina/Buenos_Aires',    currency: 'ARS', currencySymbol: '$',   currencyName: 'Peso argentin' },
  'Brazil':               { timezone: 'America/Sao_Paulo',                 currency: 'BRL', currencySymbol: 'R$',  currencyName: 'Real brésilien' },
  'Chile':                { timezone: 'America/Santiago',                  currency: 'CLP', currencySymbol: '$',   currencyName: 'Peso chilien' },
  'Colombia':             { timezone: 'America/Bogota',                    currency: 'COP', currencySymbol: '$',   currencyName: 'Peso colombien' },
  'Uruguay':              { timezone: 'America/Montevideo',                currency: 'UYU', currencySymbol: '$U',  currencyName: 'Peso uruguayen' },
  'Venezuela':            { timezone: 'America/Caracas',                   currency: 'VES', currencySymbol: 'Bs',  currencyName: 'Bolivar' },
  'Peru':                 { timezone: 'America/Lima',                      currency: 'PEN', currencySymbol: 'S/',  currencyName: 'Sol péruvien' },
  'Panama':               { timezone: 'America/Panama',                    currency: 'USD', currencySymbol: '$',   currencyName: 'Dollar américain' },
  'Costa Rica':           { timezone: 'America/Costa_Rica',                currency: 'CRC', currencySymbol: '₡',   currencyName: 'Colón' },

  // Afrique
  'South Africa':         { timezone: 'Africa/Johannesburg',               currency: 'ZAR', currencySymbol: 'R',   currencyName: 'Rand' },
  'Morocco':              { timezone: 'Africa/Casablanca',                 currency: 'MAD', currencySymbol: 'DH',  currencyName: 'Dirham marocain' },
  'Tunisia':              { timezone: 'Africa/Tunis',                      currency: 'TND', currencySymbol: 'DT',  currencyName: 'Dinar tunisien' },
  'Egypt':                { timezone: 'Africa/Cairo',                      currency: 'EGP', currencySymbol: '£',   currencyName: 'Livre égyptienne' },
  'Kenya':                { timezone: 'Africa/Nairobi',                    currency: 'KES', currencySymbol: 'KSh', currencyName: 'Shilling kényan' },

  // Asie
  'India':                { timezone: 'Asia/Kolkata',                      currency: 'INR', currencySymbol: '₹',   currencyName: 'Roupie indienne' },
  'China':                { timezone: 'Asia/Shanghai',                     currency: 'CNY', currencySymbol: '¥',   currencyName: 'Yuan' },
  'Japan':                { timezone: 'Asia/Tokyo',                        currency: 'JPY', currencySymbol: '¥',   currencyName: 'Yen' },
  'Thailand':             { timezone: 'Asia/Bangkok',                      currency: 'THB', currencySymbol: '฿',   currencyName: 'Baht' },
  'Singapore':            { timezone: 'Asia/Singapore',                    currency: 'SGD', currencySymbol: 'S$',  currencyName: 'Dollar de Singapour' },
  'Hong Kong':            { timezone: 'Asia/Hong_Kong',                    currency: 'HKD', currencySymbol: 'HK$', currencyName: 'Dollar de Hong Kong' },
  'South Korea':          { timezone: 'Asia/Seoul',                        currency: 'KRW', currencySymbol: '₩',   currencyName: 'Won' },
  'Vietnam':              { timezone: 'Asia/Ho_Chi_Minh',                  currency: 'VND', currencySymbol: '₫',   currencyName: 'Dong' },
  'Nepal':                { timezone: 'Asia/Kathmandu',                    currency: 'NPR', currencySymbol: 'Rs',  currencyName: 'Roupie népalaise' },
  'Philippines':          { timezone: 'Asia/Manila',                       currency: 'PHP', currencySymbol: '₱',   currencyName: 'Peso philippin' },

  // Océanie
  'Australia':            { timezone: 'Australia/Sydney',                  currency: 'AUD', currencySymbol: 'A$',  currencyName: 'Dollar australien' },
  'New Zealand':          { timezone: 'Pacific/Auckland',                  currency: 'NZD', currencySymbol: 'NZ$', currencyName: 'Dollar néo-zélandais' },
}

export function getCountryInfo(country: string): CountryInfo | null {
  if (!country) return null

  // Recherche exacte
  if (countryData[country]) return countryData[country]

  // Recherche insensible à la casse
  const normalized = country.trim().toLowerCase()
  const key = Object.keys(countryData).find((k) => k.toLowerCase() === normalized)
  return key ? countryData[key] : null
}

export function getLocalTime(timezone: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date())
}
