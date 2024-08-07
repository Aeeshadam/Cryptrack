export interface SearchComponentProps {
  setOpenSearch?: (open: boolean) => void;
  mobileVersion?: boolean;
  editable?: boolean;
  focus?: boolean;
}

export interface CoinProps {
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

export interface CoinState {
  coins: CoinProps[];
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
  filteredCoins: CoinProps[];
  openSearch: boolean;
  setOpenSearch: (open: boolean) => void;
}
