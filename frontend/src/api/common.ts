export type APIError = {
  response: {
    data: {
      detail: string;
    };
    status: number
  };
};
