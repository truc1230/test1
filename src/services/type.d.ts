interface BaseAPIResponse<R = unknown, E = unknown> {
  data: R;
  success: boolean;
  message: string;
  errors: E;
  meta?: MetaData;
}

interface ErrorField {
  field: string;
  message: string;
}

interface BaseAPIError {
  errors: ErrorField[];
  message: string;
}

interface MetaData {
  totalPages: number;
  limit: number;
  total: number;
  page: number;
}

interface LoginPayload {
  username: string;
  password: string;
}
