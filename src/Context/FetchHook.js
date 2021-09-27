const baseURL = process.env.REACT_APP_BASE_URL

const FetchHook = async ({ url, data, metohd } = {}) => {
  if (metohd === 'get') {
    const get = await fetch(baseURL + url)
      .then(res => res.json())
      .then(res => res)
      .catch(error => error)
    return get
  } else if (metohd === 'post') {
    const post = await fetch(baseURL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => res)
      .catch(err => err)

    return post
  } else if (metohd === 'patch') {
    const patch = await fetch(baseURL + url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => res.message)
      .catch(err => console.log(err))

    return patch
  }
}

export default FetchHook
