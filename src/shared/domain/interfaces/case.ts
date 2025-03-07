export interface Case<TRequest = unknown, TResponse = unknown> {
  execute(request: TRequest): Promise<TResponse>;
}
