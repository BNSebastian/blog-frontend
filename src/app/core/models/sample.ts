export interface ApiResult {
  page: number;
  results: SampleResult[];
  total_pages: number;
  total_results: number;
}

export interface SampleResult {
  name: string;
}
