import { HttpStatus } from '@nestjs/common';

export const axiosEnumErrors = {
  ERR_BAD_OPTION_VALUE: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    error:
      'Axios Error: Invalid or unsupported value provided in axios configuration.',
  },
  ERR_BAD_OPTION: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    error: 'Axios Error: Invalid option provided in axios configuration.',
  },
  ECONNABORTED: {
    status: HttpStatus.REQUEST_TIMEOUT,
    error: 'Timeout Error: Custom Timeout exceeded.',
  },
  ECONNREFUSED: {
    status: HttpStatus.FAILED_DEPENDENCY,
    error: 'Request Error: Internal error communicating with the external API',
  },
  ETIMEDOUT: {
    status: HttpStatus.REQUEST_TIMEOUT,
    error: 'Timeout Error: Default Timeout exceeded.',
  },
  ERR_NETWORK: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    error: 'Request Error: Unknown Error',
  },
  ERR_FR_TOO_MANY_REDIRECTS: {
    status: HttpStatus.TOO_MANY_REQUESTS,
    error:
      'Request Error: Request is redirected too many times, exceeds max redirects.',
  },
  ERR_DEPRECATED: {
    status: HttpStatus.NOT_IMPLEMENTED,
    error: 'Axios Error: Deprecated feature or method used in axios',
  },
  ERR_BAD_RESPONSE: {
    status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    error:
      'Request Error: Response cannot be parsed properly or is in an unexpected format.',
  },
  ERR_BAD_REQUEST: {
    status: HttpStatus.BAD_REQUEST,
    error:
      'Request Error: Requested has unexpected format or missing required parameters.',
  },
  ERR_CANCELED: {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    error:
      'Request Error: Feature or method is canceled explicitly by the user.',
  },
  ERR_NOT_SUPPORT: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    error:
      'Axios Error: Feature or method not supported in the current axios environment.',
  },
  ERR_INVALID_URL: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    error: 'Axios Error: Invalid URL provided for axios request.',
  },
};

export const httpAxiosMethods = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};
