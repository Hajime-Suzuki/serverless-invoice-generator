import { APIGatewayEvent } from 'aws-lambda'

export type Maybe<T> = T | undefined | null

export type Overwrite<TType, TNewType> = Omit<TType, keyof TNewType> & TNewType

export type GatewayEvent<
  TBody extends Record<string, any> | null,
  TParamsKey extends string | null = null
> = Overwrite<
  APIGatewayEvent,
  {
    body: TBody
    pathParameters: TParamsKey extends string ? Record<TParamsKey, string> : null
  }
>
