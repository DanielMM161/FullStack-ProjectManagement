namespace backend.src.Helpers;

using System.Net;

public class ServiceException : Exception
{
    public HttpStatusCode StatusCode { get; set; }
    
    public ServiceException (HttpStatusCode statusCode, string message) : base(message)
    {
        StatusCode = statusCode;        
    }

    public static ServiceException NotFound(string message = "Id is not found")
    {
        return new ServiceException(HttpStatusCode.NotFound, message);
    }

    public static ServiceException Unauthorized(string message = "Unauthorized")
    {
        return new ServiceException(HttpStatusCode.Unauthorized, message);
    }

    public static ServiceException Forbidden(string message = "That action is Forbidden")
    {
        return new ServiceException(HttpStatusCode.Forbidden, message);
    }

    public static ServiceException BadRequest(string message = "Bad Request")
    {
        return new ServiceException(HttpStatusCode.BadRequest, message);
    }
}