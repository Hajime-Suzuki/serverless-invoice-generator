import { ValidationError, ObjectSchema, ArraySchema } from 'yup'

export function assertValidData<A>(res: ValidationError | A): asserts res is A {
  if (isValidationError(res))
    throw new Error(`invalid input for invoice info: ${res.errors.join(', ')}`)
}

const isValidationError = (e: any): e is ValidationError => e instanceof ValidationError

export const validate = async <T>(
  schema: ObjectSchema | ArraySchema<any>,
  payload: any,
): Promise<T | ValidationError> => {
  const res = await schema
    .validate(payload, { abortEarly: false })
    .then(v => (v as any) as T)
    .catch((e: ValidationError) => e)

  if (!res) throw new Error('unexpected error happened while parsing invoice info')

  return res
}
