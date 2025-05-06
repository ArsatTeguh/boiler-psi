type SuccessProps<T> = {
    error: false;
    data: T;
  };
  
  export type PaginateProps<T> = {
    per_page: number;
    total: number;
    data: T;
    total_data: number;
    total_page: number;
    page: number;
  };
  
  type ErrorProps = {
    error: true;
    data: null;
  };
  
  type ApiResponse<T> = {
    code: number;
    message: string;
  } & (ErrorProps | SuccessProps<T>);
  
  export default ApiResponse;
  