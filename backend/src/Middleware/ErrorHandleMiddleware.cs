namespace backend.src.Middleware;

using backend.src.Helpers;
using System.Net;

public class ErrorHandleMiddleware : IMiddleware
{
    public ErrorHandleMiddleware() {}

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {        
        context.Response.ContentType = "appliccation/json";
        try
        {
            await next(context);
        }
        catch(ServiceException e)
        {            
            context.Response.StatusCode = (int)e.StatusCode;
            var errorResponse = new ErrorResponse(e.StatusCode, e.Message);
            await context.Response.WriteAsJsonAsync(errorResponse);
        }
        catch(Exception e)
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            var errorResponse = new ErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            await context.Response.WriteAsJsonAsync(errorResponse);
        }
    }

  
}
