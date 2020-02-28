const success = (data: any) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: data,
  }
}

const fail = (e: Error & { status: number }) => {
  return {
    statusCode: e.status || 500,
    body: JSON.stringify({ error: e.message }),
  }
}

export const response = {
  success,
  fail,
}
