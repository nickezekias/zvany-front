interface DBGetQueryFilter {
  sortBy: Array<string>
  itemsPerPage?: number
  sortDesc?: Array<string>
  page?: number
}
interface HttpError {
  stack: string;
  message: string;
  cause: string;
  name: string;
  request: string;
  config?: {
    url: string;
  };
  options: {
    baseURL: string;
    headers: Headers;
    credentials: string;
    method: string;
    body: Record<string, unknown>;
  };
  response: {
    _data: {
      message: string;
      exception: string;
      file: string;
      line: number;
      trace: [
        {
          file: string;
          line: number;
          function: string;
          class: string;
          type: string;
        }
      ];
      errors?: Record<string, unknown>;
    };
    body: ReadableStream;
    bodyUsed: boolean;
    headers: {
      "cache-control": string;
      "content-length": string;
      "content-type": string;
      "cross-origin-opener-policy": string;
      date: string;
      "x-powered-by": string;
    };
    ok: boolean;
    redirected: boolean;
    status: number;
    statusText: string;
    type: string;
    url: string;
  };
  data: {
    message: string;
    exception: string;
    file: string;
    line: number;
    trace: [
      {
        file: string;
        line: number;
        function: string;
        class: string;
        type: string;
      }
    ];
    errors?: Record<string, unknown>;
  };
  status: number;
  statusCode: number;
  statusText: string;
  statusMessage: string;
  _value?: HttpError
  value?: HttpError
}

interface MenuItem {
  label: string
  icon?: string
  route?: string
  children?: Array<MenuItem>
  command?: () => void
}

export type { DBGetQueryFilter, HttpError, MenuItem };
