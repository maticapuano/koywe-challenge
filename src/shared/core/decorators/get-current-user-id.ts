import { createParamDecorator } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator((data: unknown, ctx) => {
  const context = ctx.switchToHttp();
  const request = context.getRequest();

  return request.userId;
});
