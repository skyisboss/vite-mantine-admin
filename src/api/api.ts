export const orderAPI = {
  index: (data: { page: number }) => {
    return makeRequest<any, 'list'>({
      method: 'post',
      url: '/api/order',
      data,
    })
  },
}

export const productAPI = {
  index: (data: { page: number }) => {
    return makeRequest<any, 'list'>({
      method: 'post',
      url: '/api/product',
      data,
    })
  },
}

export const uploadService = (formData: FormData) => {
  return makeRequest({
    method: 'post',
    url: '/api/upload',
    data: formData,
    headers: {
      'Content-type': 'multipart/form-data',
    },
  })
}
