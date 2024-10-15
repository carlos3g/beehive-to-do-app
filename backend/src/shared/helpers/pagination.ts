export const calcSkip = (input: { page: number; perPage: number }): number => {
  const { page, perPage } = input;

  return page > 0 ? perPage * (page - 1) : 0;
};

export const getMeta = (input: { total: number; page: number; perPage: number }) => {
  const { page, perPage, total } = input;

  const lastPage = Math.ceil(total / perPage);

  return {
    total,
    lastPage,
    currentPage: page,
    perPage,
    prev: page > 1 ? page - 1 : null,
    next: page < lastPage ? page + 1 : null,
  };
};
