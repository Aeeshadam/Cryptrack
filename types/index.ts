export interface SearchComponentProps {
  setOpenSearch?: (open: boolean) => void;
  mobileVersion?: boolean;
  editable?: boolean;
  focus?: boolean;
}

export interface CoinListProps {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  name: string;
  max_supply: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  roi: null;
  symbol: string;
  total_supply: number;
  total_volume: number;
}

export interface CoinListState {
  coins: CoinListProps[];
  loading: boolean;
  error: null | string;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

export interface SearchContextProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCoins: CoinListProps[];
  openSearch: boolean;
  setOpenSearch: (open: boolean) => void;
  handleOpenSearch: () => void;
}

interface CoinGeckoMarketData {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
  market_cap_change_percentage_24h_usd: number;
  total_market_cap: Record<string, number>;
  total_volume: Record<string, number>;
  market_cap_percentage: Record<string, number>;
  updated_at: number;
}

export interface SummaryDataProps {
  data: CoinGeckoMarketData;
}
export interface CardsDataProps {
  title: string;
  value: string;
}

export interface ParamsProps {
  slug: string;
}

export interface CoinDetailsProps {
  coin: any;
}

export interface CoinDetailsState {
  coin: any | null;
  loading: boolean;
  error: null | string;
}
